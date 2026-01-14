import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative bg-white dark:bg-black transition-colors duration-500">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-black/5 via-gray-400/5 to-white/5 dark:from-black/20 dark:via-gray-700/10 dark:to-white/5">
      </div>

      <main className="relative">
        {children}
      </main>
    </div>
  );
}
