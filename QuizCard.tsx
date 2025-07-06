'use client';

import React from 'react';

interface QuizCardProps {
  title: string;
  description: string;
  questions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onStart: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  title, 
  description, 
  questions, 
  difficulty, 
  onStart 
}) => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Hard: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div className="glass-card rounded-2xl p-6 card-hover group relative overflow-hidden">
      {/* Animated Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300">
            {title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[difficulty]} backdrop-blur-sm`}>
            {difficulty}
          </span>
        </div>
        
        <p className="text-white/80 mb-6 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-white/70">
              <span className="mr-2">Questions:</span>
              <span className="font-medium text-white bg-white/20 px-2 py-1 rounded-lg">{questions}</span>
            </div>
            <div className="flex items-center text-sm text-white/70">
              <span className="mr-2">Difficulty:</span>
              <span className={`font-medium px-2 py-1 rounded-lg ${difficultyColors[difficulty]}`}>
                {difficulty}
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={onStart}
          className="w-full btn-gradient text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center group relative overflow-hidden"
        >
          <span className="relative z-10">Start Quiz</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuizCard; 