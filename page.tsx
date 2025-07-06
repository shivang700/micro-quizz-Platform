'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Check, Beaker, Plus, Code, LucideIcon } from 'lucide-react';
import Header from '@/components/Header';
import QuizCard from '@/components/QuizCard';
import Footer from '@/components/Footer';
import { getQuizzesByCategorySSR } from '@/lib/api';
import { Category, Quiz } from '@/data/quizzes';

// Icon mapping for categories
const iconMap: Record<string, LucideIcon> = {
  history: Check,
  science: Beaker,
  math: Plus,
  programming: Code
};

// Color mapping for categories
const colorMap: Record<string, string> = {
  history: 'orange',
  science: 'blue',
  math: 'green',
  programming: 'purple'
};

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}



// This function runs on the server for each request (SSR)
async function getQuizzesData(categoryId: string): Promise<{ quizzes: Quiz[], category: Category }> {
  try {
    // Use direct data import for SSR to get complete data
    return await getQuizzesByCategorySSR(categoryId);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw new Error('Failed to load quizzes');
  }
}

export default function CategoryPage({ params }: PageProps) {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { category } = await params;
        const data = await getQuizzesData(category);
        setQuizzes(data.quizzes);
        setCategoryData(data.category);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header currentPage="category" />
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/80">Loading quizzes...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="min-h-screen">
        <Header currentPage="category" />
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 flex items-center justify-center">
          <div className="text-center glass-enhanced rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Error Loading Category</h2>
            <p className="text-white/80 mb-6">{error || 'Category not found.'}</p>
            <Link
              href="/"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Back to Categories
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header currentPage="category" />
      
      {/* Enhanced Category Page with Animated Background */}
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 floating-orbs relative overflow-hidden pt-20">
        {/* Particle System */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-8">
            {/* Back Button */}
            <Link
              href="/"
              className="flex items-center text-white/90 hover:text-white mb-8 transition-all duration-300 glass-enhanced rounded-lg px-4 py-2 hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Categories
            </Link>

            {/* Category Header */}
            <div className="flex items-center justify-between mb-8 glass-enhanced rounded-2xl p-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 gradient-text">
                  {categoryData.name}
                </h1>
                <p className="text-white/80">{categoryData.description}</p>
              </div>
              <div className={`p-4 rounded-full bg-gradient-to-r animate-pulse ${
                colorMap[categoryData.id] === 'orange' ? 'from-orange-400 to-orange-600' :
                colorMap[categoryData.id] === 'blue' ? 'from-blue-400 to-blue-600' :
                colorMap[categoryData.id] === 'green' ? 'from-green-400 to-green-600' :
                'from-purple-400 to-purple-600'
              }`}>
                {(() => {
                  const IconComponent = iconMap[categoryData.id] || Check;
                  return <IconComponent className="w-8 h-8 text-white" />;
                })()}
              </div>
            </div>

            {/* Category Info */}
            <div className="mb-8 glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Available Quizzes</h2>
              <p className="text-white/80">
                Choose a quiz below to start testing your {categoryData.name.toLowerCase()} knowledge. Each quiz has multiple
                questions with varying difficulty levels.
              </p>
            </div>

            {/* Quizzes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {quizzes.map((quiz, index) => (
                <div 
                  key={quiz.id}
                  className="animate-slideUp"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <QuizCard
                    title={quiz.title}
                    description={quiz.description}
                    questions={quiz.questions.length}
                    difficulty={quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1) as 'Easy' | 'Medium' | 'Hard'}
                    onStart={() => {
                      router.push(`/quiz/${quiz.id}`);
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {quizzes.length === 0 && (
              <div className="text-center py-12 glass-enhanced rounded-2xl">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Quizzes Available</h3>
                <p className="text-white/80 mb-6">
                  There are currently no quizzes available for this category.
                </p>
                <Link
                  href="/"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Back to Categories
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 