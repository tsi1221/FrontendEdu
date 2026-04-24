import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Flame,
  Microscope,
  Box,
  ArrowRight,
  Sparkles,
  Layers,
  TrendingUp,
} from "lucide-react";

/* =========================
   Reusable Components
========================= */

const StatCard = ({ label, value, Icon }) => (
  <div className="bg-white border border-gray-100 hover:shadow-md transition rounded-xl p-5 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-[#0056D2] mt-1">{value}</p>
    </div>

    <div className="p-3 rounded-lg bg-gray-100">
      <Icon className="h-6 w-6 text-gray-700" />
    </div>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
  </div>
);

/* =========================
   Cards
========================= */

const LearningCard = ({ onOpenLab }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition overflow-hidden">
    <div className="p-6">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="text-gray-700" />
          <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            EduTwin Flow
          </span>
        </div>
        <Sparkles className="text-yellow-500" />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Interactive Learning Canvas
      </h3>

      <p className="text-gray-600 mb-6 leading-relaxed">
        Practice with canvas lab and explore concepts visually instead of memorizing theory.
      </p>

      <button
        onClick={onOpenLab}
        className="flex items-center justify-center gap-2 bg-[#0056D2] hover:bg-[#0045b0] text-white px-6 py-3 rounded-xl font-semibold transition group"
      >
        Open Learning Lab
        <ArrowRight className="group-hover:translate-x-1 transition" size={18} />
      </button>
    </div>

    <div className="h-1 bg-gray-200" />
  </div>
);

const AICard = ({ onOpenChat }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition overflow-hidden">
    <div className="p-6">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-gray-700" />
          <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            AI Tutor
          </span>
        </div>
        <Flame className="text-orange-500" />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        Smart AI Learning Assistant
      </h3>

      <p className="text-gray-600 mb-6 leading-relaxed">
        Ask questions, get instant explanations, generate quizzes, and learn faster with AI.
      </p>

      <button
        onClick={onOpenChat}
        className="flex items-center justify-center gap-2 bg-[#0056D2] hover:bg-[#0045b0] text-white px-6 py-3 rounded-xl font-semibold transition group"
      >
        Start with AI
        <ArrowRight className="group-hover:translate-x-1 transition" size={18} />
      </button>
    </div>

    <div className="h-1 bg-gray-200" />
  </div>
);

/* =========================
   MAIN DASHBOARD
========================= */

const Dashboard = () => {
  const navigate = useNavigate();

  const user = {
    name: "Alex Rivera",
    role: "Student",
    streak: 2,
  };

  const stats = [
    { label: "Learning Hours", value: "24.5", Icon: TrendingUp },
    { label: "Completed Labs", value: "12", Icon: Microscope },
    { label: "AR Sessions", value: "8", Icon: Box },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 font-bold text-lg">
              {user.name.charAt(0)}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {user.name}
              </h1>
              <p className="text-gray-500 text-sm">{user.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0 bg-orange-50 px-4 py-2 rounded-full">
            <Calendar size={16} className="text-orange-500" />
            <span className="text-sm font-medium text-gray-700">
              {user.streak}-day learning streak
            </span>
            <Flame size={16} className="text-orange-500" fill="#F97316" />
          </div>
        </div>

        {/* STATS */}
        <SectionHeader title="Your Progress" subtitle="Track your learning activity" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* MAIN */}
        <SectionHeader title="Continue Learning" subtitle="Choose how you want to learn today" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LearningCard onOpenLab={() => navigate("/lab")} />
          <AICard onOpenChat={() => navigate("/chat")} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;