import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  SendHorizontal, 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Headphones, 
  Download 
} from "lucide-react";

const Textbook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // States
  const [viewMode, setViewMode] = useState("pdf"); // 'pdf' or 'reader'
  const [pdfLoading, setPdfLoading] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello! I'm your Study Assistant. How can I help you with your textbook today?" }
  ]);
  const [inputValue, setInputValue] = useState("");

  // Find data from your JSON

  // Online PDF Placeholder (If your JSON doesn't have one, this uses a sample)
  const onlinePdfUrl = 
    "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf";

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMsg = { role: 'user', content: inputValue };
    setMessages([...messages, newMsg]);
    
    // Simulate AI thinking (optional)
    setInputValue("");
  };

  return (
    <div className="flex h-screen w-full bg-slate-100 p-3 gap-3 overflow-hidden">
      
      {/* LEFT SIDE: Textbook Reader */}
      <div className="flex-[1.8] flex flex-col bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden relative">
        
        {/* Reader Header */}
        <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-indigo-600 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode("pdf")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'pdf' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'
              }`}
            >
              <BookOpen size={14} /> PDF View
            </button>
            <button 
              onClick={() => setViewMode("reader")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'reader' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'
              }`}
            >
              <FileText size={14} /> Text Mode
            </button>
          </div>
        </div>

        {/* Content Display */}
        <div className="flex-1 overflow-hidden relative bg-slate-50">
          {viewMode === "pdf" ? (
            <div className="w-full h-full relative">
              {pdfLoading && (
                 <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-tighter">Loading Document</p>
                    </div>
                 </div>
              )}
              <iframe
                src={onlinePdfUrl}
                className="w-full h-full border-none"
                onLoad={() => setPdfLoading(false)}
                title="Online Textbook Viewer"
              />
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-12 bg-white">
              
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Standalone AI Chat */}
      <div className="w-105 flex flex-col bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Study AI</h3>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Always Active</p>
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-5 py-3 rounded-3xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-700 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Simple Input Area */}
        <div className="p-6">
          <div className="relative group">
            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask a question about this book..."
              className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-[1.8rem] outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all resize-none text-sm min-h-14 max-h-37.5"
              rows="1"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2.5 bottom-2.5 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md active:scale-95 disabled:opacity-50"
              disabled={!inputValue.trim()}
            >
              <SendHorizontal size={18} />
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
            AI Study Assistant v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Textbook;