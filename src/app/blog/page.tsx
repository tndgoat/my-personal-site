// src/app/blog/page.tsx
import { getAllPosts } from '@/lib/blog';
import BlogListClient from './BlogListClient';

export default function BlogPage() {
    // Fetch posts securely on the server
    const posts = getAllPosts();

    return (
        <div className="space-y-12 mx-auto max-w-4xl">
            {/* Blog Header */}
            <div className="text-center space-y-4">
                <h1 className="font-[family-name:var(--font-marker)] text-5xl sm:text-6xl tracking-wider">
                    Engineering Notes
                </h1>
                <p className="text-xl text-zinc-400">
                    Thoughts on coding, tech, and building software.
                </p>
            </div>

            <hr className="border-zinc-800" />

            {/* Pass data to interactive client component */}
            <BlogListClient initialPosts={posts} />
        </div>
    );
}