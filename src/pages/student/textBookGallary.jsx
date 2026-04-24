import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    BookOpen, 
    Library, 
    User, 
    Search,
    
    ArrowUpRight
} from 'lucide-react';
import sampleContents from "./sampleContents.json";

const TextbookGallery = () => {
    const navigate = useNavigate();
    const [searchQuery] = useState('');
    const [filterSubject] = useState('All');

    const textbooks = sampleContents;

    const filteredBooks = textbooks.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject = filterSubject === 'All' || book.category_detail?.subject === filterSubject;
        return matchesSearch && matchesSubject;
    });

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
                                <h1 className="text-lg font-bold text-gray-900">Academic Library</h1>
                                <p className="text-xs text-gray-500">Select a material to begin</p>
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
                        AVAILABLE TEXTBOOKS
                    </h3>
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-200 px-2 py-0.5 rounded">
                        {filteredBooks.length} ITEMS
                    </span>
                </div>

                {/* The Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {filteredBooks.map((book) => (
                        <div 
                            key={book._id}
                            onClick={() => navigate(`/text-book/${book._id}`)}
                            className="group relative aspect-16/10 overflow-hidden bg-slate-200 cursor-pointer border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            {/* Background Image */}
                            <img 
                                src={book.thumbnail || "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000"} 
                                alt={book.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent transition-opacity group-hover:from-[#0056D2]/90" />

                            {/* Text Content on Image */}
                            <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                <div className="space-y-1 transform transition-transform duration-300 group-hover:-translate-y-2">
                                    <span className="inline-block text-[9px] font-black bg-[#0056D2] text-white px-2 py-0.5 uppercase tracking-widest mb-2">
                                        {book.category_detail?.subject || "Subject"}
                                    </span>
                                    <h2 className="text-white font-bold text-lg leading-tight line-clamp-2">
                                        {book.title}
                                    </h2>
                                    <p className="text-gray-300 text-xs font-medium">
                                        {book.author}
                                    </p>
                                </div>

                                {/* Bottom Action Bar on Hover */}
                                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  
                                    <div className="flex items-center gap-1 text-white text-[10px] font-bold uppercase">
                                        Open Book <ArrowUpRight size={14} />
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
                        <p className="text-gray-800 font-bold">No matches found</p>
                        <p className="text-gray-500 text-xs mt-1">Try adjusting your search query or filters.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TextbookGallery;