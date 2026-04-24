
import React, { useState } from 'react';
import { 
  Plus, 
  MessageSquare, 
  User, 
  SendHorizontal, 
  Paperclip, 
  MoreVertical,
  PanelLeftClose,
  PanelLeftOpen,
  GraduationCap
} from 'lucide-react';

const Chat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello! I'm your assistant. How can I help you today?" },
    { role: 'user', content: "Can you help me design a modern chat interface?" },
    { role: 'ai', content: "Absolutely. I've focused on using clean lines, subtle hjhshadows, and an 'inset' container style to make the conversation feel focused and modern." },
  ]);

  return (
    <div className="flex h-full w-full bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* Sidebar - Chat History */}
      

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        
        
        {/* The Inset Chat Window */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full w-full bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              {messages.map((msg, idx) => (

                <div key={idx} className={`flex gap-4 max-w-3xl mx-auto ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>

                  <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                    msg.role === 'ai' ? 'bg-brand-primary text-white shadow-lg shadow-indigo-100' : 'bg-slate-200'
                  }`}>
                    {msg.role === 'ai' ? <GraduationCap/>: <User size={16} />}
                  </div>

                  <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : ''}`}>
                    <div className={`px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                      ? 'bg-slate-100 text-slate-800 rounded-tr-none' 
                      : 'bg-white text-slate-700'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area (Sticky Bottom of Inset) */}
            <div className="p-6 pt-0">
              <div className="max-w-3xl mx-auto relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                    <Paperclip size={20} />
                  </button>
                </div>
                <textarea 
                  rows="1"
                  placeholder="Message Nexus..."
                  className="w-full pl-14 pr-14 py-4 bg-slate-50 border border-slate-200 rounded outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all resize-none shadow-inner"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-brand-primary text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95">
                  <SendHorizontal size={20} />
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-400 mt-3 font-medium">
                AI may display inaccurate info, so double-check its responses.
              </p>
            </div>

          </div>
        </div>
      </main>
      
      <aside className={`
        ${sidebarOpen ? 'w-72' : 'w-0'} 
        transition-all duration-300 ease-in-out flex flex-col bg-slate-50 overflow-hidden
      `}>
        <div className="p-4 flex flex-col h-full">
          {/* New Chat Button */}
          <button className="flex items-center gap-3 w-full p-3 bg-white border border-slate-200 rounded font-medium hover:bg-slate-100 transition-all shadow-sm mb-6">
            <Plus size={18} />
            <span>New Chat</span>
          </button>

          {/* History List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Recent</p>
            {['Project Architecture', 'UI/UX Feedback', 'Marketing Strategy'].map((chat) => (
              <button key={chat} className="flex items-center gap-3 w-full p-3 text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors text-sm group text-left">
                <MessageSquare size={16} className="text-slate-400 group-hover:text-indigo-600" />
                <span className="truncate">{chat}</span>
              </button>
            ))}
          </div>

          {/* User Profile Hook */}
        </div>
      </aside>
    </div>
  );
};

export default Chat;