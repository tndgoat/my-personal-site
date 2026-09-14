// src/app/blog/BlogListClient.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

interface BlogListClientProps {
    initialPosts: BlogPost[];
}

const POSTS_PER_PAGE = 5;

export default function BlogListClient({ initialPosts }: BlogListClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

    // Extract all unique tags for the filter suggestions
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        initialPosts.forEach(post => {
            post.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [initialPosts]);

    // Filter posts based on search query and selected tag
    const filteredPosts = useMemo(() => {
        return initialPosts.filter((post) => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
            return matchesSearch && matchesTag;
        });
    }, [initialPosts, searchQuery, selectedTag]);

    // Paginated display
    const displayedPosts = filteredPosts.slice(0, visibleCount);

    const loadMore = () => {
        setVisibleCount((prev) => prev + POSTS_PER_PAGE);
    };

    const handleTagClick = (tag: string) => {
        // Toggle tag selection and reset pagination
        setSelectedTag((prev) => (prev === tag ? null : tag));
        setVisibleCount(POSTS_PER_PAGE);
    };

    return (
        <div className="w-full flex flex-col items-center">
            {/* Search and Filter Section */}
            <div className="w-full max-w-2xl mb-8 space-y-4">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setVisibleCount(POSTS_PER_PAGE); // Reset pagination on search
                    }}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-zinc-500 font-sans"
                />

                {/* Tag Suggestions */}
                <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`px-3 py-1 rounded-full text-sm font-sans transition-colors ${selectedTag === tag
                                ? 'bg-white text-black font-semibold'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                }`}
                        >
                            #{tag}
                        </button>
                    ))}
                    {selectedTag && (
                        <button
                            onClick={() => handleTagClick(selectedTag)}
                            className="px-3 py-1 rounded-full text-sm font-sans text-red-400 hover:text-red-300 transition-colors"
                        >
                            Clear Filter
                        </button>
                    )}
                </div>
            </div>

            {/* Post List */}
            <div className="w-full space-y-6 flex flex-col items-center">
                {displayedPosts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group block w-full max-w-2xl border border-zinc-800 rounded-xl p-6 transition-all hover:border-zinc-500 hover:bg-zinc-900/50"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                            <h2 className="text-2xl font-bold tracking-wide text-zinc-100 group-hover:text-white">
                                {post.title}
                            </h2>
                            <time className="text-sm text-zinc-500 mt-1 sm:mt-0 font-mono">
                                {post.date}
                            </time>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 rounded text-xs bg-zinc-800/50 text-zinc-400 font-sans">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-zinc-400 font-sans leading-relaxed">
                            {post.excerpt}
                        </p>
                        <span className="inline-block mt-4 text-sm font-semibold underline underline-offset-4 text-zinc-300 group-hover:text-white">
                            Read more &rarr;
                        </span>
                    </Link>
                ))}

                {filteredPosts.length === 0 && (
                    <p className="text-zinc-500 mt-8">No articles found matching your criteria.</p>
                )}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredPosts.length && (
                <button
                    onClick={loadMore}
                    className="mt-10 px-6 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                    Load More Posts
                </button>
            )}
        </div>
    );
}