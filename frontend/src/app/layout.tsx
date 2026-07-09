import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from 'react-hot-toast';

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
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
