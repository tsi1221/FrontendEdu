import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Library, User, Search, ArrowUpRight } from "lucide-react";
import { fetchCurrentUser, fetchTextbookCatalog } from "../../services/api";
import { LanguageContext } from "../../context/LanguageContext";

const GALLERY_TEXT = {
  en: {
    title: "Academic Library",
    subtitle: "Select a material to begin",
    available: "AVAILABLE TEXTBOOKS",
    items: "ITEMS",
    loading: "Loading textbooks...",
    subject: "Subject",
    author: "EduTwin",
    openBook: "Open Book",
    noMatches: "No matches found",
    noMatchesHint: "Try adjusting your search query or filters.",
    classMissing: "Student class level is missing from profile.",
    loadError: "Unable to load textbooks from backend.",
  },
  om: {
    title: "Kuusaa Kitaabaa",
    subtitle: "Qabeenya filadhuu jalqabi",
    available: "KITAABOTA BARNOOTAA ARGAMAN",
    items: "MEESHAALEE",
    loading: "Kitaabota fe'amaa jira...",
    subject: "Mata-duree",
    author: "EduTwin",
    openBook: "Kitaaba Bani",
    noMatches: "Waan wal-fakkaatu hin argamne",
    noMatchesHint: "Gaaffii barbaacha ykn filannoowwan kee jijjiiri.",
    classMissing: "Kutaan barataa profaayil keessa hin jiru.",
    loadError: "Kitaabota backend irraa fe'uu hin dandeenye.",
  },
};

const TextbookGallery = () => {
  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language || "om";
  const text = GALLERY_TEXT[language] || GALLERY_TEXT.en;
  const navigate = useNavigate();
  const [searchQuery] = useState("");
  const [filterSubject] = useState("All");
  const [textbooks, setTextbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentGradeLevel, setStudentGradeLevel] = useState(null);

  useEffect(() => {
    let active = true;

    const loadTextbooks = async () => {
      setLoading(true);
      setError("");

      try {
        const profileResponse = await fetchCurrentUser();
        const gradeLevel = profileResponse?.data?.profile?.grade_level;
        if (!gradeLevel) {
          throw new Error(text.classMissing);
        }

        const response = await fetchTextbookCatalog({ grade: gradeLevel });
        if (!active) return;

        const data = Array.isArray(response?.data) ? response.data : [];
        setTextbooks(data);
        setStudentGradeLevel(Number(gradeLevel));
      } catch (fetchError) {
        if (!active) return;

        setError(fetchError.message || text.loadError);
        setTextbooks([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadTextbooks();

    return () => {
      active = false;
    };
  }, [text.classMissing, text.loadError]);

  const filteredBooks = useMemo(() => {
    return textbooks.filter((book) => {
      const title = String(book?.title || "").toLowerCase();
      const matchesSearch = title.includes(searchQuery.toLowerCase());
      const subject = String(book?.subject || book?.subject_name || "").trim();
      const matchesSubject =
        filterSubject === "All" || subject === filterSubject;
      return matchesSearch && matchesSubject;
    });
  }, [textbooks, searchQuery, filterSubject]);

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white shrink-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0056D2] flex items-center justify-center">
                <Library size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  {text.title}
                </h1>
                <p className="text-xs text-gray-500">{text.subtitle}</p>
              </div>
            </div>
            <User size={18} className="text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-50 px-5 py-6">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold text-gray-500 tracking-[0.2em] flex items-center gap-2">
            <BookOpen size={14} className="text-[#0056D2]" />
            {text.available}
          </h3>
          <span className="text-[10px] font-bold text-gray-400 bg-gray-200 px-2 py-0.5 rounded">
            {filteredBooks.length} {text.items}
          </span>
        </div>

        {/* The Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {loading && (
            <div className="col-span-full text-center text-sm text-gray-500 py-8">
              {text.loading}
            </div>
          )}

          {!loading && error && (
            <div className="col-span-full border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">
              {error}
            </div>
          )}

          {filteredBooks.map((book) => (
            <div
              key={`${book.subject || "subject"}-${book.grade || "grade"}-${book.title}`}
              onClick={() =>
                navigate(`/text-book/${encodeURIComponent(book.title)}`, {
                  state: {
                    textbook: book,
                    gradeLevel: studentGradeLevel,
                  },
                })
              }
              className="group relative aspect-16/10 overflow-hidden bg-slate-200 cursor-pointer border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Background Image */}
              <img
                src={
                  book.cover_image_url ||
                  book.thumbnail ||
                  "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000"
                }
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent transition-opacity group-hover:from-[#0056D2]/90" />

              {/* Text Content on Image */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="space-y-1 transform transition-transform duration-300 group-hover:-translate-y-2">
                  <span className="inline-block text-[9px] font-black bg-[#0056D2] text-white px-2 py-0.5 uppercase tracking-widest mb-2">
                    {book.subject_name || book.subject || text.subject}
                  </span>
                  <h2 className="text-white font-bold text-lg leading-tight line-clamp-2">
                    {book.title}
                  </h2>
                  <p className="text-gray-300 text-xs font-medium">
                    {book.author || text.author}
                  </p>
                </div>

                {/* Bottom Action Bar on Hover */}
                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1 text-white text-[10px] font-bold uppercase">
                    {text.openBook} <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center mb-4">
              <Search size={30} className="text-gray-400" />
            </div>
            <p className="text-gray-800 font-bold">{text.noMatches}</p>
            <p className="text-gray-500 text-xs mt-1">{text.noMatchesHint}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TextbookGallery;
