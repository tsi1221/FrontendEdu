import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Sparkles,
  SendHorizontal,
  ArrowLeft,
  Highlighter,
  X,
  Quote,
} from "lucide-react";

const Textbook = () => {
  useParams();
  const navigate = useNavigate();

  const [, setPdfLoading] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "Hello! I'm your Study Assistant. Highlight any text to add it as context for your question!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  // Context states
  const [selectedText, setSelectedText] = useState("");
  const [contextBox, setContextBox] = useState(null);

  const onlinePdfUrl =
    "https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf";

  // Highlight handler
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

    const newMsg = {
      role: "user",
      content: inputValue,
      context: contextBox,
    };
    setMessages([...messages, newMsg]);
    setInputValue("");
    setContextBox(null);
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      {/* LEFT SIDE: PDF Viewer */}
      <div
        className="flex-[1.8] flex flex-col bg-white border-r border-gray-200 overflow-hidden relative"
        onMouseUp={handleTextSelection}
      >
        {/* Top bar with back button only */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center bg-white">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="ml-4 text-lg font-semibold text-gray-800">
            Textbook Reader
          </h2>
        </div>

        {/* PDF iframe */}
        <div className="flex-1 bg-gray-50">
          <iframe
            src={onlinePdfUrl}
            className="w-full h-full border-none"
            onLoad={() => setPdfLoading(false)}
            title="PDF Viewer"
          />
        </div>

        {/* Floating context button */}
        {selectedText && (
          <button
            onClick={() => {
              setContextBox(selectedText);
              setSelectedText("");
            }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg z-50 hover:bg-blue-700 transition-all animate-in fade-in slide-in-from-bottom-4"
          >
            <Highlighter size={18} />
            <span className="font-medium">Add to Context</span>
          </button>
        )}
      </div>

      {/* RIGHT SIDE: AI Chat */}
      <div className="w-104 flex flex-col bg-white border-l border-gray-200">
        {/* Chat header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <h3 className="font-bold text-gray-900">Study AI</h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              {msg.context && (
                <div className="mb-2 max-w-[85%] bg-gray-50 border-l-4 border-indigo-400 p-2 rounded-r-lg text-[11px] text-gray-600 italic">
                  "{msg.context.substring(0, 100)}..."
                </div>
              )}
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="px-5 pb-5 pt-0">
          {/* Context minibox */}
          {contextBox && (
            <div className="mb-3 flex items-center gap-3 bg-indigo-50 border border-indigo-100 p-3 rounded-xl animate-in zoom-in duration-200">
              <Quote size={14} className="text-indigo-400 shrink-0" />
              <p className="flex-1 text-xs text-blue-700 font-medium truncate">
                {contextBox}
              </p>
              <button
                onClick={() => setContextBox(null)}
                className="p-1 hover:bg-indigo-100 rounded-full text-blue-400 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <div className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="w-full pl-5 pr-14 py-3.5 bg-gray-100 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm"
              rows={1}
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <SendHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Textbook;