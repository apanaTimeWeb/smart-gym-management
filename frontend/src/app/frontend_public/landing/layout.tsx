import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import '@/app/frontend_public/landing/PublicLandingStyles.css';

const publicLandingInter = Inter({ subsets: ['latin'], display: 'swap' });

export default function PublicLandingLayout({ children }: { children: ReactNode }) {
  return <div className={publicLandingInter.className}>{children}</div>;
}
