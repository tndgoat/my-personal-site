import Link from 'next/link';
import type { BlogPost } from '@/types';
import TagBadge from '@/components/ui/TagBadge';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block w-full max-w-2xl rounded-xl border border-zinc-800 p-6 transition-all hover:border-zinc-500 hover:bg-zinc-900/50"
    >
      <div className="mb-3 flex flex-col justify-between sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold tracking-wide text-zinc-100 group-hover:text-white">
          {post.title}
        </h2>
        <time className="mt-1 font-mono text-sm text-zinc-500 sm:mt-0">
          {post.date}
        </time>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>

      <p className="font-sans leading-relaxed text-zinc-400">{post.excerpt}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-zinc-300 underline underline-offset-4 group-hover:text-white">
        Read more &rarr;
      </span>
    </Link>
  );
}
