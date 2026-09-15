'use client';

import { useState, useMemo } from 'react';
import type { BlogPost } from '@/types';
import BlogCard from './BlogCard';
import TagBadge from '@/components/ui/TagBadge';

interface BlogListClientProps {
  initialPosts: BlogPost[];
}

const POSTS_PER_PAGE = 5;

export default function BlogListClient({ initialPosts }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    initialPosts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [initialPosts, searchQuery, selectedTag]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const displayedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2, '...', totalPages - 1, totalPages);
    }
    return pages;
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-8 w-full max-w-2xl space-y-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 font-sans text-white focus:border-zinc-500 focus:outline-none"
        />

        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              variant="button"
              active={selectedTag === tag}
              onClick={() => handleTagClick(tag)}
            />
          ))}
          {selectedTag && (
            <button
              type="button"
              onClick={() => handleTagClick(selectedTag)}
              className="rounded-full px-3 py-1 font-sans text-sm text-red-400 transition-colors hover:text-red-300"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col items-center space-y-6">
        {displayedPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}

        {filteredPosts.length === 0 && (
          <p className="mt-8 text-zinc-500">No articles found matching your criteria.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:pointer-events-none disabled:opacity-50 sm:px-6"
          >
            Previous
          </button>

          <div className="flex items-center gap-1 sm:gap-2">
            {getPageNumbers().map((page, index) =>
              typeof page === 'number' ? (
                <button
                  key={index}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border font-sans text-sm transition-colors sm:h-10 sm:w-10 ${
                    currentPage === page
                      ? 'border-white bg-white font-semibold text-black'
                      : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="flex w-8 items-center justify-center text-zinc-500 sm:w-10">
                  {page}
                </span>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white disabled:pointer-events-none disabled:opacity-50 sm:px-6"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
