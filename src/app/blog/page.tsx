import { getAllPosts } from '@/lib/blog';
import BlogListClient from '@/components/blog/BlogListClient';
import PageHeader from '@/components/ui/PageHeader';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <PageHeader
        title="Engineering Notes"
        description="Thoughts on coding, tech, and building software."
      />

      <BlogListClient initialPosts={posts} />
    </div>
  );
}