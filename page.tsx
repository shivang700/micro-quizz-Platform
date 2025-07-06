'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import QuizInterface from '@/components/QuizInterface';
import Footer from '@/components/Footer';
import { getQuizByIdSSR, getCategoryByIdSSR } from '@/lib/api';
import { Quiz, Category } from '@/data/quizzes';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// This function runs on the server for each request (SSR)
async function getQuizData(quizId: string): Promise<{ quiz: Quiz, category: Category }> {
  try {
    // Use direct data import to get complete quiz data with correct answers
    const quiz = await getQuizByIdSSR(quizId);
    const category = await getCategoryByIdSSR(quiz.categoryId);
    
    if (!category) {
      throw new Error('Category not found');
    }
    
    return { quiz, category };
  } catch (error) {
    console.error('Error fetching quiz:', error);
    throw new Error('Failed to load quiz');
  }
}

export default function QuizPage({ params }: PageProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { id } = await params;
        const quizData = await getQuizData(id);
        setQuiz(quizData.quiz);
        setCategory(quizData.category);
      } catch (err) {
        console.error('Error loading quiz:', err);
        setError('Failed to load quiz. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, [params]);

  const handleBack = () => {
    if (category) {
      window.location.href = `/quizzes/${category.id}`;
    } else {
      window.location.href = '/';
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleComplete = (score: number) => {
    // Handle quiz completion - could save score, show results, etc.
    // Don't navigate away immediately - let the QuizInterface show results
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <Header currentPage="quiz" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/80">Loading quiz...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <Header currentPage="quiz" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center glass-enhanced rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Quiz Not Found</h2>
            <p className="text-white/80 mb-6">{error || 'The requested quiz could not be loaded.'}</p>
            <button
              onClick={handleBack}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header currentPage="quiz" />
      
      <QuizInterface
        quiz={quiz}
        onBack={handleBack}
        onComplete={handleComplete}
      />
      
      <Footer />
    </div>
  );
} 