import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import Loading from './loading';
import { Suspense } from 'react';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wello App',
  description: 'A new banking system',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simulating a slow network 
  return (
    <html lang="en" className={raleway.variable}>
      <Suspense fallback={<Loading />}>
        <body className="antialiased p4th-bg scroll-smooth">{children}</body>
      </Suspense>
    </html>
  );
}