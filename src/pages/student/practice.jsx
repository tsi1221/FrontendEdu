import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  ChevronRight,
  Home,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { generatePracticeQuiz, submitPracticeQuiz } from "../../services/api";
import { LanguageContext } from "../../context/LanguageContext";

const PRACTICE_TEXT = {
  en: {
    fallbackError: "Using fallback questions (backend unreachable).",
    scoreLocalError:
      "The quiz was scored locally because backend submission failed.",
    generating: "Generating your AI-powered practice set...",
    wait: "This may take a few seconds",
    failedLoad: "Failed to load questions",
    backToHub: "Back to Hub",
    noQuestions: "No questions available. Please go back and try again.",
    back: "Back",
    general: "General",
    question: "Question",
    of: "of",
    answerPlaceholder: "Type your answer here...",
    previous: "Previous",
  },
  om: {
    fallbackError: "Gaaffileen bakka buusaa fayyadamu (backend hin argamne).",
    scoreLocalError:
      "Qormaanni keessaa madaalame; ergaan backend hin milkoofne.",
    generating: "Qormaata shaakalaa AI kee fe'amaa jira...",
    wait: "Kun sekondii muraasa fudhachuu danda’a",
    failedLoad: "Gaaffilee fe'uun hin milkoofne",
    backToHub: "Gara Hub deebi’i",
    noQuestions: "Gaaffiin hin jiru. Deebi’iitii irra deebi’i yaali.",
    back: "Duubatti",
    general: "Waliigalaa",
    question: "Gaaffii",
    of: "kan",
    answerPlaceholder: "Deebii kee asitti barreessi...",
    previous: "Kan Dura",
  },
};

const normalizeQuestionTypes = (questionType) => {
  const types = String(questionType || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const normalized = item.toLowerCase();
      if (normalized.includes("true")) return "true_false";
      if (normalized.includes("short")) return "short";
      return "mcq";
    });

  return types.length > 0 ? types : ["mcq"];
};

const humanizeQuestionType = (questionType) => {
  const normalized = String(questionType || "").toUpperCase();
  if (normalized === "TRUE_FALSE") return "True/False";
  if (normalized === "SHORT_ANSWER") return "Short Answer";
  return "MCQ";
};

const toPracticeQuestion = (question, index) => ({
  id: question._id || question.id || index + 1,
  backendId: question._id || question.id || null,
  type: humanizeQuestionType(question.question_type || question.type),
  text: question.question_text || question.question || "",
  options: Array.isArray(question.options) ? question.options : [],
  correctAnswer: question.correct_answer || question.answer || "",
  userAnswer: null,
  isCorrect: false,
});

const generateMockQuestions = ({
  subject,
  questionType,
  topic,
  numQuestions,
}) => {
  const questions = [];
  const availableTypes = String(questionType || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const types = availableTypes.length > 0 ? availableTypes : ["MCQ"];
  const subjectLower = String(subject || "").toLowerCase();
  const topicText = topic && topic !== "General" ? topic : subject;

  for (let index = 1; index <= numQuestions; index += 1) {
    const qType = types[(index - 1) % types.length];
    let questionText = "";
    let options = [];
    let correctAnswer = "";

    if (qType === "MCQ") {
      if (subjectLower === "biology") {
        questionText = `${topicText} MCQ ${index}: What is the primary function of mitochondria?`;
        options = [
          "Energy production",
          "Protein synthesis",
          "Waste disposal",
          "Cell division",
        ];
        correctAnswer = "Energy production";
      } else if (subjectLower === "physics") {
        questionText = `${topicText} MCQ ${index}: Newton's second law states that force equals mass times ___.`;
        options = ["Velocity", "Acceleration", "Momentum", "Inertia"];
        correctAnswer = "Acceleration";
      } else if (subjectLower === "chemistry") {
        questionText = `${topicText} MCQ ${index}: What is the pH of a neutral solution?`;
        options = ["0", "7", "14", "1"];
        correctAnswer = "7";
      } else {
        questionText = `${topicText} MCQ ${index}: Which of the following is correct?`;
        options = ["Option A", "Option B", "Option C", "Option D"];
        correctAnswer = "Option A";
      }
    } else if (qType === "True/False") {
      questionText = `${topicText} Statement ${index}: The concept is fundamental to ${subject}.`;
      options = ["True", "False"];
      correctAnswer = "True";
    } else {
      questionText = `${topicText} Short Answer ${index}: Explain the main idea in your own words.`;
      correctAnswer = "Full explanation evaluated by AI.";
    }

    questions.push({
      id: index,
      type: qType,
      text: questionText,
      options,
      correctAnswer,
      userAnswer: null,
      isCorrect: false,
    });
  }

  return questions;
};

const Practice = () => {
  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language || "om";
  const text = PRACTICE_TEXT[language] || PRACTICE_TEXT.en;
  const location = useLocation();
  const navigate = useNavigate();
  const { subject, questionType, topic, numQuestions } = location.state || {};

  useEffect(() => {
    if (!subject || !questionType || !numQuestions) {
      navigate("/practicehub");
    }
  }, [subject, questionType, numQuestions, navigate]);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!subject || !numQuestions) return;

    let cancelled = false;

    const loadQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await generatePracticeQuiz({
          subject,
          topic: topic || "General",
          num_questions: numQuestions,
          types: normalizeQuestionTypes(questionType),
        });

        const generatedQuiz = response?.data?.quiz || null;
        const generatedQuestions = Array.isArray(response?.data?.questions)
          ? response.data.questions
          : [];

        if (!generatedQuestions.length) {
          throw new Error("The backend did not return any questions.");
        }

        if (cancelled) return;

        setQuizId(generatedQuiz?._id || null);
        setQuestions(generatedQuestions.map(toPracticeQuestion));
      } catch (_error) {
        if (cancelled) return;

        setError(text.fallbackError);
        setQuizId(null);
        setQuestions(
          generateMockQuestions({ subject, questionType, topic, numQuestions }),
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadQuestions();

    return () => {
      cancelled = true;
    };
  }, [subject, topic, numQuestions, questionType, text.fallbackError]);

  const handleAnswer = (answer) => {
    if (submitted) return;

    setAnswers((prev) => ({ ...prev, [currentIndex]: answer }));
    setQuestions((prev) =>
      prev.map((question, index) =>
        index === currentIndex ? { ...question, userAnswer: answer } : question,
      ),
    );
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

  const handleSubmit = async () => {
    const updatedQuestions = questions.map((question) => {
      let isCorrect = false;

      if (question.type === "MCQ" || question.type === "True/False") {
        isCorrect = question.userAnswer === question.correctAnswer;
      } else {
        isCorrect =
          !!question.userAnswer && question.userAnswer.trim().length > 0;
      }

      return { ...question, isCorrect };
    });

    const correctCount = updatedQuestions.filter(
      (question) => question.isCorrect,
    ).length;
    setQuestions(updatedQuestions);
    setScore(correctCount);
    setSubmitted(true);

    if (!quizId) return;

    const backendAnswers = updatedQuestions
      .filter((question) => question.backendId)
      .map((question) => ({
        question_id: question.backendId,
        provided_answer: question.userAnswer || "",
      }));

    if (backendAnswers.length === 0) return;

    setSubmitting(true);
    try {
      const response = await submitPracticeQuiz({
        quiz_id: quizId,
        answers: backendAnswers,
      });

      if (typeof response?.data?.correct_answers === "number") {
        setScore(response.data.correct_answers);
      }
    } catch (err) {
      setError(err.message || text.scoreLocalError);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setQuestions((prev) =>
      prev.map((question) => ({
        ...question,
        userAnswer: null,
        isCorrect: false,
      })),
    );
  };

  const handleGoHome = () => {
    navigate("/practicehub");
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-[#0056D2] text-lg mb-2">{text.generating}</div>
        <div className="text-xs text-gray-400">{text.wait}</div>
      </div>
    );
  }

  if (error && !questions.length) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white p-5">
        <div className="border border-red-300 bg-red-50 p-5 text-center max-w-md">
          <AlertCircle size={32} className="text-red-500 mx-auto mb-3" />
          <p className="text-red-700 font-medium">{text.failedLoad}</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          <button
            onClick={handleGoHome}
            className="mt-4 px-4 py-2 bg-[#0056D2] text-white hover:bg-[#0045b0]"
          >
            {text.backToHub}
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="text-red-600 text-lg">{text.noQuestions}</div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="border-b border-gray-200 bg-white shrink-0">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={handleGoHome}
            className="flex items-center gap-1 text-gray-600 hover:text-[#0056D2]"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">{text.back}</span>
          </button>
          <div className="text-center">
            <h1 className="text-base font-bold text-gray-900">
              {subject} Practice
            </h1>
            <p className="text-xs text-gray-500">{topic || text.general}</p>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <main className="flex-1 overflow-y-auto">
        {!submitted ? (
          <div className="p-5">
            <div className="border border-gray-200 bg-white">
              <div className="bg-[#0056D2] px-5 py-2 flex justify-between items-center">
                <span className="text-white text-sm font-medium">
                  {text.question} {currentIndex + 1} {text.of}{" "}
                  {questions.length}
                </span>
                <span className="text-white text-xs bg-white/20 px-2 py-0.5">
                  {currentQuestion.type}
                </span>
              </div>
              <div className="p-5">
                <p className="text-gray-800 text-base mb-6">
                  {currentQuestion.text}
                </p>

                {currentQuestion.options.length > 0 ? (
                  <div className="space-y-2">
                    {currentQuestion.options.map((option, optionIndex) => (
                      <button
                        key={`${currentQuestion.id}-${optionIndex}`}
                        onClick={() => handleAnswer(option)}
                        className={`w-full text-left p-3 border ${
                          answers[currentIndex] === option
                            ? "border-[#0056D2] bg-[#0056D2]/10"
                            : "border-gray-200 hover:bg-gray-50"
                        } transition-colors`}
                      >
                        <span className="text-sm">{option}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <textarea
                    rows={4}
                    placeholder={text.answerPlaceholder}
                    value={answers[currentIndex] || ""}
                    onChange={(event) => handleAnswer(event.target.value)}
                    className="w-full p-3 border border-gray-200 focus:border-[#0056D2] focus:outline-none text-sm"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`px-4 py-2 border text-sm font-medium ${
                  currentIndex === 0
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {text.previous}
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
                  disabled={!answers[currentIndex] || submitting}
                  className={`px-4 py-2 text-sm font-medium ${
                    answers[currentIndex] && !submitting
                      ? "bg-[#0056D2] text-white hover:bg-[#0045b0]"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {submitting ? "Submitting..." : "Submit All"}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-5">
            <div className="border border-gray-200 bg-white text-center p-8">
              <div className="text-5xl font-bold text-[#0056D2] mb-3">
                {score} / {questions.length}
              </div>
              <p className="text-gray-600 mb-6">
                {score === questions.length
                  ? "Perfect! Excellent work."
                  : score >= questions.length / 2
                    ? "Good job! Keep practicing."
                    : "Review the material and try again."}
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
              <h3 className="text-sm font-semibold text-gray-800">
                Review your answers
              </h3>
              {questions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 p-4">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">
                        Q{index + 1} · {question.type}
                      </p>
                      <p className="text-sm text-gray-800">{question.text}</p>
                      <p className="text-xs mt-2">
                        <span className="font-medium">Your answer:</span>{" "}
                        <span
                          className={
                            question.isCorrect
                              ? "text-green-700"
                              : "text-red-600"
                          }
                        >
                          {question.userAnswer || "(not answered)"}
                        </span>
                      </p>
                      {!question.isCorrect &&
                        question.type !== "Short Answer" && (
                          <p className="text-xs text-gray-600 mt-1">
                            <span className="font-medium">Correct:</span>{" "}
                            {question.correctAnswer}
                          </p>
                        )}
                    </div>
                    {question.isCorrect ? (
                      <CheckCircle
                        size={18}
                        className="text-green-600 shrink-0"
                      />
                    ) : (
                      <XCircle size={18} className="text-red-500 shrink-0" />
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
