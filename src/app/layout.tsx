import './globals.css';
import type { Metadata } from 'next';
import { M_PLUS_Rounded_1c } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ['400', '700'],
  variable: '--font-mplus-rounded',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vipelar',
  description: 'Web App Creator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${mPlusRounded.className} antialiased`}>
        <Header />
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 pt-20 gap-16 sm:p-20">
          <div className="justify-self-start">{/* <Breadcrumbs /> */}</div>
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
