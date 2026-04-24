import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  SendHorizontal, 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Headphones, 
  Highlighter, 
  X, 
  Quote 
} from "lucide-react";

const Textbook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Existing States
  const [viewMode, setViewMode] = useState("pdf");
  const [pdfLoading, setPdfLoading] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello! I'm your Study Assistant. Highlight any text to add it as context for your question!" }
  ]);
  const [inputValue, setInputValue] = useState("");

  // --- NEW STATES FOR CONTEXT ---
  const [selectedText, setSelectedText] = useState("");
  const [contextBox, setContextBox] = useState(null);

  const onlinePdfUrl =  
    "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf";

  // --- CONTEXT LOGIC ---
  const handleTextSelection = () => {
    const text = window.getSelection().toString();
    if (text.length > 5) {
      setSelectedText(text);
    } else {
      setSelectedText("");
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() && !contextBox) return;
    
    // Message now includes the contextBox if it exists
    const newMsg = { 
        role: 'user', 
        content: inputValue, 
        context: contextBox 
    };
    
    setMessages([...messages, newMsg]);
    setInputValue("");
    setContextBox(null); // Clear context after sending
  };

  return (
    <div className="flex h-screen w-full bg-slate-100 p-3 gap-3 overflow-hidden">
      
      {/* LEFT SIDE: Textbook Reader */}
      <div 
        className="flex-[1.8] flex flex-col bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden relative"
        onMouseUp={handleTextSelection} // Detects highlight
      >
        
        {/* Reader Header */}
        <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
              <ArrowLeft size={20} />
            </button>
            <div>
            
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setViewMode("pdf")} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${viewMode === 'pdf' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>
              <BookOpen size={14} className="inline mr-2"/> PDF View
            </button>
            <button onClick={() => setViewMode("reader")} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${viewMode === 'reader' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>
              <FileText size={14} className="inline mr-2"/> Text Mode
            </button>
          </div>
        </div>

        {/* Content Display */}
        <div className="flex-1 overflow-hidden relative bg-slate-50">
          {viewMode === "pdf" ? (
            <iframe src={onlinePdfUrl} className="w-full h-full border-none" onLoad={() => setPdfLoading(false)} title="Viewer" />
          ) : (
            <div className="h-full overflow-y-auto p-12 bg-white">
            
            </div>
          )}

          {/* FLOATING ACTION BUTTON */}
          {selectedText && (
            <button 
              onClick={() => { setContextBox(selectedText); setSelectedText(""); }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 z-50 hover:bg-indigo-700"
            >
              <Highlighter size={18} />
              <span className="font-bold">Add to Context</span>
            </button>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: AI Chat */}
      <div className="w-[420px] flex flex-col bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <h3 className="font-bold text-slate-900">Study AI</h3>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {/* Show the context quote if it was part of the user's question */}
              {msg.context && (
                <div className="mb-2 max-w-[85%] bg-slate-50 border-l-4 border-indigo-400 p-2 rounded-r-xl text-[11px] text-slate-500 italic">
                  "{msg.context.substring(0, 100)}..."
                </div>
              )}
              <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-700 rounded-tl-none'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area + MINIBOX */}
        <div className="p-6 pt-0">
          {/* CONTEXT MINIBOX (Pins the selection here) */}
          {contextBox && (
            <div className="mb-3 flex items-center gap-3 bg-indigo-50 border border-indigo-100 p-3 rounded-2xl animate-in zoom-in duration-200">
              <Quote size={14} className="text-indigo-400 shrink-0" />
              <p className="flex-1 text-[11px] text-indigo-700 font-semibold truncate italic">
                {contextBox}
              </p>
              <button onClick={() => setContextBox(null)} className="p-1 hover:bg-indigo-200/50 rounded-full text-indigo-400">
                <X size={14} />
              </button>
            </div>
          )}

          <div className="relative">
            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-[1.8rem] outline-none focus:border-indigo-600 transition-all resize-none text-sm"
              rows="1"
            />
            <button onClick={handleSend} className="absolute right-2.5 bottom-2.5 p-2 bg-indigo-600 text-white rounded-xl">
              <SendHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Textbook;