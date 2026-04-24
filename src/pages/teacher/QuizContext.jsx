// QuizContext.jsx
import { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);

  const addQuiz = (quiz) => {
    setQuizzes((prev) => [...prev, { id: Date.now(), ...quiz }]);
  };

  return (
    <QuizContext.Provider value={{ quizzes, addQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};