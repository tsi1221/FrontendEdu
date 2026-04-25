import { useContext, useEffect, useState, useMemo } from "react";
import {
  LayoutDashboard,
  Settings,
  Menu,
  MessageSquare,
  FlaskConical,
  BrainCircuit,
  Book,
  FileQuestion,
  BarChart3,
  School,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../src/assets/logo.png";
import { clearStoredAuth, fetchCurrentUser } from "../../services/api";
import { LanguageContext } from "../../context/LanguageContext";

const UI_TEXT = {
  en: {
    dashboard: "Dashboard",
    chat: "Chat",
    virtualLabs: "Virtual Labs",
    practiceHub: "Practice Hub",
    textbook: "Textbook",
    settings: "Settings",
    quizGenerate: "Quiz Generate",
    generatedQuizzes: "Generated Quizzes",
    subscriptionStats: "Subscription Stats",
    addSchool: "Add School",
    systemHealth: "System Health",
    user: "User",
    signOut: "Sign out",
  },
  om: {
    dashboard: "Daashboordii",
    chat: "Haasawa",
    virtualLabs: "Laabota Viirtuwaalii",
    practiceHub: "Giddugala Shaakalaa",
    textbook: "Kitaaba Barataa",
    settings: "Qindaa'inoota",
    quizGenerate: "Qormaata Uumi",
    generatedQuizzes: "Qormaata Uumaman",
    subscriptionStats: "Istaatistiksii Galmee",
    addSchool: "Mana Barumsaa Dabaluu",
    systemHealth: "Haala Sirnaa",
    user: "Fayyadamaa",
    signOut: "Ba’i",
  },
};

// ✅ Stable navigation arrays outside component
const studentNavItems = [
  { icon: <LayoutDashboard size={20} />, key: "dashboard", path: "/dashbored" },
  { icon: <MessageSquare size={20} />, key: "chat", path: "/chat" },
  { icon: <FlaskConical size={20} />, key: "virtualLabs", path: "/lab" },
  {
    icon: <BrainCircuit size={20} />,
    key: "practiceHub",
    path: "/practicehub",
  },
  { icon: <Book size={20} />, key: "textbook", path: "/text-books" },
  { icon: <Settings size={20} />, key: "settings", path: "/settings" },
];

const teacherNavItems = [
  {
    icon: <LayoutDashboard size={20} />,
    key: "dashboard",
    path: "/teacher-dashbored",
  },
  {
    icon: <FileQuestion size={20} />,
    key: "quizGenerate",
    path: "/quizes-geerate",
  },
  {
    icon: <FileQuestion size={20} />,
    key: "generatedQuizzes",
    path: "/admin-generated-quizzes",
  },
  { icon: <Settings size={20} />, key: "settings", path: "/settings" },
];

const adminNavItems = [
  {
    icon: <FileQuestion size={20} />,
    key: "generatedQuizzes",
    path: "/generated-quizzes",
  },
  {
    icon: <BarChart3 size={20} />,
    key: "subscriptionStats",
    path: "/subscription-stats",
  },
  { icon: <School size={20} />, key: "addSchool", path: "/add-school" },
  {
    icon: <ShieldCheck size={20} />,
    key: "systemHealth",
    path: "/system-health",
  },
  { icon: <Settings size={20} />, key: "settings", path: "/settings" },
];

const SidebarLayout = ({ children }) => {
  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language || "om";
  const text = UI_TEXT[language] || UI_TEXT.en;
  const [isOpen, setIsOpen] = useState(false);
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Read role from localStorage
  const userRole = useMemo(() => {
    return localStorage.getItem("userRole") || "student";
  }, []);

  // Pick the correct nav items
  const navItems = useMemo(() => {
    switch (userRole) {
      case "teacher":
        return teacherNavItems;
      case "admin":
        return adminNavItems;
      default:
        return studentNavItems;
    }
  }, [userRole]);

  useEffect(() => {
    let active = true;

    const loadEmail = async () => {
      try {
        const response = await fetchCurrentUser();
        if (!active) return;
        setProfileEmail(response?.data?.user?.email || "");
        setProfilePhotoUrl(response?.data?.profile?.student_photo_url || "");
      } catch (_error) {
        if (!active) return;
        setProfileEmail("");
        setProfilePhotoUrl("");
      }
    };

    loadEmail();

    return () => {
      active = false;
    };
  }, []);

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    clearStoredAuth();
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out 
          lg:relative lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="EduTwin Logo"
                className="w-6 h-6 object-contain"
              />
              <span className="font-bold text-gray-900 text-lg">EduTwin</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
                    isActive
                      ? "bg-indigo-50 text-[#0056D2] font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`${
                      isActive ? "text-[#0056D2]" : "text-gray-500"
                    } group-hover:text-[#0056D2]`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">
                    {text[item.key] || item.key}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Footer – Profile + Logout with icon */}
          <div className="border-t border-gray-200 p-3 space-y-2">
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {profilePhotoUrl ? (
                <img
                  src={profilePhotoUrl}
                  alt="Student profile"
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    setProfilePhotoUrl("");
                  }}
                />
              ) : (
                <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full">
                  <span className="text-gray-700 text-sm font-medium">
                    {userRole === "admin"
                      ? "AD"
                      : userRole === "teacher"
                        ? "TR"
                        : "ST"}
                  </span>
                </div>
              )}
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-900 capitalize">
                  {userRole} {text.user}
                </span>
                {profileEmail ? (
                  <span className="text-xs text-gray-500">{profileEmail}</span>
                ) : null}
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span>{text.signOut}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="EduTwin Logo"
              className="w-5 h-5 object-contain"
            />
            <span className="font-bold text-[#0056D2] text-lg">EduTwin</span>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 p-4">{children}</div>
      </main>
    </div>
  );
};

export default SidebarLayout;
