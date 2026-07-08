import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
 title: 'GymSmart ERP – Gym Management Software',
 description: 'Professional Gym Management ERP – Members, Plans, HR, Finance, Store, and more in one powerful platform.',
 keywords: 'gym management, ERP, gym software, member management, fitness center',
 openGraph: {
 title: 'GymSmart ERP',
 description: 'All-in-one Gym Management Software',
 images: ['/opengraph.jpg'],
 },
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable}`}>
 <head>
 <link rel="icon" href="/icon.png" type="image/png" />
 </head>
 <body>{children}</body>
 </html>
 );
}
