import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* 
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <p>TODO: Header/Navbar Component (e.g., using shadcn/ui Navigation Menu)</p>
        </div>
      </header>
      */}

      <main className="container mx-auto flex-grow p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      <footer className="border-t border-border/40 py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with ❤️ by Pinye Wang. The source code is available on GitHub.
          </p>
          {/* TODO: Add other footer elements if needed, like social links or a visitor counter component */}
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 