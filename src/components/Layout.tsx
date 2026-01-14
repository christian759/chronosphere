import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-black/5 via-gray-400/5 to-white/5 dark:from-black/20 dark:via-gray-700/10 dark:to-white/5">
      </div>

      <Navbar />

      <main className="relative pt-24 px-4 md:px-8 max-w-7xl mx-auto pb-12">
        {children}
      </main>
    </div>
  );
}
