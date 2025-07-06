import React, { useState, useEffect } from 'react';
import { ChevronLeft, Clock, Trophy, CheckCircle, XCircle, Star } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizInterfaceProps {
  quiz: {
    title: string;
    categoryId: string;
    questions: Question[];
    difficulty: string;
  };
  onBack: () => void;
  onComplete: (score: number) => void;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ quiz, onBack, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);

  // Initialize user answers array
  useEffect(() => {
    setUserAnswers(new Array(quiz.questions.length).fill(null));
  }, [quiz.questions.length]);

  useEffect(() => {
    if (showResults) return; // Don't run timer when showing results
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, showResults]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    // Update user answers array
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newUserAnswers);
    
    // Check if answer is correct
    if (answerIndex === quiz.questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(30);
    } else {
      // Quiz completed
      setShowResults(true);
      onComplete(score);
    }
  };

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const percentage = Math.round((score / quiz.questions.length) * 100);

  // Results Screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 floating-orbs relative overflow-hidden pt-20">
        {/* Particle System */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center text-white/90 hover:text-white transition-all duration-300 glass-enhanced rounded-lg px-4 py-2 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to Categories
            </button>
            
            <div className="flex items-center space-x-4 glass-enhanced rounded-lg px-4 py-2">
              <span className="text-orange-300 font-medium">{quiz.categoryId}</span>
              <span className="text-yellow-300 font-medium">{quiz.difficulty}</span>
            </div>
          </div>

          {/* Results Content */}
          <div className="glass-enhanced rounded-3xl p-8 animate-fadeIn backdrop-blur-xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h1>
              <p className="text-white/80 text-lg">{quiz.title}</p>
            </div>

            {/* Score Display */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{score}</div>
                  <div className="text-white/80 text-sm">out of {quiz.questions.length}</div>
                </div>
              </div>
              
              <div className="text-2xl font-bold text-white mb-2">{percentage}%</div>
              <div className="text-white/80 mb-6">
                {percentage >= 80 ? 'Excellent!' : 
                 percentage >= 60 ? 'Good job!' : 
                 percentage >= 40 ? 'Not bad!' : 'Keep practicing!'}
              </div>

              {/* Performance Stars */}
              <div className="flex justify-center space-x-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-8 h-8 ${
                      star <= Math.ceil(percentage / 20) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Review */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <h3 className="text-xl font-bold text-white mb-4">Question Review</h3>
              {quiz.questions.map((question, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={index} className="glass-card rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium mb-2">
                          Question {index + 1}: {question.text}
                        </p>
                        <div className="space-y-1">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`text-sm px-3 py-1 rounded ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                  : optionIndex === userAnswer && !isCorrect
                                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                  : 'text-white/60'
                              }`}
                            >
                              {option}
                              {optionIndex === question.correctAnswer && ' ✓'}
                              {optionIndex === userAnswer && !isCorrect && ' ✗'}
                            </div>
                          ))}
                        </div>
                        {question.explanation && (
                          <p className="text-white/70 text-sm mt-2 italic">
                            {question.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={onBack}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Back to Categories
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-animated-gradient floating-orbs relative overflow-hidden pt-20">
      {/* Particle System */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-white/90 hover:text-white transition-all duration-300 glass-enhanced rounded-lg px-4 py-2 hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          
          <div className="flex items-center space-x-4 glass-enhanced rounded-lg px-4 py-2">
            <span className="text-orange-300 font-medium">{quiz.categoryId}</span>
            <span className="text-yellow-300 font-medium">{quiz.difficulty}</span>
          </div>
        </div>

        {/* Enhanced Quiz Content */}
        <div className="glass-enhanced rounded-3xl p-8 animate-fadeIn backdrop-blur-xl">
          {/* Enhanced Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-white/80 bg-white/20 px-3 py-1 rounded-full">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 glass-card rounded-lg px-3 py-1">
                  <Clock className="w-4 h-4 text-white/70" />
                  <span className={`text-sm font-medium ${timeLeft <= 10 ? 'text-red-300 animate-pulse' : 'text-white'}`}>
                    0:{timeLeft.toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="flex items-center space-x-2 glass-card rounded-lg px-3 py-1">
                  <Trophy className="w-4 h-4 text-white/70" />
                  <span className="text-sm font-medium text-white">
                    Score: {score}/{quiz.questions.length}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-500 animate-shimmer"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Enhanced Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-8 animate-slideUp">
              {quiz.questions[currentQuestion].text}
            </h2>
            
            <div className="space-y-4">
              {quiz.questions[currentQuestion].options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] relative overflow-hidden";
                
                if (isAnswered) {
                  if (index === quiz.questions[currentQuestion].correctAnswer) {
                    buttonClass += " bg-green-500/20 border-green-400 text-green-100 shadow-green-500/25";
                  } else if (index === selectedAnswer) {
                    buttonClass += " bg-red-500/20 border-red-400 text-red-100 shadow-red-500/25";
                  } else {
                    buttonClass += " bg-white/10 border-white/20 text-white/60";
                  }
                } else {
                  buttonClass += " glass-card border-white/30 text-white hover:border-blue-400 hover:bg-blue-500/20 hover:text-blue-100";
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={isAnswered}
                  >
                    <div className="relative z-10 font-medium">
                      {option}
                    </div>
                    {!isAnswered && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;