"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color,
  onClick 
}) => {
  const colorClasses = {
    orange: 'from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700',
    blue: 'from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700',
    green: 'from-green-400 to-green-600 hover:from-green-500 hover:to-green-700',
    purple: 'from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700'
  };

  return (
    <div
      className="group cursor-pointer card-hover"
      onClick={onClick}
    >
      <div className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
        {/* Enhanced Color Header with Animation */}
        <div className={`h-32 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} p-6 flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
          <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="glass-enhanced p-4 rounded-full group-hover:scale-110 transition-transform duration-500 relative z-10">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="p-6 bg-white/95 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-blue-600 text-sm font-medium bg-blue-50 px-3 py-1 rounded-full">
              Multiple Quizzes
            </span>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard; 