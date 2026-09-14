// src/lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    content: string;
}

export function getAllPosts(): BlogPost[] {
    if (!fs.existsSync(contentDir)) return [];

    const files = fs.readdirSync(contentDir);

    const posts = files
        .filter((filename) => filename.endsWith('.md'))
        .map((filename) => {
            const slug = filename.replace('.md', '');
            const filePath = path.join(contentDir, filename);
            const fileContent = fs.readFileSync(filePath, 'utf-8');

            const { data, content } = matter(fileContent);

            return {
                slug,
                title: data.title || 'Untitled',
                date: data.date || '',
                excerpt: data.excerpt || '',
                tags: data.tags || [], // Extract tags from frontmatter
                content,
            };
        })
        .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

    return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
    const filePath = path.join(contentDir, `${slug}.md`);

    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || '',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        content,
    };
}