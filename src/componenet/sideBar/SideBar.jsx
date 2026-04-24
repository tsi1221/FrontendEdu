import { useState } from 'react';
import { LayoutDashboard, Settings, Menu, MessageSquare, FlaskConical, BrainCircuit, Book } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../src/assets/logo.png'; // adjust the path as needed

const SidebarLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashbored' },
    { icon: <MessageSquare size={20} />, label: 'Chat', path: '/chat' },
    { icon: <FlaskConical size={20} />, label: 'Virtual Labs', path: '/lab' },
    { icon: <BrainCircuit size={20} />, label: 'Practice-hub', path: '/practicehub' },
    { icon: <Book size={20} />, label: 'Textbook', path: '/text-book' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Mobile overlay – flat, no blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar – flat, white, no rounded corners, no shadow */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo area – using logo.png */}
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
          <nav className="flex-1 px-2 py-4 space-y-0.5">
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

          {/* Profile section – flat */}
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
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Mobile header – also uses logo if desired (optional) */}
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

        {/* Content wrapper – no rounding, no border, no shadow */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;