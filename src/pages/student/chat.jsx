import { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  MessageSquare, 
  User, 
  SendHorizontal, 
  Paperclip, 
  PanelLeftClose,
  PanelLeftOpen,
  GraduationCap
} from 'lucide-react';
import logo from '../../../src/assets/logo.png';

const Chat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', content: "Hello! I'm your assistant. How can I help you today?" },
    { id: 2, role: 'user', content: "Can you help me design a modern chat interface?" },
    { id: 3, role: 'ai', content: "Absolutely. I've focused on using clean lines, subtle shadows, and a focused container style to make the conversation feel modern and engaging." },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputMessage]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputMessage.trim(),
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');

    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: 'ai',
        content: "Thanks for your message! I'm processing your request. (Simulated response – replace with real AI backend.)",
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const chatHistory = [
    { id: 1, title: 'Project Architecture' },
    { id: 2, title: 'UI/UX Feedback' },
    { id: 3, title: 'Marketing Strategy' },
    { id: 4, title: 'Design Inspiration' },
  ];

  return (
    <div className="flex h-full w-full bg-slate-50  text-slate-900 overflow-hidden">
      {/* Mobile overlay when sidebar is open on small screens */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area (Left) */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Mobile header with toggle */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
          <h1 className="font-semibold text-slate-800">Chat</h1>
          <div className="w-8" /> {/* spacer for alignment */}
        </div>

        {/* Desktop toggle button (now on top‑right) */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden md:flex absolute top-4 right-4 z-10 p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-all"
        >
          {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </button>

        {/* Inset chat window */}
        <div className="flex-1 overflow-hidden p-0 md:p-4 lg:p-6">
          <div className="h-full w-full bg-white md:rounded-xs border-0 md:border border-slate-200 md:shadow-sm flex flex-col overflow-hidden">
            
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 md:gap-4 max-w-3xl mx-auto ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                    msg.role === 'ai' ? 'bg-[#0056D2] text-white shadow-sm' : 'bg-slate-200'
                  }`}>
                    {msg.role === 'ai' ? <GraduationCap size={16} /> : <User size={16} />}
                  </div>
                  <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : ''} min-w-0`}>
                    <div className={`px-4 md:px-5 py-2.5 md:py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-slate-100 text-slate-800 rounded-tr-none' 
                        : 'bg-white text-slate-700 border border-slate-100'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 md:p-6 pt-0">
              <div className="max-w-3xl mx-auto relative group">
                <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-[#0056D2] transition-colors">
                    <Paperclip size={18} className="md:w-5 md:h-5" />
                  </button>
                </div>
                <textarea 
                  ref={textareaRef}
                  rows={1}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message Nexus..."
                  className="w-full pl-12 md:pl-14 pr-12 md:pr-14 py-3 md:py-4 bg-slate-50 border border-slate-200 rounded-xs outline-none focus:ring-2 focus:ring-[#0056D2]/20 focus:border-[#0056D2] transition-all resize-none text-sm md:text-base"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className={`absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                    inputMessage.trim()
                      ? 'bg-[#0056D2] text-white hover:bg-[#0045b0] shadow-sm'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <SendHorizontal size={18} className="md:w-5 md:h-5" />
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-400 mt-3 font-medium hidden md:block">
                AI may display inaccurate info, so double-check its responses.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* History Sidebar (Right) */}
      <aside className={`
        ${sidebarOpen ? 'w-72' : 'w-0'} 
        transition-all duration-300 ease-in-out flex flex-col bg-slate-50 overflow-hidden
        absolute md:relative z-20 h-full right-0 border-l border-slate-200
      `}>
        <div className="p-4 flex flex-col h-full min-w-72">
          {/* Logo + Title */}
          <div className="flex items-center gap-2 mb-6 px-2">
            <span className="font-bold text-slate-800 text-base">History</span>
          </div>

          {/* New Chat Button */}
          <button className="flex items-center gap-3 w-full p-3 bg-white border border-slate-200 rounded-xs font-medium hover:bg-slate-100 transition-all shadow-sm mb-6">
            <Plus size={18} />
            <span>New Chat</span>
          </button>

          {/* History List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Recent</p>
            {chatHistory.map((chat) => (
              <button 
                key={chat.id} 
                className="flex items-center gap-3 w-full p-3 text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors text-sm group text-left"
              >
                <MessageSquare size={16} className="text-slate-400 group-hover:text-[#0056D2]" />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Chat;