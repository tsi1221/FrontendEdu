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

const LearningCard = ({ onOpenLab }) => (
  <div className="border border-gray-200 bg-white">
    <div className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-[#0056D2]" />
          <span className="text-[10px] font-semibold text-[#0056D2] bg-[#0056D2]/10 px-2 py-0.5">
            EduTwin Flow
          </span>
        </div>
        <Sparkles className="h-4 w-4 text-yellow-500" />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Interactive Learning Canvas
      </h3>

      <p className="text-gray-600 text-sm mb-5 leading-relaxed">
        Practice with canvas lab and explore concepts visually instead of memorizing theory.
      </p>

      <button
        onClick={onOpenLab}
        className="flex items-center justify-center gap-2 bg-[#0056D2] hover:bg-[#0045b0] text-white px-4 py-2 text-sm font-semibold transition-colors w-full sm:w-auto"
      >
        Open Learning Lab
        <ArrowRight className="group-hover:translate-x-1 transition" size={14} />
      </button>
    </div>
    <div className="h-0.5 bg-gray-200" />
  </div>
);

const AICard = ({ onOpenChat }) => (
  <div className="border border-gray-200 bg-white">
    <div className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#0056D2]" />
          <span className="text-[10px] font-semibold text-[#0056D2] bg-[#0056D2]/10 px-2 py-0.5">
            AI Tutor
          </span>
        </div>
        <Flame className="h-4 w-4 text-orange-500" />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">
        Smart AI Learning Assistant
      </h3>

      <p className="text-gray-600 text-sm mb-5 leading-relaxed">
        Ask questions, get instant explanations, generate quizzes, and learn faster with AI.
      </p>

      <button
        onClick={onOpenChat}
        className="flex items-center justify-center gap-2 bg-[#0056D2] hover:bg-[#0045b0] text-white px-4 py-2 text-sm font-semibold transition-colors w-full sm:w-auto"
      >
        Start with AI
        <ArrowRight className="group-hover:translate-x-1 transition" size={14} />
      </button>
    </div>
    <div className="h-0.5 bg-gray-200" />
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
    <div className="h-screen flex flex-col bg-white">
      {/* Header (flat, no rounding) */}
      <div className="border-b border-gray-200 bg-white shrink-0">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0056D2] flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900">
                  Welcome, {user.name}
                </h1>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 px-3 py-1">
              <Calendar size={12} className="text-orange-500" />
              <span className="text-xs font-medium text-gray-700">
                {user.streak}-day learning streak
              </span>
              <Flame size={12} className="text-orange-500" fill="#F97316" />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto  mb-10">
        <div className="p-5 space-y-6">
          {/* Stats section */}
          <div>
            <SectionHeader title="Your Progress" subtitle="Track your learning activity" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <StatCard key={i} {...stat} />
              ))}
            </div>
          </div>

          {/* Learning cards section */}
          <div className="py-14">
            <SectionHeader title="Continue Learning" subtitle="Choose how you want to learn today" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LearningCard onOpenLab={() => navigate("/lab")} />
              <AICard onOpenChat={() => navigate("/chat")} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;