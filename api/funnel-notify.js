/**
 * POST /api/funnel-notify
 * Unified money-event notifications for the $99 audit funnel -> Slack.
 *
 * Sources:
 *  - client: audit modal form submit (?source=client, JSON { event:"audit_form", name, email, website })
 *    Auth: per-email throttle (3/hour) — a shared secret would be public in
 *    client JS anyway. Money events stay fully authed.
 *  - stripe: Stripe webhook (?source=stripe, checkout.session.completed)
 *    Auth: Stripe-Signature header verified against STRIPE_WEBHOOK_SECRET.
 *    Only fires for the $99 audit payment link (plink_1US3kEAJa30vknho9gxFt94K).
 *  - calcom: Cal.com webhook (?source=calcom&secret=..., triggerEvent BOOKING_CREATED)
 *    Auth: query `secret` must equal FUNNEL_NOTIFY_SECRET.
 *
 * Posts to Slack via SLACK_FUNNEL_WEBHOOK_URL (incoming webhook).
 * SPIIX-793.
 */

import crypto from "crypto";

const AUDIT_PAYMENT_LINK = "plink_1US3kEAJa30vknho9gxFt94K";

// Per-email throttle for the public client path (see handler).
const clientHits = new Map(); // email -> [epoch ms]

export const config = { api: { bodyParser: false } };

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function verifyStripeSignature(rawBody, signature, secret) {
  // Stripe-Signature: t=1492774577,v1=5257a869...,v0=...
  const parts = Object.fromEntries(
    String(signature || "")
      .split(",")
      .map((p) => p.split("="))
  );
  if (!parts.t || !parts.v1) return false;
  const signedPayload = `${parts.t}.${rawBody.toString("utf8")}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(String(parts.v1), "utf8");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

async function postToSlack(text) {
  const url = process.env.SLACK_FUNNEL_WEBHOOK_URL;
  if (!url) {
    console.error("funnel-notify: SLACK_FUNNEL_WEBHOOK_URL not set");
    return false;
  }
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  return r.ok;
}

const money = (n) => `$${(n / 100).toFixed(2)}`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method not allowed" });
  }
  const source = req.query.source || "client";

  try {
    const raw = await readRawBody(req);
    let body = {};
    try {
      body = raw.length ? JSON.parse(raw.toString("utf8")) : {};
    } catch {
      return res.status(200).json({ ok: false, error: "bad json" });
    }

    // ---- Stripe webhook ----
    if (source === "stripe") {
      const secret = process.env.STRIPE_WEBHOOK_SECRET;
      if (!secret) return res.status(200).json({ ok: false, error: "no webhook secret" });
      if (!verifyStripeSignature(raw, req.headers["stripe-signature"], secret)) {
        return res.status(200).json({ ok: false, error: "bad signature" });
      }
      const evt = body;
      if (evt.type === "checkout.session.completed") {
        const s = evt.data?.object || {};
        const linkId =
          s.payment_link || s.metadata?.payment_link || "";
        if (linkId === AUDIT_PAYMENT_LINK || s.amount_total === 9900) {
          const email = s.customer_details?.email || s.customer_email || "unknown";
          const name = s.customer_details?.name || "";
          await postToSlack(
            `:moneybag: *$99 audit PAID* — ${money(s.amount_total || 9900)} from ${name ? `${name} ` : ""}<${email}>\n` +
              `Stripe session ${s.id}. They land on the booking page next — watch for the calendar ping.`
          );
          return res.status(200).json({ ok: true, notified: "stripe_payment" });
        }
      }
      return res.status(200).json({ ok: true, notified: null });
    }

    // ---- Client: audit form submitted (public path — throttled, no secret) ----
    // This fires from public client JS, so a shared secret would be public
    // anyway. Instead: throttle per email (3/hour, in-memory) to keep random
    // POSTs from spamming Slack. Money events (Stripe/Cal.com) stay fully
    // authed via signature/secret below.
    if (source === "client" && body.event === "audit_form") {
      const emailKey = String(body.email || "").toLowerCase().slice(0, 120);
      const now = Date.now();
      const hits = (clientHits.get(emailKey) || []).filter((t) => now - t < 3_600_000);
      if (hits.length >= 3) {
        return res.status(200).json({ ok: false, error: "throttled" });
      }
      hits.push(now);
      clientHits.set(emailKey, hits);
      const name = String(body.name || "someone").slice(0, 80);
      const email = String(body.email || "").slice(0, 120);
      const website = String(body.website || "").slice(0, 120);
      await postToSlack(
        `:memo: *Audit form submitted* — ${name}${email ? ` <${email}>` : ""}\n` +
          `Site: ${website || "n/a"} — details captured, heading to $99 checkout.`
      );
      return res.status(200).json({ ok: true, notified: "audit_form" });
    }

    // ---- shared-secret sources: cal.com ----
    const secret = body.secret || req.query.secret;
    if (!process.env.FUNNEL_NOTIFY_SECRET || secret !== process.env.FUNNEL_NOTIFY_SECRET) {
      return res.status(200).json({ ok: false, error: "bad secret" });
    }

    // ---- Cal.com webhook ----
    if (source === "calcom") {
      const trigger = body.triggerEvent || body.trigger_event || "";
      if (String(trigger).toUpperCase().includes("BOOKING_CREATED")) {
        const p = body.payload || {};
        const name = p.attendees?.[0]?.name || p.name || "someone";
        const email = p.attendees?.[0]?.email || p.email || "";
        const when = p.startTime || p.start_time || "";
        const title = p.title || p.eventTitle || "audit readout";
        await postToSlack(
          `:calendar: *Audit hour BOOKED* — ${name}${email ? ` <${email}>` : ""}\n` +
            `${title}${when ? ` · ${when}` : ""}`
        );
        return res.status(200).json({ ok: true, notified: "cal_booking" });
      }
      return res.status(200).json({ ok: true, notified: null });
    }

    return res.status(200).json({ ok: false, error: "unknown event" });
  } catch (e) {
    return res.status(200).json({ ok: false, error: "handler error" });
  }
}
