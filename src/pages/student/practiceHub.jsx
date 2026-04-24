// practicehub.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Library
} from 'lucide-react';

const PracticeHub = () => {
    const navigate = useNavigate();

    const [subject, setSubject] = useState('Biology');
    const [questionType, setQuestionType] = useState('MCQ, True/False, Short Answer');
    const [topic, setTopic] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [filterSubject, setFilterSubject] = useState('All');
    const [filterSort, setFilterSort] = useState('All');

    const [savedSets] = useState([
        { id: 1, subject: 'Biology', title: 'BIOLOGY AI Practice', version: 5, date: '9 Apr 2026', type: 'AI', icon: '🧬', color: 'emerald' },
        { id: 2, subject: 'Biology', title: 'BIOLOGY AI Practice', version: 4, date: '9 Apr 2026', type: 'AI', icon: '🧬', color: 'emerald' },
        { id: 3, subject: 'Biology', title: 'BIOLOGY AI Practice', version: 3, date: '9 Apr 2026', type: 'AI', icon: '🧬', color: 'emerald' },
        { id: 4, subject: 'Biology', title: 'BIOLOGY AI Practice', version: 2, date: '9 Apr 2026', type: 'AI', icon: '🧬', color: 'emerald' },
        { id: 5, subject: 'Biology', title: 'BIOLOGY AI Practice', version: 1, date: '9 Apr 2026', type: 'AI', icon: '🧬', color: 'emerald' },
        { id: 6, subject: 'Physics', title: 'PHYSICS AI Practice', version: 2, date: '17 Apr 2026', type: 'AI', icon: '⚛️', color: 'blue' }
    ]);

    const subjects = ['Biology', 'Chemistry', 'Physics', 'Math'];
    const questionTypes = [
        'MCQ, True/False, Short Answer',
        'MCQ Only',
        'True/False Only',
        'Short Answer Only',
        'MCQ & True/False',
        'MCQ & Short Answer'
    ];

    const subjectIcons = {
        'Biology': <Microscope size={18} />,
        'Chemistry': <FlaskConical size={18} />,
        'Physics': <Atom size={18} />,
        'Math': <Calculator size={18} />
    };

    const handleStartPractice = () => {
        navigate('/practice', {
            state: {
                subject,
                questionType,
                topic: topic || 'General',
                numQuestions,
                timestamp: new Date().toISOString()
            }
        });
    };

    const handleSavedSetClick = (set) => {
        navigate('/practice', {
            state: {
                subject: set.subject,
                questionType: 'MCQ, True/False, Short Answer',
                topic: `${set.subject} AI Practice v${set.version}`,
                numQuestions: 10,
                isSaved: true,
                setId: set.id
            }
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
                                <h1 className="text-lg font-bold text-gray-900">Practice Hub</h1>
                                <p className="text-xs text-gray-500">AI-powered study companion</p>
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
                <div className="border-b border-gray-200 bg-white">
                    <div className="bg-[#0056D2] px-5 py-3">
                        <div className="flex items-center gap-2 text-white">
                            <Sparkles size={18} className="text-yellow-300" />
                            <h2 className="text-base font-semibold">Generate New Set</h2>
                        </div>
                        <p className="text-blue-100 text-xs mt-0.5">Create a personalized practice quiz</p>
                    </div>

                    <div className="p-5 space-y-4">
                        {/* Subject */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">SUBJECT</label>
                            <div className="relative">
                                <select
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full appearance-none bg-gray-50 border border-gray-300 px-3 py-2 text-gray-800 text-sm focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
                                >
                                    {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                </select>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1">
                                    <span className="text-gray-500">{subjectIcons[subject]}</span>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Question Type */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">QUESTION TYPE</label>
                            <div className="relative">
                                <select
                                    value={questionType}
                                    onChange={(e) => setQuestionType(e.target.value)}
                                    className="w-full appearance-none bg-gray-50 border border-gray-300 px-3 py-2 text-gray-800 text-sm focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
                                >
                                    {questionTypes.map(qt => <option key={qt} value={qt}>{qt}</option>)}
                                </select>
                                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Topic */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">TOPIC OR AREA</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Optional topic, e.g., Mitosis"
                                className="w-full bg-gray-50 border border-gray-300 px-3 py-2 text-gray-800 text-sm placeholder-gray-400 focus:outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2]"
                            />
                        </div>

                        {/* Number of Questions */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">NUMBER OF QUESTIONS</label>
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
                                    <span className="text-sm font-bold text-[#0056D2]">{numQuestions}</span>
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
                            <span>Start Practice</span>
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Filter Section - no gap, border-bottom only */}
                <div className="border-b border-gray-200 bg-white p-5">
                    <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Layers size={14} className="text-[#0056D2]" />
                        FILTER QUIZZES BY SUBJECT
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                        <div className="relative flex-1 min-w-[120px]">
                            <select
                                value={filterSubject}
                                onChange={(e) => setFilterSubject(e.target.value)}
                                className="w-full appearance-none bg-gray-50 border border-gray-300 px-3 py-1.5 text-gray-700 text-xs focus:outline-none focus:border-[#0056D2]"
                            >
                                <option value="All">All Subjects</option>
                                {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative flex-1 min-w-[120px]">
                            <select
                                value={filterSort}
                                onChange={(e) => setFilterSort(e.target.value)}
                                className="w-full appearance-none bg-gray-50 border border-gray-300 px-3 py-1.5 text-gray-700 text-xs focus:outline-none focus:border-[#0056D2]"
                            >
                                <option value="All">Sort: Newest</option>
                                <option value="oldest">Sort: Oldest</option>
                                <option value="name">Sort: A-Z</option>
                            </select>
                            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Subject chips */}
                    <div className="flex gap-2 mt-3 flex-wrap">
                        {subjects.map(sub => (
                            <button
                                key={sub}
                                onClick={() => setFilterSubject(sub)}
                                className={`px-3 py-1 text-xs font-medium border ${
                                    filterSubject === sub
                                        ? 'bg-[#0056D2] text-white border-[#0056D2]'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <span className="inline-flex items-center gap-1">
                                    {subjectIcons[sub]}
                                    {sub}
                                </span>
                            </button>
                        ))}
                        {filterSubject !== 'All' && (
                            <button
                                onClick={() => setFilterSubject('All')}
                                className="px-3 py-1 text-xs text-red-600 border border-red-300 hover:bg-red-50"
                            >
                                Clear
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
                    <div className="bg-gray-50 border border-gray-200 p-5 text-center">
                        <div className="w-12 h-12 bg-gray-200 flex items-center justify-center mx-auto mb-2">
                            <FileText size={22} className="text-gray-500" />
                        </div>
                        <p className="text-gray-800 text-sm font-medium">No teacher quizzes available</p>
                        <p className="text-gray-500 text-xs mt-1">Check back later for teacher-shared quizzes</p>
                    </div>
                </div>

                {/* Saved Personalized Sets - no gap */}
                <div className="bg-white p-5">
                    <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Clock size={14} className="text-[#0056D2]" />
                        SAVED PERSONALIZED SETS
                    </h3>

                    {['Biology', 'Physics'].map(subj => {
                        const subjectSets = savedSets.filter(s => s.subject === subj);
                        if (subjectSets.length === 0) return null;

                        return (
                            <div key={subj} className="mb-4 last:mb-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-[#0056D2]"></div>
                                    <h4 className="font-semibold text-xs text-gray-800">{subj}</h4>
                                    <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600">
                                        {subjectSets.length} sets
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    {subjectSets.map(set => (
                                        <button
                                            key={set.id}
                                            onClick={() => handleSavedSetClick(set)}
                                            className="w-full flex items-center justify-between p-3 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-white border border-gray-200 flex items-center justify-center text-base">
                                                    {set.icon}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-xs text-gray-800">{set.title}</p>
                                                    <p className="text-[11px] text-gray-500 flex items-center gap-1">
                                                        <span>v{set.version}</span>
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
                </div>
            </main>
        </div>
    );
};

export default PracticeHub;