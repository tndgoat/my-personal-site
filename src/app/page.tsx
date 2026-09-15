import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <PageHeader
        title="Hi, I'm Tung Nguyen"
        description="A software engineer writing code and riding bikes."
      />

      <div className="mx-auto max-w-2xl space-y-6 text-center text-lg leading-relaxed text-zinc-300">
        <p>
          Welcome to my corner of the internet. This isn&apos;t a professional resume,
          just a personal space where I document my daily life and the things I enjoy doing.
        </p>

        <p>
          Here, you will find my{' '}
          <Link href="/blog" className="text-white underline underline-offset-4 transition-colors hover:text-zinc-300">
            Engineering Notes
          </Link>{' '}
          where I share thoughts on tech and building software, alongside my{' '}
          <Link href="/rides" className="text-white underline underline-offset-4 transition-colors hover:text-zinc-300">
            Cycling Logs
          </Link>{' '}
          tracking my adventures on two wheels.
        </p>

        <p className="pt-8 text-zinc-400">
          If you want to get in touch, feel free to email me at{' '}
          <a
            href="mailto:tungnd.goat@gmail.com"
            className="text-white underline underline-offset-4 transition-colors hover:text-zinc-300"
          >
            tungnd.goat@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}