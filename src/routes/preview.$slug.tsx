import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { fetchDraftPost } from "@/lib/sanity-preview.functions";

export const Route = createFileRoute("/preview/$slug")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Draft Preview" },
    ],
  }),
  component: PreviewPage,
});

function PreviewPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<Awaited<ReturnType<typeof fetchDraftPost>> | null>(null);
  const [state, setState] = useState<"loading" | "error" | "done">("loading");

  useEffect(() => {
    let cancelled = false;
    fetchDraftPost({ data: slug })
      .then((p) => {
        if (cancelled) return;
        setPost(p);
        setState("done");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <div className="min-h-screen">
      <div className="border-b border-amber-500/40 bg-amber-500/10 px-5 py-2 text-center text-xs font-semibold tracking-widest uppercase">
        Draft preview — not public
      </div>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-14">
        {state === "loading" && <p className="text-muted-foreground">Loading draft…</p>}
        {state === "error" && (
          <p className="text-muted-foreground">
            Couldn't load this draft. Previews need a configured preview token.
          </p>
        )}
        {state === "done" && !post && (
          <p className="text-muted-foreground">No draft found for this slug.</p>
        )}
        {state === "done" && post && (
          <article>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Back to the blog
            </Link>
            <h1 className="mt-6 font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-6 font-serif text-xl italic text-muted-foreground">
                {post.excerpt}
              </p>
            )}
            {post.body && (
              <div className="prose-blog mt-8">
                <PortableText value={post.body as never} />
              </div>
            )}
          </article>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
