import type { Metadata } from 'next';
import { Architects_Daughter, Permanent_Marker } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

const architectsDaughter = Architects_Daughter({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-handwritten',
  display: 'swap',
});

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marker',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fractal Trails',
  description: 'A personal space exploring the intersection of code, mathematics, and nature on two wheels.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${architectsDaughter.variable} ${permanentMarker.variable} dark`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-black font-handwritten text-white antialiased"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="mx-auto max-w-[1400px] px-6 py-12 lg:px-12">{children}</main>
      </body>
    </html>
  );
}