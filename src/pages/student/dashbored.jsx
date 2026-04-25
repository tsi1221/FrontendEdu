import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Flame,
  Microscope,
  Box,
  ArrowRight,
  Layers,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import {
  fetchCurrentUser,
  fetchStudentGamification,
  fetchStudentAnalytics,
  getStoredAuth,
} from "../../services/api";
import { LanguageContext } from "../../context/LanguageContext";

const DASHBOARD_TEXT = {
  en: {
    loading: "Loading...",
    student: "Student",
    quizAttempts: "Quiz Attempts",
    averageScore: "Average Score",
    xpEarned: "XP Earned",
    loadError: "Unable to load live student data.",
    progressTitle: "Your Progress",
    progressSubtitle: "Track your learning activity",
    continueTitle: "Continue Learning",
    continueSubtitle: "Choose how you want to learn today",
    flowTag: "EduTwin Flow",
    learningCardTitle: "Interactive Learning Canvas",
    learningCardBody:
      "Practice with canvas lab and explore concepts visually instead of memorizing theory.",
    openLearningLab: "Open Learning Lab",
    aiTag: "AI Tutor",
    aiCardTitle: "Smart AI Learning Assistant",
    aiCardBody:
      "Ask questions, get instant explanations, generate quizzes, and learn faster with AI.",
    startWithAi: "Start with AI",
    welcome: "Welcome",
    learningStreakSuffix: "day learning streak",
  },
  om: {
    loading: "Fe'amaa jira...",
    student: "Barataa",
    quizAttempts: "Yaalii Qormaataa",
    averageScore: "Qabxii Giddugaleessaa",
    xpEarned: "XP Argame",
    loadError: "Odeeffannoo barataa yeroo dhugaa feuu hin dandeenye.",
    progressTitle: "Tarkaanfii Kee",
    progressSubtitle: "Sochii barnootaa kee hordofi",
    continueTitle: "Barnoota Itti Fufi",
    continueSubtitle: "Hara akkamitti akka barattu filadhu",
    flowTag: "Adeemsa EduTwin",
    learningCardTitle: "Kaanaavaasii Barnoota Wal-qunnamtii",
    learningCardBody:
      "Laabii kaanaavaasii irratti shaakaluu fi yaad-rimeewwan haala mulataa taeen qoradhu.",
    openLearningLab: "Laabii Barnootaa Bani",
    aiTag: "Barsiisaa AI",
    aiCardTitle: "Gargaaraa Barnootaa AI Ogeessa",
    aiCardBody:
      "Gaaffii gaafadhu, ibsa hatattamaa argadhu, qormaata uumi, AI waliin saffisaan baradhu.",
    startWithAi: "AI Waliin Jalqabi",
    welcome: "Baga Nagaan Dhufte",
    learningStreakSuffix: "guyyaa walitti aansuun baratte",
  },
};

/* =========================
   Reusable Components (flat design)
========================= */

const StatCard = ({ label, value, Icon }) => (
  <div className="border border-gray-200 bg-white p-4 flex items-center justify-between">
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-[#0056D2] mt-1">{value}</p>
    </div>
    <div className="p-2 bg-gray-100">
      <Icon className="h-5 w-5 text-gray-700" />
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-base font-bold text-gray-900">{title}</h2>
    {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
  </div>
);

/* =========================
   Cards (no rounding, flat borders)
========================= */

const LearningCard = ({ onOpenLab, text }) => (
  <div className="border border-gray-200 bg-white">
    <div className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-[#0056D2]" />
          <span className="text-[10px] font-semibold text-[#0056D2] bg-[#0056D2]/10 px-2 py-0.5">
            {text.flowTag}
          </span>
        </div>
        <Sparkles className="h-4 w-4 text-yellow-500" />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {text.learningCardTitle}
      </h3>

      <p className="text-gray-600 text-sm mb-5 leading-relaxed">
        {text.learningCardBody}
      </p>

      <button
        onClick={onOpenLab}
        className="flex items-center justify-center gap-2 bg-[#0056D2] hover:bg-[#0045b0] text-white px-4 py-2 text-sm font-semibold transition-colors w-full sm:w-auto"
      >
        {text.openLearningLab}
        <ArrowRight
          className="group-hover:translate-x-1 transition"
          size={14}
        />
      </button>
    </div>
    <div className="h-0.5 bg-gray-200" />
  </div>
);

const AICard = ({ onOpenChat, text }) => (
  <div className="border border-gray-200 bg-white">
    <div className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#0056D2]" />
          <span className="text-[10px] font-semibold text-[#0056D2] bg-[#0056D2]/10 px-2 py-0.5">
            {text.aiTag}
          </span>
        </div>
        <Flame className="h-4 w-4 text-orange-500" />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {text.aiCardTitle}
      </h3>

      <p className="text-gray-600 text-sm mb-5 leading-relaxed">
        {text.aiCardBody}
      </p>

      <button
        onClick={onOpenChat}
        className="flex items-center justify-center gap-2 bg-[#0056D2] hover:bg-[#0045b0] text-white px-4 py-2 text-sm font-semibold transition-colors w-full sm:w-auto"
      >
        {text.startWithAi}
        <ArrowRight
          className="group-hover:translate-x-1 transition"
          size={14}
        />
      </button>
    </div>
    <div className="h-0.5 bg-gray-200" />
  </div>
);

/* =========================
   MAIN DASHBOARD
========================= */

const Dashboard = () => {
  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language || "om";
  const text = DASHBOARD_TEXT[language] || DASHBOARD_TEXT.en;
  const navigate = useNavigate();
  const auth = getStoredAuth();
  const [user, setUser] = useState({
    name: text.student,
    role: text.student,
    streak: 0,
    photoUrl: "",
  });
  const [stats, setStats] = useState([
    { label: text.quizAttempts, value: "0", Icon: TrendingUp },
    { label: text.averageScore, value: "0%", Icon: Microscope },
    { label: text.xpEarned, value: "0", Icon: Box },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        const profileResponse = await fetchCurrentUser();
        const currentUser = profileResponse?.data?.user || null;
        const profile = profileResponse?.data?.profile || null;

        if (!mounted) return;

        const displayName =
          profile?.full_name ||
          currentUser?.email?.split("@")[0] ||
          auth?.user?.email?.split("@")[0] ||
          "Student";
        const studentId = profile?.id || null;

        const [analyticsResult, gamificationResult] = await Promise.allSettled([
          studentId ? fetchStudentAnalytics(studentId) : Promise.resolve(null),
          studentId
            ? fetchStudentGamification(studentId)
            : Promise.resolve(null),
        ]);

        const analytics =
          analyticsResult.status === "fulfilled"
            ? analyticsResult.value?.data
            : null;
        const gamification =
          gamificationResult.status === "fulfilled"
            ? gamificationResult.value?.data?.twin_profile
            : null;

        if (!mounted) return;

        setUser({
          name: displayName,
          role:
            String(currentUser?.role || text.student).toLowerCase() ===
            "student"
              ? text.student
              : String(currentUser?.role || text.student),
          streak: gamification?.streak ?? profile?.streak ?? 0,
          photoUrl: profile?.student_photo_url || "",
        });

        setStats([
          {
            label: text.quizAttempts,
            value: String(analytics?.attempts ?? 0),
            Icon: TrendingUp,
          },
          {
            label: text.averageScore,
            value: `${Number(analytics?.average_score ?? 0).toFixed(0)}%`,
            Icon: Microscope,
          },
          {
            label: text.xpEarned,
            value: String(gamification?.xp ?? profile?.xp ?? 0),
            Icon: Box,
          },
        ]);
      } catch (fetchError) {
        if (!mounted) return;

        setError(fetchError.message || text.loadError);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, [auth?.user?.email, text]);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header (flat, no rounding) */}
      <div className="border-b border-gray-200 bg-white shrink-0">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {user.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt="Student profile"
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-8 h-8 bg-[#0056D2] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-base font-bold text-gray-900">
                  {text.welcome}, {loading ? text.loading : user.name}
                </h1>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 px-3 py-1">
              <Calendar size={12} className="text-orange-500" />
              <span className="text-xs font-medium text-gray-700">
                {user.streak} {text.learningStreakSuffix}
              </span>
              <Flame size={12} className="text-orange-500" fill="#F97316" />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto  mb-10">
        <div className="p-5 space-y-6">
          {error && (
            <div className="border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {error}
            </div>
          )}

          {/* Stats section */}
          <div>
            <SectionHeader
              title={text.progressTitle}
              subtitle={text.progressSubtitle}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <StatCard key={i} {...stat} />
              ))}
            </div>
          </div>

          {/* Learning cards section */}
          <div className="py-14">
            <SectionHeader
              title={text.continueTitle}
              subtitle={text.continueSubtitle}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LearningCard onOpenLab={() => navigate("/lab")} text={text} />
              <AICard onOpenChat={() => navigate("/chat")} text={text} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
