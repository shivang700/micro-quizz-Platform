export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  questions: Question[];
  timeLimit?: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
}

export const categories: Category[] = [
  {
    id: 'history',
    name: 'History',
    description: 'Test your knowledge of world history and historical events',
    icon: '/icons/history.svg',
    color: 'bg-amber-500'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Explore scientific concepts and discoveries',
    icon: '/icons/science.svg',
    color: 'bg-blue-500'
  },
  {
    id: 'math',
    name: 'Mathematics',
    description: 'Challenge yourself with mathematical problems',
    icon: '/icons/math.svg',
    color: 'bg-green-500'
  },
  {
    id: 'programming',
    name: 'Programming',
    description: 'Test your coding knowledge and programming concepts',
    icon: '/icons/programming.svg',
    color: 'bg-purple-500'
  }
];

export const quizzes: Quiz[] = [
  {
    id: 'ancient-civilizations',
    title: 'Ancient Civilizations',
    description: 'Test your knowledge of ancient civilizations and their contributions',
    categoryId: 'history',
    difficulty: 'medium',
    questions: [
      {
        id: '1',
        text: 'Which ancient civilization built the Great Pyramid of Giza?',
        options: ['Ancient Greece', 'Ancient Egypt', 'Ancient Rome', 'Ancient China'],
        correctAnswer: 1,
        explanation: 'The Great Pyramid of Giza was built by the Ancient Egyptians around 2560 BCE.'
      },
      {
        id: '2',
        text: 'What was the capital of the Roman Empire?',
        options: ['Athens', 'Rome', 'Constantinople', 'Alexandria'],
        correctAnswer: 1,
        explanation: 'Rome was the capital of the Roman Empire during its peak.'
      },
      {
        id: '3',
        text: 'Which ancient civilization developed the concept of democracy?',
        options: ['Ancient Egypt', 'Ancient Greece', 'Ancient Rome', 'Ancient Persia'],
        correctAnswer: 1,
        explanation: 'The concept of democracy was developed in Ancient Greece, particularly in Athens.'
      }
    ]
  },
  {
    id: 'world-wars',
    title: 'World Wars',
    description: 'Learn about the major events and figures of World War I and II',
    categoryId: 'history',
    difficulty: 'hard',
    questions: [
      {
        id: '1',
        text: 'In which year did World War I begin?',
        options: ['1914', '1915', '1916', '1917'],
        correctAnswer: 0,
        explanation: 'World War I began in 1914 with the assassination of Archduke Franz Ferdinand.'
      },
      {
        id: '2',
        text: 'Which country was NOT part of the Allied Powers in World War II?',
        options: ['United States', 'United Kingdom', 'Soviet Union', 'Germany'],
        correctAnswer: 3,
        explanation: 'Germany was part of the Axis Powers, not the Allied Powers.'
      }
    ]
  },
  {
    id: 'basic-physics',
    title: 'Basic Physics',
    description: 'Fundamental concepts in physics and mechanics',
    categoryId: 'science',
    difficulty: 'easy',
    questions: [
      {
        id: '1',
        text: 'What is the SI unit of force?',
        options: ['Joule', 'Watt', 'Newton', 'Pascal'],
        correctAnswer: 2,
        explanation: 'The Newton (N) is the SI unit of force, defined as the force needed to accelerate 1 kg at 1 m/s².'
      },
      {
        id: '2',
        text: 'Which of the following is a vector quantity?',
        options: ['Mass', 'Temperature', 'Velocity', 'Time'],
        correctAnswer: 2,
        explanation: 'Velocity is a vector quantity because it has both magnitude and direction.'
      },
      {
        id: '3',
        text: 'What is the law of conservation of energy?',
        options: [
          'Energy can be created but not destroyed',
          'Energy can be destroyed but not created',
          'Energy cannot be created or destroyed, only transformed',
          'Energy always increases over time'
        ],
        correctAnswer: 2,
        explanation: 'The law of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another.'
      }
    ]
  },
  {
    id: 'chemistry-basics',
    title: 'Chemistry Basics',
    description: 'Introduction to chemical concepts and reactions',
    categoryId: 'science',
    difficulty: 'medium',
    questions: [
      {
        id: '1',
        text: 'What is the chemical symbol for gold?',
        options: ['Ag', 'Au', 'Fe', 'Cu'],
        correctAnswer: 1,
        explanation: 'Au comes from the Latin word "aurum" meaning gold.'
      },
      {
        id: '2',
        text: 'What type of bond is formed when electrons are shared between atoms?',
        options: ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Hydrogen bond'],
        correctAnswer: 1,
        explanation: 'A covalent bond is formed when atoms share electrons.'
      }
    ]
  },
  {
    id: 'basic-algebra',
    title: 'Basic Algebra',
    description: 'Fundamental algebraic concepts and equations',
    categoryId: 'math',
    difficulty: 'easy',
    questions: [
      {
        id: '1',
        text: 'What is the value of x in the equation: 2x + 5 = 13?',
        options: ['3', '4', '5', '6'],
        correctAnswer: 1,
        explanation: '2x + 5 = 13 → 2x = 8 → x = 4'
      },
      {
        id: '2',
        text: 'What is the slope of the line y = 3x + 2?',
        options: ['2', '3', '5', '6'],
        correctAnswer: 1,
        explanation: 'In the equation y = mx + b, m represents the slope. So the slope is 3.'
      },
      {
        id: '3',
        text: 'What is the solution to x² - 4 = 0?',
        options: ['x = 2', 'x = -2', 'x = ±2', 'x = 4'],
        correctAnswer: 2,
        explanation: 'x² - 4 = 0 → x² = 4 → x = ±2'
      }
    ]
  },
  {
    id: 'geometry-basics',
    title: 'Geometry Basics',
    description: 'Basic geometric shapes and properties',
    categoryId: 'math',
    difficulty: 'medium',
    questions: [
      {
        id: '1',
        text: 'What is the area of a circle with radius 5 units?',
        options: ['25π', '50π', '75π', '100π'],
        correctAnswer: 0,
        explanation: 'Area = πr² = π(5)² = 25π'
      },
      {
        id: '2',
        text: 'How many sides does a hexagon have?',
        options: ['5', '6', '7', '8'],
        correctAnswer: 1,
        explanation: 'A hexagon has 6 sides (hexa = six).'
      }
    ]
  },
  {
    id: 'javascript-basics',
    title: 'JavaScript Basics',
    description: 'Fundamental JavaScript concepts and syntax',
    categoryId: 'programming',
    difficulty: 'easy',
    questions: [
      {
        id: '1',
        text: 'Which keyword is used to declare a variable in JavaScript?',
        options: ['var', 'let', 'const', 'All of the above'],
        correctAnswer: 3,
        explanation: 'JavaScript has three ways to declare variables: var, let, and const.'
      },
      {
        id: '2',
        text: 'What is the result of 2 + "2" in JavaScript?',
        options: ['4', '22', 'NaN', 'Error'],
        correctAnswer: 1,
        explanation: 'JavaScript performs type coercion, converting the number 2 to a string and concatenating them.'
      },
      {
        id: '3',
        text: 'Which method is used to add an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0,
        explanation: 'The push() method adds one or more elements to the end of an array.'
      }
    ]
  },
  {
    id: 'react-fundamentals',
    title: 'React Fundamentals',
    description: 'Core React concepts and component lifecycle',
    categoryId: 'programming',
    difficulty: 'medium',
    questions: [
      {
        id: '1',
        text: 'What is a React Hook?',
        options: [
          'A function that lets you use state and other React features in functional components',
          'A way to connect to external APIs',
          'A method for styling components',
          'A type of React component'
        ],
        correctAnswer: 0,
        explanation: 'Hooks are functions that let you use state and other React features in functional components.'
      },
      {
        id: '2',
        text: 'Which Hook should you use to perform side effects in functional components?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctAnswer: 1,
        explanation: 'useEffect is used to perform side effects in functional components, similar to componentDidMount and componentDidUpdate.'
      }
    ]
  }
];

// Helper functions
export const getCategories = (): Category[] => {
  return categories;
};

export const getQuizzesByCategory = (categoryId: string): Quiz[] => {
  return quizzes.filter(quiz => quiz.categoryId === categoryId);
};

export const getQuizById = (id: string): Quiz | undefined => {
  return quizzes.find(quiz => quiz.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
}; 