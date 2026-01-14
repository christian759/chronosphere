import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-fast" />
      </div>
      
      <Navbar />
      
      <main className="relative pt-24 px-4 md:px-8 max-w-7xl mx-auto pb-12">
        {children}
      </main>
    </div>
  );
}
