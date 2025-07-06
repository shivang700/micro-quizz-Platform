import { Category, Quiz } from '@/data/quizzes';

// Client-side API function for categories (used by home page)
export async function fetchCategories(): Promise<Category[]> {
  try {
    // For client-side, we can import directly from the data file
    const { getCategories } = await import('@/data/quizzes');
    return getCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

// Server-side data fetching functions (for SSG/SSR)
export async function getCategoriesSSR(): Promise<Category[]> {
  // For server-side rendering, we can import directly from the data file
  const { getCategories } = await import('@/data/quizzes');
  return getCategories();
}

export async function getQuizzesByCategorySSR(categoryId: string): Promise<{ quizzes: Quiz[], category: Category }> {
  const { getQuizzesByCategory, getCategoryById } = await import('@/data/quizzes');
  
  const quizzes = getQuizzesByCategory(categoryId);
  const category = getCategoryById(categoryId);
  
  if (!category) {
    throw new Error('Category not found');
  }
  
  return { quizzes, category };
}

export async function getCategoryByIdSSR(categoryId: string): Promise<Category> {
  const { getCategoryById } = await import('@/data/quizzes');
  
  const category = getCategoryById(categoryId);
  
  if (!category) {
    throw new Error('Category not found');
  }
  
  return category;
}

export async function getQuizByIdSSR(quizId: string): Promise<Quiz> {
  const { getQuizById } = await import('@/data/quizzes');
  
  const quiz = getQuizById(quizId);
  
  if (!quiz) {
    throw new Error('Quiz not found');
  }
  
  return quiz;
} 