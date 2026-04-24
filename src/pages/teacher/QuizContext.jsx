// QuizContext.jsx
import { createContext, useContext, useState, useMemo } from 'react';

const QuizContext = createContext(null);

// Custom hook (separate export is OK if file only has components + hooks properly structured)
export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within QuizProvider');
  }
  return context;
};

// Provider component
export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);

  const addQuiz = (quiz) => {
    setQuizzes((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...quiz }
    ]);
  };

  const value = useMemo(() => {
    return { quizzes, addQuiz };
  }, [quizzes]);

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};