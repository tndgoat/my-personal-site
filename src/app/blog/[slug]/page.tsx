// src/app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

// In Next.js 15+, params is treated as a Promise
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
    // Await the params to resolve the dynamic slug
    const resolvedParams = await params;
    const post = getPostBySlug(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="mx-auto max-w-3xl py-8">
            <Link
                href="/blog"
                className="inline-block mb-8 text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
            >
                &larr; Back to articles
            </Link>

            <header className="mb-10 text-center">
                <h1 className="font-[family-name:var(--font-marker)] text-4xl sm:text-5xl tracking-wide mb-4">
                    {post.title}
                </h1>
                <div className="flex items-center justify-center gap-4 text-zinc-500 font-mono">
                    <time>{post.date}</time>
                    <span>•</span>
                    <div className="flex gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-md bg-zinc-800 text-xs">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            <div className="prose prose-invert prose-lg max-w-none font-sans font-[family-name:var(--font-handwritten)]">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </article>
    );
}