# SPIIX lead delivery and growth advisory SEO expansion

## Goal
Make every valid `/spiix/signal` request reach `steve@stevepeeleii.com` through managed app email while preserving the saved lead and instant Monolith access. Expand `/fractional-growth-advisory` into the definitive search landing page for Steve’s growth advisory work, supported by relevant internal links.

## 1. Reliable inbox delivery
- Configure a branded sending domain for `stevepeeleii.com` through Lovable’s email setup. Email cannot send until the domain is configured and verified; no sender domain is currently set up.
- Add a SPIIX owner-notification email addressed only to `steve@stevepeeleii.com`, containing the submitted name, email, company, role, page, and submission time.
- Move notification delivery into the validated server-side submission flow: save the lead first, then send the notification with an idempotency key derived from the submission ID.
- Remove the client-side FormSubmit dependency and its related disclosure copy. Keep the existing four-field form, database record, local browser unlock, and immediate redirect to `/spiix/monolith` independent from email delivery.
- Keep the fixed recipient server-side; the browser will never choose or expose an arbitrary notification address.

## 2. Long-form advisory page
Expand the existing indexable `/fractional-growth-advisory` page rather than creating a competing URL.

The page will retain the main portfolio visual system and add substantial, plainspoken sections covering:
- What fractional growth advisory is, and when it is useful.
- The operating problems SPIIX addresses: unclear funnel ownership, weak measurement, disconnected systems, slow execution, lifecycle gaps, and sales/marketing misalignment.
- Steve’s approach across Signal, Get the Signal, the OS, and Monolith, using the established terminology precisely.
- Core service areas: growth strategy, GTM and funnel diagnosis, demand generation, lifecycle, marketing operations, CRM/automation, measurement, and executive operating cadence.
- Who the work fits and who it does not fit.
- Engagement paths and a clear “what happens next” section.
- Verified experience and recommendations as evidence, without invented client outcomes or unsupported claims.
- Useful answers to high-intent questions, written for readers rather than keyword stuffing.

Primary search themes will be grounded in available US search evidence: “fractional CMO,” “fractional marketing leader,” “growth marketing consultant,” “marketing operations consultant,” “demand generation consultant,” “go-to-market consultant,” and “SaaS marketing consultant.” The copy will position Steve accurately as a fractional growth/marketing leader rather than overstate a title.

## 3. Search structure and internal links
- Refine the page title, description, headings, canonical, social metadata, and `ProfessionalService` structured data around the expanded content.
- Keep the page indexable and listed in the existing sitemap.
- Add contextual internal links to `/fractional-growth-advisory` from relevant portfolio and SPIIX pages, using descriptive anchor text rather than generic “learn more.”
- Link the advisory page outward to the most useful supporting pages: Portfolio, Experience, Recommendations, Get the Signal, the OS, Signal, and contact.
- Do not manufacture external backlinks. Current backlink evidence includes many low-trust/spam-like anchors, so the work will focus on strong first-party linking and content quality.

## 4. Verification
- Submit a test lead through the real form and confirm the database record, immediate Monolith access, and the managed email send event to `steve@stevepeeleii.com`; then delete only the test record.
- Verify the advisory page at desktop and mobile widths, including headings, links, metadata, structured data, and horizontal overflow.
- Check the latest build and runtime diagnostics and run the relevant form and content tests.
- After publishing, the new inbox delivery and live SEO content will take effect; search ranking itself cannot be guaranteed and depends on recrawling and authority over time.

## Dependency
Email sending requires a paid plan and a verified sender domain. Domain setup will be the first implementation step; once its setup card is completed, the remaining work can continue.
