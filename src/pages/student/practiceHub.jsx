// practicehub.jsx
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FlaskConical,
  Atom,
  Calculator,
  GraduationCap,
  Microscope,
  ChevronDown,
  Play,
  Clock,
  FileText,
  User,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  Library,
} from "lucide-react";
import {
  fetchMyPracticeQuizzes,
  fetchPracticeLibraryQuizzes,
} from "../../services/api";
import { LanguageContext } from "../../context/LanguageContext";

const HUB_TEXT = {
  en: {
    title: "Practice Hub",
    subtitle: "AI-powered study companion",
    generateNewSet: "Generate New Set",
    generateSubtitle: "Create a personalized practice quiz",
    subject: "SUBJECT",
    questionType: "QUESTION TYPE",
    topic: "TOPIC OR AREA",
    topicPlaceholder: "Optional topic, e.g., Mitosis",
    numberOfQuestions: "NUMBER OF QUESTIONS",
    startPractice: "Start Practice",
    filterTitle: "FILTER QUIZZES BY SUBJECT",
    allSubjects: "All Subjects",
    sortNewest: "Sort: Newest",
    sortOldest: "Sort: Oldest",
    sortAZ: "Sort: A-Z",
    clear: "Clear",
  },
  om: {
    title: "Giddugala Shaakalaa",
    subtitle: "Gargaaraa barnootaa AI",
    generateNewSet: "Gaaffilee Haaraa Uumi",
    generateSubtitle: "Qormaata shaakalaa dhuunfaa kee uumi",
    subject: "MATA-DUREE",
    questionType: "AKAATII GAAFFII",
    topic: "MATA-DUREE YKN KUTAAN",
    topicPlaceholder: "Dirqama miti, fakkeenyaaf: Mitoosis",
    numberOfQuestions: "LAKKOOFSA GAAFFIIWWAN",
    startPractice: "Shaakala Jalqabi",
    filterTitle: "QORMAATA MATA-DUREE IRRATTI CALALI",
    allSubjects: "Mata-duree Hunda",
    sortNewest: "Fooyyaaa: Haaraa",
    sortOldest: "Fooyyaaa: Durii",
    sortAZ: "Fooyyaaa: A-Z",
    clear: "Haqi",
  },
};

const formatDisplayDate = (value) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Unknown date";
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const normalizeQuizSubject = (value) => {
  const normalized = String(value || "").trim();
  if (!normalized) return "General";
  const lower = normalized.toLowerCase();
  if (lower === "mathematics") return "Math";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

const buildQuizViewModel = (quiz, index, type) => {
  const subject = normalizeQuizSubject(
    quiz?.subject_name || quiz?.subject || "General",
  );
  return {
    id: quiz?._id || `${type}-${index}`,
    subject,
    title:
      quiz?.title ||
      `${subject.toUpperCase()} ${type === "library" ? "Teacher Quiz" : "AI Practice"}`,
    topic: quiz?.topic || "General",
    version: index + 1,
    date: formatDisplayDate(quiz?.created_at),
    type: type === "library" ? "TEACHER" : "AI",
    numQuestions: Number(quiz?.question_count || 10),
  };
};

const applyQuizSort = (items, mode) => {
  const list = [...items];
  if (mode === "oldest") {
    return list.reverse();
  }
  if (mode === "name") {
    return list.sort((a, b) => String(a.title).localeCompare(String(b.title)));
  }
  return list;
};

const PracticeHub = () => {
  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language || "om";
  const text = HUB_TEXT[language] || HUB_TEXT.en;
  const navigate = useNavigate();

  const [subject, setSubject] = useState("Biology");
  const [questionType, setQuestionType] = useState(
    "MCQ, True/False, Short Answer",
  );
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [filterSubject, setFilterSubject] = useState("All");
  const [filterSort, setFilterSort] = useState("All");
  const [savedSets, setSavedSets] = useState([]);
  const [teacherSets, setTeacherSets] = useState([]);
  const [loadingSets, setLoadingSets] = useState(true);
  const [setsError, setSetsError] = useState("");

  const subjects = ["Biology", "Chemistry", "Physics", "Math"];
  const questionTypes = [
    "MCQ, True/False, Short Answer",
    "MCQ Only",
    "True/False Only",
    "Short Answer Only",
    "MCQ & True/False",
    "MCQ & Short Answer",
  ];

  const subjectIcons = {
    Biology: <Microscope size={18} />,
    Chemistry: <FlaskConical size={18} />,
    Physics: <Atom size={18} />,
    Math: <Calculator size={18} />,
  };

  useEffect(() => {
    let active = true;

    const loadSets = async () => {
      setLoadingSets(true);
      setSetsError("");

      const [libraryResult, myPracticeResult] = await Promise.allSettled([
        fetchPracticeLibraryQuizzes(),
        fetchMyPracticeQuizzes(),
      ]);

      if (!active) return;

      if (libraryResult.status === "fulfilled") {
        const libraryData = Array.isArray(libraryResult.value?.data)
          ? libraryResult.value.data
          : [];
        setTeacherSets(
          libraryData.map((quiz, index) =>
            buildQuizViewModel(quiz, index, "library"),
          ),
        );
      }

      if (myPracticeResult.status === "fulfilled") {
        const myData = Array.isArray(myPracticeResult.value?.data)
          ? myPracticeResult.value.data
          : [];
        setSavedSets(
          myData.map((quiz, index) => buildQuizViewModel(quiz, index, "saved")),
        );
      }

      if (
        libraryResult.status === "rejected" &&
        myPracticeResult.status === "rejected"
      ) {
        setSetsError("Unable to load quiz sets from backend right now.");
      }

      setLoadingSets(false);
    };

    loadSets();

    return () => {
      active = false;
    };
  }, []);

  const filteredTeacherSets = useMemo(() => {
    const bySubject = teacherSets.filter((item) =>
      filterSubject === "All" ? true : item.subject === filterSubject,
    );
    return applyQuizSort(bySubject, filterSort);
  }, [teacherSets, filterSubject, filterSort]);

  const filteredSavedSets = useMemo(() => {
    const bySubject = savedSets.filter((item) =>
      filterSubject === "All" ? true : item.subject === filterSubject,
    );
    return applyQuizSort(bySubject, filterSort);
  }, [savedSets, filterSubject, filterSort]);

  const savedSubjects = useMemo(() => {
    return [...new Set(filteredSavedSets.map((item) => item.subject))];
  }, [filteredSavedSets]);

  const handleStartPractice = () => {
    navigate("/practice", {
      state: {
        subject,
        questionType,
        topic: topic || "General",
        numQuestions,
        timestamp: new Date().toISOString(),
      },
    });
  };

  const handleSavedSetClick = (set) => {
    navigate("/practice", {
      state: {
        subject: set.subject,
        questionType: "MCQ, True/False, Short Answer",
        topic: set.topic || `${set.subject} Practice`,
        numQuestions: set.numQuestions || 10,
        isSaved: true,
        setId: set.id,
      },
    });
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header - full width, no horizontal padding */}
      <div className="border-b border-gray-200 bg-white shrink-0">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0056D2] flex items-center justify-center">
                <GraduationCap size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {text.title}
                </h1>
                <p className="text-xs text-gray-500">{text.subtitle}</p>
              </div>
            </div>
            <button className="p-1 hover:bg-gray-100">
              <User size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable content - full width, no gaps, no spacing */}
      <main className="flex-1 overflow-y-auto">
        {/* Generate New Set Section - full width, no margin/padding */}
        <div className="border-b border-gray-200 -pl-2 bg-white">
          <div className="bg-[#0056D2] pr-10 py-3 px-4">
            <div className="flex items-center gap-2  text-white">
              <Sparkles size={18} className="text-yellow-300 " />
              <h2 className="text-base font-semibold ">
                {text.generateNewSet}
              </h2>
            </div>
            <p className="text-blue-100 text-xs mt-0.5">
              {text.generateSubtitle}
            </p>
          </div>

          <div className="p-5 space-y-4">
            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {text.subject}
              </label>
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-300 px-3 py-2 text-gray-800 text-sm focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
                >
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1">
                  <span className="text-gray-500">{subjectIcons[subject]}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Question Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {text.questionType}
              </label>
              <div className="relative">
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-gray-300 px-3 py-2 text-gray-800 text-sm focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
                >
                  {questionTypes.map((qt) => (
                    <option key={qt} value={qt}>
                      {qt}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {text.topic}
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={text.topicPlaceholder}
                className="w-full bg-gray-50 border border-gray-300 px-3 py-2 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
              />
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {text.numberOfQuestions}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  className="flex-1 h-1 bg-gray-200 appearance-none cursor-pointer accent-[#0056D2]"
                />
                <div className="w-12 h-8 bg-[#0056D2]/10 border border-[#0056D2] flex items-center justify-center">
                  <span className="text-sm font-bold text-[#0056D2]">
                    {numQuestions}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-0.5 px-0.5">
                <span>1</span>
                <span>50</span>
              </div>
            </div>

            {/* Start Practice Button */}
            <button
              onClick={handleStartPractice}
              className="w-full bg-[#0056D2] text-white font-semibold py-3 hover:bg-[#0045b0] transition-colors flex items-center justify-center gap-2"
            >
              <Play size={18} />
              <span>{text.startPractice}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Filter Section - no gap, border-bottom only */}
        <div className="border-b border-gray-200 bg-white p-5">
          <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Layers size={14} className="text-[#0056D2]" />
            {text.filterTitle}
          </h3>
          <div className="flex gap-2 flex-wrap">
            <div className="relative flex-1 min-w-30">
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-300 px-3 py-1.5 text-gray-700 text-xs focus:outline-none focus:border-[#0056D2]"
              >
                <option value="All">{text.allSubjects}</option>
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            <div className="relative flex-1 min-w-30">
              <select
                value={filterSort}
                onChange={(e) => setFilterSort(e.target.value)}
                className="w-full appearance-none bg-gray-50 border border-gray-300 px-3 py-1.5 text-gray-700 text-xs focus:outline-none focus:border-[#0056D2]"
              >
                <option value="All">{text.sortNewest}</option>
                <option value="oldest">{text.sortOldest}</option>
                <option value="name">{text.sortAZ}</option>
              </select>
              <ChevronDown
                size={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Subject chips */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setFilterSubject(sub)}
                className={`px-3 py-1 text-xs font-medium border ${
                  filterSubject === sub
                    ? "bg-[#0056D2] text-white border-[#0056D2]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  {subjectIcons[sub]}
                  {sub}
                </span>
              </button>
            ))}
            {filterSubject !== "All" && (
              <button
                onClick={() => setFilterSubject("All")}
                className="px-3 py-1 text-xs text-red-600 border border-red-300 hover:bg-red-50"
              >
                {text.clear}
              </button>
            )}
          </div>
        </div>

        {/* Teacher Question Bank - no gap */}
        <div className="border-b border-gray-200 bg-white p-5">
          <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Library size={14} className="text-[#0056D2]" />
            TEACHER QUESTION BANK
          </h3>
          {loadingSets ? (
            <div className="bg-gray-50 border border-gray-200 p-5 text-center">
              <p className="text-gray-600 text-sm">
                Loading teacher quizzes...
              </p>
            </div>
          ) : filteredTeacherSets.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 p-5 text-center">
              <div className="w-12 h-12 bg-gray-200 flex items-center justify-center mx-auto mb-2">
                <FileText size={22} className="text-gray-500" />
              </div>
              <p className="text-gray-800 text-sm font-medium">
                No teacher quizzes available
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Check back later for teacher-shared quizzes
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredTeacherSets.map((set) => (
                <button
                  key={set.id}
                  onClick={() => handleSavedSetClick(set)}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center text-base">
                      {set.subject === "Biology"
                        ? "🧬"
                        : set.subject === "Chemistry"
                          ? "🧪"
                          : set.subject === "Physics"
                            ? "⚛️"
                            : "🧮"}
                    </div>
                    <div>
                      <p className="font-medium text-xs text-gray-800">
                        {set.title}
                      </p>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1">
                        <span>{set.subject}</span>
                        <span>·</span>
                        <Calendar size={10} />
                        <span>{set.date}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-1.5 py-0.5 bg-white border border-gray-200 text-gray-600">
                      {set.type}
                    </span>
                    <ArrowRight size={14} className="text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Saved Personalized Sets - no gap */}
        <div className="bg-white p-5">
          <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Clock size={14} className="text-[#0056D2]" />
            SAVED PERSONALIZED SETS
          </h3>

          {setsError && (
            <div className="mb-3 border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {setsError}
            </div>
          )}

          {savedSubjects.map((subj) => {
            const subjectSets = filteredSavedSets.filter(
              (s) => s.subject === subj,
            );
            if (subjectSets.length === 0) return null;

            return (
              <div key={subj} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#0056D2]"></div>
                  <h4 className="font-semibold text-xs text-gray-800">
                    {subj}
                  </h4>
                  <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600">
                    {subjectSets.length} sets
                  </span>
                </div>
                <div className="space-y-1">
                  {subjectSets.map((set) => (
                    <button
                      key={set.id}
                      onClick={() => handleSavedSetClick(set)}
                      className="w-full flex items-center justify-between p-3 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center text-base">
                          {set.subject === "Biology"
                            ? "🧬"
                            : set.subject === "Chemistry"
                              ? "🧪"
                              : set.subject === "Physics"
                                ? "⚛️"
                                : "🧮"}
                        </div>
                        <div>
                          <p className="font-medium text-xs text-gray-800">
                            {set.title}
                          </p>
                          <p className="text-[11px] text-gray-500 flex items-center gap-1">
                            <span>{set.numQuestions}Q</span>
                            <span>·</span>
                            <Calendar size={10} />
                            <span>{set.date}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-1.5 py-0.5 bg-white border border-gray-200 text-gray-600">
                          {set.type}
                        </span>
                        <ArrowRight size={14} className="text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {!loadingSets && savedSubjects.length === 0 && (
            <div className="bg-gray-50 border border-gray-200 p-5 text-center">
              <div className="w-12 h-12 bg-gray-200 flex items-center justify-center mx-auto mb-2">
                <FileText size={22} className="text-gray-500" />
              </div>
              <p className="text-gray-800 text-sm font-medium">
                No saved practice sets yet
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Generate a new set to build your saved history
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PracticeHub;
