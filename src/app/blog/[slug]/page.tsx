import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TagBadge from '@/components/ui/TagBadge';

interface BlogPostParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl py-8">
      <Link
        href="/blog"
        className="mb-8 inline-block text-zinc-400 underline underline-offset-4 transition-colors hover:text-white"
      >
        &larr; Back to articles
      </Link>

      <header className="mb-10 text-center">
        <h1 className="mb-4 font-marker text-4xl tracking-wide sm:text-5xl">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 font-mono text-zinc-500">
          <time>{post.date}</time>
          <span>•</span>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </header>

      <div className="prose prose-invert prose-lg max-w-none font-sans font-handwritten">
        <ReactMarkdown
          components={{
            pre({ children }) {
              return <div className="not-prose my-2">{children}</div>;
            },
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');

              if (match) {
                return (
                  <SyntaxHighlighter
                    style={vscDarkPlus as Record<string, React.CSSProperties>}
                    language={match[1]}
                    PreTag="div"
                    className="overflow-hidden rounded-lg border border-zinc-800 font-mono text-sm"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                );
              }

              return (
                <code
                  className="rounded-md border border-zinc-700/50 bg-zinc-800/80 px-1.5 py-0.5 font-mono text-sm text-zinc-200"
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}