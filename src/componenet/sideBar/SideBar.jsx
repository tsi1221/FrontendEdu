import { useState, useMemo } from 'react';
import {
  LayoutDashboard, Settings, Menu, MessageSquare,
  FlaskConical, BrainCircuit, Book, FileQuestion
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../src/assets/logo.png';

const SidebarLayout = ({ children, userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Determine the effective role (prop takes precedence, then localStorage, default to 'student')
  const effectiveRole = useMemo(() => {
    if (userRole && ['student', 'teacher', 'admin'].includes(userRole)) {
      return userRole;
    }
    const storedRole = localStorage.getItem('userRole');
    if (storedRole && ['student', 'teacher', 'admin'].includes(storedRole)) {
      return storedRole;
    }
    return 'student';
  }, [userRole]);

  // Define all possible navigation items with their allowed roles
  const allNavItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashbored', roles: ['student', 'teacher', 'admin'] },
    { icon: <MessageSquare size={20} />, label: 'Chat', path: '/chat', roles: ['student', 'admin'] },
    { icon: <FlaskConical size={20} />, label: 'Virtual Labs', path: '/lab', roles: ['student', 'admin'] },
    { icon: <BrainCircuit size={20} />, label: 'Practice Hub', path: '/practicehub', roles: ['student', 'admin'] },
    { icon: <Book size={20} />, label: 'Textbook', path: '/text-book', roles: ['student', 'admin'] },
    { icon: <FileQuestion size={20} />, label: 'Quiz Generate', path: '/quiz-generate', roles: ['teacher', 'admin'] },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings', roles: ['student', 'teacher', 'admin'] },
  ];

  // Filter items based on the effective role
  const navItems = allNavItems.filter(item => item.roles.includes(effectiveRole));

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  return (
    <div className="flex h-screen w-full p-4 bg-white overflow-hidden">
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo area */}
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

          {/* Navigation - increased vertical spacing */}
          <nav className="flex-1 px-2 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 transition-colors group"
              >
                <span className="text-gray-500 group-hover:text-[#0056D2] transition-colors">
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Profile section */}
          <div className="border-t border-gray-200 p-3">
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center gap-3 px-2 py-2 hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-700 text-sm font-medium">AR</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-900">Alex Rivera</span>
                <span className="text-xs text-gray-500">alex@edutwin.com</span>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col min-w-0  px-4 bg-white">
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
          <button onClick={() => setIsOpen(true)} className="p-1 text-gray-600 hover:bg-gray-100">
            <Menu size={24} />
          </button>
        </header>

        {/* Content wrapper */}
        <div className="flex-1 ">
          {children}
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;