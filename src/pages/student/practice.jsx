// practice.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  ChevronRight,
  Home,
  RotateCcw,
  AlertCircle
} from 'lucide-react';

const Practice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subject, questionType, topic, numQuestions } = location.state || {};

  // Redirect if essential data is missing
  useEffect(() => {
    if (!subject || !questionType || !numQuestions) {
      navigate('/practicehub');
    }
  }, [subject, questionType, numQuestions, navigate]);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Generate questions by calling the AI backend
  useEffect(() => {
    if (!subject || !numQuestions) return;

    const generateFromAI = async () => {
      try {
        // Replace with your actual AI backend endpoint
        const response = await fetch('/api/generate-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject,
            questionType,
            topic: topic || 'General',
            numQuestions
          })
        });

        if (!response.ok) throw new Error('Failed to generate questions');

        const data = await response.json();
        // Expected data format: { questions: [{ id, type, text, options, correctAnswer }] }
        setQuestions(data.questions);
      } catch (err) {
        console.error('AI generation failed, using fallback mock:', err);
        setError('Using fallback questions (backend unreachable).');
        // Fallback to mock generator (for development/demo)
        setQuestions(generateMockQuestions());
      } finally {
        setLoading(false);
      }
    };

    // Mock generator (only used when backend fails or during development)
    const generateMockQuestions = () => {
      const mockQuestions = [];
      const typeList = questionType.split(',').map(t => t.trim());
      const availableTypes = typeList.length ? typeList : ['MCQ'];

      for (let i = 1; i <= numQuestions; i++) {
        const qType = availableTypes[(i - 1) % availableTypes.length];
        let questionText = '';
        let options = [];
        let correctAnswer = '';

        const subjectLower = subject.toLowerCase();
        const topicText = topic && topic !== 'General' ? topic : subject;

        if (qType === 'MCQ') {
          if (subjectLower === 'biology') {
            questionText = `${topicText} MCQ ${i}: What is the primary function of mitochondria?`;
            options = ['Energy production', 'Protein synthesis', 'Waste disposal', 'Cell division'];
            correctAnswer = 'Energy production';
          } else if (subjectLower === 'physics') {
            questionText = `${topicText} MCQ ${i}: Newton's second law states that force equals mass times ___.`;
            options = ['Velocity', 'Acceleration', 'Momentum', 'Inertia'];
            correctAnswer = 'Acceleration';
          } else if (subjectLower === 'chemistry') {
            questionText = `${topicText} MCQ ${i}: What is the pH of a neutral solution?`;
            options = ['0', '7', '14', '1'];
            correctAnswer = '7';
          } else {
            questionText = `${topicText} MCQ ${i}: Which of the following is correct?`;
            options = ['Option A', 'Option B', 'Option C', 'Option D'];
            correctAnswer = 'Option A';
          }
        } else if (qType === 'True/False') {
          questionText = `${topicText} Statement ${i}: The concept is fundamental to ${subject}.`;
          options = ['True', 'False'];
          correctAnswer = 'True';
        } else {
          questionText = `${topicText} Short Answer ${i}: Explain the main idea in your own words.`;
          options = [];
          correctAnswer = 'Full explanation evaluated by AI.';
        }

        mockQuestions.push({
          id: i,
          type: qType,
          text: questionText,
          options,
          correctAnswer,
          userAnswer: null,
          isCorrect: false
        });
      }
      return mockQuestions;
    };

    // Call the AI generator
    generateFromAI();
  }, [subject, topic, numQuestions, questionType]);

  const handleAnswer = (answer) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [currentIndex]: answer }));
    setQuestions(prev => prev.map((q, idx) =>
      idx === currentIndex ? { ...q, userAnswer: answer } : q
    ));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    const updated = questions.map(q => {
      let isCorrect = false;
      if (q.type === 'MCQ' || q.type === 'True/False') {
        isCorrect = q.userAnswer === q.correctAnswer;
      } else {
        // Short answer: any non‑empty answer is considered correct for demo
        isCorrect = q.userAnswer && q.userAnswer.trim().length > 0;
      }
      if (isCorrect) correctCount++;
      return { ...q, isCorrect };
    });
    setQuestions(updated);
    setScore(correctCount);
    setSubmitted(true);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setQuestions(prev => prev.map(q => ({ ...q, userAnswer: null, isCorrect: false })));
  };

  const handleGoHome = () => {
    navigate('/practicehub');
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-[#0056D2] text-lg mb-2">Generating your AI‑powered practice set...</div>
        <div className="text-xs text-gray-400">This may take a few seconds</div>
      </div>
    );
  }

  if (error && !questions.length) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white p-5">
        <div className="border border-red-300 bg-red-50 p-5 text-center max-w-md">
          <AlertCircle size={32} className="text-red-500 mx-auto mb-3" />
          <p className="text-red-700 font-medium">Failed to load questions</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          <button
            onClick={handleGoHome}
            className="mt-4 px-4 py-2 bg-[#0056D2] text-white hover:bg-[#0045b0]"
          >
            Back to Hub
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-red-600 text-lg">No questions available. Please go back and try again.</div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white flex-shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <button onClick={handleGoHome} className="flex items-center gap-1 text-gray-600 hover:text-[#0056D2]">
            <ArrowLeft size={18} />
            <span className="text-sm">Back</span>
          </button>
          <div className="text-center">
            <h1 className="text-base font-bold text-gray-900">{subject} Practice</h1>
            <p className="text-xs text-gray-500">{topic || 'General'}</p>
          </div>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto">
        {!submitted ? (
          <div className="p-5">
            {/* Question card */}
            <div className="border border-gray-200 bg-white">
              <div className="bg-[#0056D2] px-5 py-2 flex justify-between items-center">
                <span className="text-white text-sm font-medium">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="text-white text-xs bg-white/20 px-2 py-0.5">{currentQ.type}</span>
              </div>
              <div className="p-5">
                <p className="text-gray-800 text-base mb-6">{currentQ.text}</p>

                {currentQ.options.length > 0 ? (
                  <div className="space-y-2">
                    {currentQ.options.map((opt, idx) => (
                      <button
                        key={`${currentQ.id}-${idx}`}
                        onClick={() => handleAnswer(opt)}
                        className={`w-full text-left p-3 border ${
                          answers[currentIndex] === opt
                            ? 'border-[#0056D2] bg-[#0056D2]/10'
                            : 'border-gray-200 hover:bg-gray-50'
                        } transition-colors`}
                      >
                        <span className="text-sm">{opt}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <textarea
                    rows={4}
                    placeholder="Type your answer here..."
                    value={answers[currentIndex] || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="w-full p-3 border border-gray-200 focus:border-[#0056D2] focus:outline-none text-sm"
                  />
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-5">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-4 py-2 border text-sm font-medium ${
                  currentIndex === 0
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              {!isLast ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-[#0056D2] text-white text-sm font-medium hover:bg-[#0045b0] flex items-center gap-1"
                >
                  Next <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!answers[currentIndex]}
                  className={`px-4 py-2 text-sm font-medium ${
                    answers[currentIndex]
                      ? 'bg-[#0056D2] text-white hover:bg-[#0045b0]'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit All
                </button>
              )}
            </div>
          </div>
        ) : (
          // Results view (unchanged)
          <div className="p-5">
            <div className="border border-gray-200 bg-white text-center p-8">
              <div className="text-5xl font-bold text-[#0056D2] mb-3">
                {score} / {questions.length}
              </div>
              <p className="text-gray-600 mb-6">
                {score === questions.length
                  ? 'Perfect! Excellent work.'
                  : score >= questions.length / 2
                  ? 'Good job! Keep practicing.'
                  : 'Review the material and try again.'}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <RotateCcw size={14} /> Restart
                </button>
                <button
                  onClick={handleGoHome}
                  className="px-5 py-2 bg-[#0056D2] text-white hover:bg-[#0045b0] flex items-center gap-2"
                >
                  <Home size={14} /> Back to Hub
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-800">Review your answers</h3>
              {questions.map((q, idx) => (
                <div key={q.id} className="border border-gray-200 p-4">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">
                        Q{idx + 1} · {q.type}
                      </p>
                      <p className="text-sm text-gray-800">{q.text}</p>
                      <p className="text-xs mt-2">
                        <span className="font-medium">Your answer:</span>{' '}
                        <span className={q.isCorrect ? 'text-green-700' : 'text-red-600'}>
                          {q.userAnswer || '(not answered)'}
                        </span>
                      </p>
                      {!q.isCorrect && q.type !== 'Short Answer' && (
                        <p className="text-xs text-gray-600 mt-1">
                          <span className="font-medium">Correct:</span> {q.correctAnswer}
                        </p>
                      )}
                    </div>
                    {q.isCorrect ? (
                      <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                    ) : (
                      <XCircle size={18} className="text-red-500 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Practice;