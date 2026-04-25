import { useState, useMemo } from 'react';
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
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../../src/assets/logo.png';

// ✅ Stable navigation arrays outside component
const studentNavItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashbored' },
  { icon: <MessageSquare size={20} />, label: 'Chat', path: '/chat' },
  { icon: <FlaskConical size={20} />, label: 'Virtual Labs', path: '/lab' },
  { icon: <BrainCircuit size={20} />, label: 'Practice Hub', path: '/practicehub' },
  { icon: <Book size={20} />, label: 'Textbook', path: '/text-books' },
  { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
];

const teacherNavItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/teacher-dashbored' },
  { icon: <FileQuestion size={20} />, label: 'Quiz Generate', path: '/quizes-geerate' },
  { icon: <FileQuestion size={20} />, label: 'Generated Quizzes', path: '/generated-quizzes' },
  { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
];

const adminNavItems = [
  { icon: <FileQuestion size={20} />, label: 'Generated Quizzes', path: '/generated-quizzes' },
  { icon: <BarChart3 size={20} />, label: 'Subscription Stats', path: '/subscription-stats' },
  { icon: <School size={20} />, label: 'Add School', path: '/add-school' },
  { icon: <ShieldCheck size={20} />, label: 'System Health', path: '/system-health' },
  { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
];

const SidebarLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Read role from localStorage
  const userRole = useMemo(() => {
    return localStorage.getItem('userRole') || 'student';
  }, []);

  // Pick the correct nav items
  const navItems = useMemo(() => {
    switch (userRole) {
      case 'teacher': return teacherNavItems;
      case 'admin': return adminNavItems;
      default: return studentNavItems;
    }
  }, [userRole]);

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
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
          lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <img src={logo} alt="EduTwin Logo" className="w-6 h-6 object-contain" />
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
                      ? 'bg-indigo-50 text-[#0056D2] font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span
                    className={`${
                      isActive ? 'text-[#0056D2]' : 'text-gray-500'
                    } group-hover:text-[#0056D2]`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
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
              <div className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-full">
                <span className="text-gray-700 text-sm font-medium">
                  {userRole === 'admin' ? 'AD' : userRole === 'teacher' ? 'TR' : 'ST'}
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-900 capitalize">{userRole} User</span>
                <span className="text-xs text-gray-500">{userRole}@edutwin.com</span>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <img src={logo} alt="EduTwin Logo" className="w-5 h-5 object-contain" />
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