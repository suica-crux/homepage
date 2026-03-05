import React from 'react';
import '@fontsource/m-plus-rounded-1c/400.css';
import '@fontsource/m-plus-rounded-1c/700.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/global.css';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Vipelar' }) => {
  return (
    <div className="antialiased min-h-screen">
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 rounded-full bg-purple-200/50 dark:bg-purple-900/20 blur-[100px] -z-10 transition-colors duration-300"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 rounded-full bg-blue-100/60 dark:bg-blue-900/20 blur-[120px] -z-10 transition-colors duration-300"></div>
      </div>
      <Header />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 pt-20 gap-16 sm:p-20">
        <div className="justify-self-start"></div>
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
