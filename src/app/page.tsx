// src/app/page.tsx
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="space-y-12 mx-auto max-w-4xl">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="font-[family-name:var(--font-marker)] text-5xl sm:text-6xl tracking-wider">
          Hi, I&apos;m Tung Nguyen
        </h1>
        <p className="text-xl text-zinc-400">
          A software engineer writing code and riding bikes.
        </p>
      </div>

      <hr className="border-zinc-800" />

      {/* Main Content */}
      <div className="space-y-6 text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto text-center">
        <p>
          Welcome to my corner of the internet. This isn&apos;t a professional resume,
          just a personal space where I document my daily life and the things I enjoy doing.
        </p>

        <p>
          Here, you will find my{' '}
          <Link href="/blog" className="text-white underline underline-offset-4 hover:text-zinc-300 transition-colors">
            Engineering Notes
          </Link>{' '}
          where I share thoughts on tech and building software, alongside my{' '}
          <Link href="/rides" className="text-white underline underline-offset-4 hover:text-zinc-300 transition-colors">
            Cycling Logs
          </Link>{' '}
          tracking my adventures on two wheels.
        </p>

        <p className="pt-8 text-zinc-400">
          If you want to get in touch, feel free to email me at{' '}
          <a
            href="mailto:tungnd.goat@gmail.com"
            className="text-white underline underline-offset-4 hover:text-zinc-300 transition-colors"
          >
            tungnd.goat@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}