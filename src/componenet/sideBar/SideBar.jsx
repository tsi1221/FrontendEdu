import { useState } from 'react';
import { LayoutDashboard, Settings, Menu, MessageSquare,FlaskConical, BrainCircuit,Book } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SidebarLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const  navigate = useNavigate();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashbored' },
    { icon: <MessageSquare size={20} />, label: 'Chat', path: '/chat' },
    { icon: <FlaskConical size={20} />, label: 'Virtual Labs', path: '/lab' },
    { icon: <BrainCircuit size={20} />, label: 'Practice-hub', path: '/practice-hub' },
    { icon: <Book size={20} />, label: 'Textbook', path: '/text-book' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  const handleNavigation = (path) => () => {
    setIsOpen(false);
    navigate(path); // Uncomment when using useNavigate from react-router-dom
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-50 transition-transform duration-300 ease-in-out transform
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full px-4 py-6">
          <div className="flex items-center gap-3 px-2 mb-10 text-brand-primary font-bold text-xl">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg shadow-indigo-200 shadow-lg" />
            <span>EduTwin</span>
          </div>


          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2 text-slate-600 rounded-lg hover:bg-slate-200/50 hover:text-slate-900 transition-colors group"
              >
                <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto p-2 bg-slate-200/40 rounded-xl" onClick={handleNavigation("/profile")}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-300" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate">Alex Rivera</span>
                <span className="text-xs text-slate-500 truncate">alex@edutwin.com</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-slate-50">
          <span className="font-bold text-indigo-600">EduTwin</span>
          <button onClick={() => setIsOpen(true)} className="p-2 text-slate-600">
            <Menu size={24} />
          </button>
        </header>

        {/* The "Inset" Wrapper */}
        <div className="flex-1 lg:p-2 lg:pl-0">
          <div className="h-full w-full bg-white rounded-lg lg:rounded border border-slate-200 shadow-sm overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;