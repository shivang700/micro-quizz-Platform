'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, BookOpen, Beaker, Plus, Code, LucideIcon } from 'lucide-react';
import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import Footer from '@/components/Footer';
import { fetchCategories } from '@/lib/api';
import { Category } from '@/data/quizzes';

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

export default function HomePage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('home');
  
  // Data states
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Failed to load categories. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/quizzes/${categoryId}`);
  };

  return (
    <div className="min-h-screen">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      {/* Enhanced Hero Section with Animated Background */}
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 floating-orbs relative overflow-hidden pt-20">
        {/* Particle System */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        {/* Wave Animation */}
        <div className="wave-animation"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center py-20">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 animate-fadeIn">
              Micro-Quiz Platform
            </h1>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto animate-fadeIn backdrop-blur-sm bg-white/10 rounded-2xl p-6">
              Test your knowledge with our interactive quizzes
            </p>
          </div>

          {/* Enhanced Categories Section */}
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-slideUp">
                Choose Your Category
              </h2>
              <p className="text-white/80 max-w-3xl mx-auto glass-enhanced rounded-2xl p-6 animate-slideUp">
                Select a category below to start your quiz journey. Each category contains multiple
                quizzes with varying difficulty levels to challenge your knowledge.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="glass-card rounded-2xl p-6 animate-pulse">
                    <div className="h-32 bg-white/10 rounded-t-xl mb-4"></div>
                    <div className="h-4 bg-white/20 rounded mb-2"></div>
                    <div className="h-3 bg-white/10 rounded"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center glass-enhanced rounded-2xl p-8">
                <p className="text-red-300 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((category, index) => {
                  const IconComponent = iconMap[category.id] || Check;
                  const color = colorMap[category.id] || 'blue';
                  
                  return (
                    <div 
                      key={category.id}
                      className="animate-scaleIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CategoryCard
                        title={category.name}
                        description={category.description}
                        icon={IconComponent}
                        color={color}
                        onClick={() => handleCategorySelect(category.id)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Enhanced Features Section */}
          <div className="py-16 glass-enhanced rounded-3xl mb-20 animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Choose Our Platform?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
              <div className="text-center p-6 glass-card rounded-2xl card-hover">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Interactive Learning</h3>
                <p className="text-white/80">Engage with dynamic quizzes that adapt to your learning style</p>
              </div>
              <div className="text-center p-6 glass-card rounded-2xl card-hover">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Instant Feedback</h3>
                <p className="text-white/80">Get immediate results and explanations for better understanding</p>
              </div>
              <div className="text-center p-6 glass-card rounded-2xl card-hover">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Multiple Categories</h3>
                <p className="text-white/80">Choose from various subjects to expand your knowledge</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
