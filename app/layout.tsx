import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers/providers';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduPlatform - Online Learning Management System',
  description: 'Comprehensive LMS platform for online education with video lessons, quizzes, and progress tracking',
  keywords: 'LMS, online learning, education, courses, video lessons, quizzes, certificates',
  authors: [{ name: 'EduPlatform Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'EduPlatform - Online Learning Management System',
    description: 'Comprehensive LMS platform for online education',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}