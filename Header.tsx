'use client';

import Link from 'next/link';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export default function Header({ currentPage = 'home', onNavigate }: HeaderProps) {
  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-enhanced backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {onNavigate ? (
              <button
                onClick={() => handleNavigate('home')}
                className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
              >
                Micro-Quiz
              </button>
            ) : (
              <Link href="/" className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300">
                Micro-Quiz
              </Link>
            )}
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {onNavigate ? (
              <>
                <button
                  onClick={() => handleNavigate('home')}
                  className={`text-white/80 hover:text-white transition-colors duration-300 ${
                    currentPage === 'home' ? 'text-white font-semibold' : ''
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigate('category')}
                  className={`text-white/80 hover:text-white transition-colors duration-300 ${
                    currentPage === 'category' ? 'text-white font-semibold' : ''
                  }`}
                >
                  Categories
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/" 
                  className={`text-white/80 hover:text-white transition-colors duration-300 ${
                    currentPage === 'home' ? 'text-white font-semibold' : ''
                  }`}
                >
                  Home
                </Link>
                <Link 
                  href="/quizzes" 
                  className={`text-white/80 hover:text-white transition-colors duration-300 ${
                    currentPage === 'category' ? 'text-white font-semibold' : ''
                  }`}
                >
                  Categories
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 