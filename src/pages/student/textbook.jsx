import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Sparkles,
  SendHorizontal,
  ArrowLeft,
  Highlighter,
  X,
  Quote,
} from "lucide-react";
import { fetchTextbookById, sendAiChatMessage } from "../../services/api";
import { LanguageContext } from "../../context/LanguageContext";

const READER_TEXT = {
  en: {
    aiGreeting:
      "Hello! I'm your Study Assistant. Highlight any text to add it as context for your question!",
    missingId: "Textbook ID is missing.",
    loadError: "Unable to load textbook from backend.",
    noAiResponse: "No AI response was returned.",
    aiUnavailable: "Unable to get AI response right now.",
    readerTitle: "Textbook Reader",
    loadingTextbook: "Loading textbook...",
    missingPdf: "PDF URL is missing for this textbook.",
    loadingPdf: "Loading PDF viewer...",
    addContext: "Add to Context",
    latestHighlight: "Latest highlight",
    useLatestHighlight: "Use latest highlight",
    studyAi: "Study AI",
    askPlaceholder: "Ask a question...",
  },
  om: {
    aiGreeting:
      "Akkam! Ani gargaaraa barnootaa kee dha. Barruu filachuun gaaffii kee keessatti fayyadami.",
    missingId: "ID kitaabaa hin jiru.",
    loadError: "Kitaaba backend irraa fe'uu hin dandeenye.",
    noAiResponse: "Deebiin AI hin argamne.",
    aiUnavailable: "Deebii AI yeroo ammaa argachuun hin danda’amne.",
    readerTitle: "Dubbisaa Kitaabaa",
    loadingTextbook: "Kitaabni fe'amaa jira...",
    missingPdf: "Kitaaba kanaaf PDF URL hin jiru.",
    loadingPdf: "Daawwannaan PDF fe'amaa jira...",
    addContext: "Konteekstii Dabaluu",
    latestHighlight: "Filannoo haaraa",
    useLatestHighlight: "Filannoo haaraa fayyadami",
    studyAi: "AI Barnootaa",
    askPlaceholder: "Gaaffii gaafadhu...",
  },
};

const normalizeSelectionText = (value) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .trim();

const Textbook = () => {
  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language || "om";
  const text = READER_TEXT[language] || READER_TEXT.en;
  const { textbookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const textbookFromState = location.state?.textbook || null;

  const [pdfLoading, setPdfLoading] = useState(true);
  const [textbookLoading, setTextbookLoading] = useState(true);
  const [textbookError, setTextbookError] = useState("");
  const [textbook, setTextbook] = useState(null);
  const [sending, setSending] = useState(false);
  const [latestHighlight, setLatestHighlight] = useState("");
  const iframeRef = useRef(null);
  const clearIframeSelectionListenersRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: "reader-greeting",
      role: "ai",
      content: text.aiGreeting,
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  // Context states
  const [selectedText, setSelectedText] = useState("");
  const [contextBox, setContextBox] = useState(null);

  const applySelectionToContext = (rawSelection) => {
    const normalized = normalizeSelectionText(rawSelection);
    if (normalized.length <= 5) return;

    setSelectedText(normalized);
    setLatestHighlight(normalized);
    setContextBox(normalized);
  };

  useEffect(() => {
    let active = true;

    const loadTextbook = async () => {
      if (textbookFromState) {
        setTextbook(textbookFromState);
        setTextbookError("");
        setTextbookLoading(false);
        setPdfLoading(true);
        return;
      }

      if (!textbookId) {
        setTextbookError(text.missingId);
        setTextbookLoading(false);
        return;
      }

      setTextbookLoading(true);
      setTextbookError("");
      setPdfLoading(true);

      try {
        const response = await fetchTextbookById(textbookId);
        if (!active) return;

        setTextbook(response?.data || null);
      } catch (error) {
        if (!active) return;

        setTextbook(null);
        setTextbookError(error.message || text.loadError);
      } finally {
        if (active) setTextbookLoading(false);
      }
    };

    loadTextbook();

    return () => {
      active = false;
    };
  }, [textbookId, textbookFromState, text.missingId, text.loadError]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length > 0 && prev[0]?.id === "reader-greeting") {
        return [
          { id: "reader-greeting", role: "ai", content: text.aiGreeting },
          ...prev.slice(1),
        ];
      }
      return prev;
    });
  }, [text.aiGreeting]);

  useEffect(() => {
    const onSelectionChange = () => {
      const selection = normalizeSelectionText(
        window.getSelection()?.toString(),
      );
      if (selection.length > 5) {
        applySelectionToContext(selection);
      }
    };

    document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (typeof clearIframeSelectionListenersRef.current === "function") {
        clearIframeSelectionListenersRef.current();
      }
    };
  }, []);

  const handlePdfLoad = () => {
    setPdfLoading(false);

    if (typeof clearIframeSelectionListenersRef.current === "function") {
      clearIframeSelectionListenersRef.current();
      clearIframeSelectionListenersRef.current = null;
    }

    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const iframeDoc =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;

      const readSelection = () => {
        const selected = normalizeSelectionText(
          iframeDoc.getSelection?.()?.toString(),
        );
        if (selected.length > 5) {
          applySelectionToContext(selected);
        }
      };

      const onMouseUp = () => setTimeout(readSelection, 120);
      const onKeyUp = () => setTimeout(readSelection, 120);

      iframeDoc.addEventListener("selectionchange", readSelection);
      iframeDoc.addEventListener("mouseup", onMouseUp);
      iframeDoc.addEventListener("keyup", onKeyUp);

      const poll = window.setInterval(readSelection, 700);

      clearIframeSelectionListenersRef.current = () => {
        iframeDoc.removeEventListener("selectionchange", readSelection);
        iframeDoc.removeEventListener("mouseup", onMouseUp);
        iframeDoc.removeEventListener("keyup", onKeyUp);
        window.clearInterval(poll);
      };
    } catch (_error) {
      // Ignore cross-origin iframe access errors; document-level selection still works.
    }
  };

  // Highlight handler for non-iframe content
  const handleTextSelection = () => {
    const selected = normalizeSelectionText(window.getSelection()?.toString());
    if (selected.length > 5) {
      applySelectionToContext(selected);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() && !contextBox) return;

    const userQuestion = inputValue.trim();
    const newMsg = {
      role: "user",
      content: userQuestion,
      context: contextBox,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    const promptContext = contextBox;
    setSending(true);

    try {
      const contextualPrompt = promptContext
        ? `Textbook context: ${promptContext}\n\nQuestion: ${userQuestion}`
        : userQuestion;

      const response = await sendAiChatMessage({
        question: contextualPrompt,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: response?.response || text.noAiResponse,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: error.message || text.aiUnavailable,
        },
      ]);
    } finally {
      setSending(false);
      setContextBox(null);
    }
  };

  const onlinePdfUrl = textbook?.pdf_url || textbook?.textbook_url || "";

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
            {textbook?.title || text.readerTitle}
          </h2>
        </div>

        {/* PDF iframe */}
        <div className="flex-1 bg-gray-50">
          {textbookLoading ? (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
              {text.loadingTextbook}
            </div>
          ) : textbookError ? (
            <div className="w-full h-full flex items-center justify-center p-6">
              <div className="border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3 max-w-md">
                {textbookError}
              </div>
            </div>
          ) : !onlinePdfUrl ? (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
              {text.missingPdf}
            </div>
          ) : (
            <>
              {pdfLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 text-sm text-gray-500 z-10">
                  {text.loadingPdf}
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={onlinePdfUrl}
                className="w-full h-full border-none"
                onLoad={handlePdfLoad}
                title="PDF Viewer"
              />
            </>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: AI Chat */}
      <div className="w-104 flex flex-col bg-white border-l border-gray-200">
        {/* Chat header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <h3 className="font-bold text-gray-900">{text.studyAi}</h3>
        </div>

        {latestHighlight ? (
          <div className="px-6 pt-4 pb-2 border-b border-gray-100">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-gray-700">
                {text.latestHighlight}
              </p>
              <button
                onClick={() => setContextBox(latestHighlight)}
                className="inline-flex items-center gap-1 text-[11px] text-[#0056D2] font-semibold hover:underline"
              >
                <Highlighter size={12} />
                {text.useLatestHighlight}
              </button>
            </div>
            <p className="text-xs text-gray-600 line-clamp-3">
              {latestHighlight}
            </p>
          </div>
        ) : null}

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
              placeholder={text.askPlaceholder}
              className="w-full pl-5 pr-14 py-3.5 bg-gray-100 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={sending || (!inputValue.trim() && !contextBox)}
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
