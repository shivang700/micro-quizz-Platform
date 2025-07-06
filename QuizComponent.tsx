'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Quiz, Category } from '@/data/quizzes';

interface QuizComponentProps {
  quiz: Quiz;
  category: Category;
}

interface QuizState {
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  answers: (number | null)[];
  showFeedback: boolean;
  isCorrect: boolean;
  score: number;
  isCompleted: boolean;
  timeElapsed: number;
}

export default function QuizComponent({ quiz, category }: QuizComponentProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswer: null,
    answers: new Array(quiz.questions.length).fill(null),
    showFeedback: false,
    isCorrect: false,
    score: 0,
    isCompleted: false,
    timeElapsed: 0,
  });

  const [startTime] = useState(Date.now());

  // Timer effect
  useEffect(() => {
    if (!quizState.isCompleted) {
      const timer = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeElapsed: Math.floor((Date.now() - startTime) / 1000)
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizState.isCompleted, startTime]);

  const currentQuestion = quiz.questions[quizState.currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizState.showFeedback) return; // Prevent changing answer after selection

    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      showFeedback: true,
      isCorrect: answerIndex === currentQuestion.correctAnswer,
    }));
  };

  const handleNextQuestion = () => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestionIndex] = quizState.selectedAnswer;

    const newScore = quizState.isCorrect ? quizState.score + 1 : quizState.score;
    const isLastQuestion = quizState.currentQuestionIndex === quiz.questions.length - 1;

    if (isLastQuestion) {
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        score: newScore,
        isCompleted: true,
        showFeedback: false,
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        score: newScore,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: null,
        showFeedback: false,
        isCorrect: false,
      }));
    }
  };

  const handleRestartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswer: null,
      answers: new Array(quiz.questions.length).fill(null),
      showFeedback: false,
      isCorrect: false,
      score: 0,
      isCompleted: false,
      timeElapsed: 0,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (quizState.isCompleted) {
    const percentage = Math.round((quizState.score / quiz.questions.length) * 100);
    const isPerfect = quizState.score === quiz.questions.length;
    const isGood = percentage >= 70;
    const isAverage = percentage >= 50;

    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          {/* Result Icon */}
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
            isPerfect ? 'bg-green-100' : isGood ? 'bg-blue-100' : isAverage ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            {isPerfect ? (
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : isGood ? (
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ) : (
              <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            )}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
          
          {/* Score Display */}
          <div className="mb-8">
            <div className="text-6xl font-bold mb-2">
              <span className={isPerfect ? 'text-green-600' : isGood ? 'text-blue-600' : isAverage ? 'text-yellow-600' : 'text-red-600'}>
                {quizState.score}
              </span>
              <span className="text-gray-400">/{quiz.questions.length}</span>
            </div>
            <div className={`text-xl font-semibold ${
              isPerfect ? 'text-green-600' : isGood ? 'text-blue-600' : isAverage ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {percentage}%
            </div>
            <div className="text-gray-600 mt-2">
              {isPerfect ? 'Perfect Score! 🎉' : 
               isGood ? 'Great Job! 👍' : 
               isAverage ? 'Good Effort! 💪' : 
               'Keep Practicing! 📚'}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">{formatTime(quizState.timeElapsed)}</div>
              <div className="text-sm text-gray-600">Time Taken</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900">{quiz.questions.length}</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </button>
            <Link
              href={`/quizzes/${category.id}`}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
            >
              More Quizzes
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
            >
              All Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {quizState.currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
          <span className="text-sm text-gray-500">{formatTime(quizState.timeElapsed)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((quizState.currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQuestion.text}
        </h2>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={quizState.showFeedback}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                quizState.selectedAnswer === index
                  ? quizState.showFeedback
                    ? quizState.isCorrect
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${quizState.showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                  quizState.selectedAnswer === index
                    ? quizState.showFeedback
                      ? quizState.isCorrect
                        ? 'border-green-500 bg-green-500'
                        : 'border-red-500 bg-red-500'
                      : 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {quizState.selectedAnswer === index && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-gray-900">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {quizState.showFeedback && (
        <div className={`mb-6 p-4 rounded-lg ${
          quizState.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center">
            {quizState.isCorrect ? (
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className={`font-medium ${
              quizState.isCorrect ? 'text-green-800' : 'text-red-800'
            }`}>
              {quizState.isCorrect ? 'Correct!' : 'Incorrect!'}
            </span>
          </div>
          {currentQuestion.explanation && (
            <p className="text-sm text-gray-600 mt-2 ml-7">
              {currentQuestion.explanation}
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Score: {quizState.score}/{quizState.currentQuestionIndex}
        </div>
        {quizState.showFeedback && (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {quizState.currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
} 