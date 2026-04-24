import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight, Quote } from 'lucide-react';

// Clean English‑only testimonials data
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Grade 12 Student · Top Performer',
    quote: 'EduTwin helped me pass Grade 12 with distinction! The 3D visualizations made complex algorithms feel intuitive.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Grade 11 Student',
    quote: 'I went from a C to an A+ in math in just one semester.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.8,
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Professor & Curriculum Advisor',
    quote: 'Students are more engaged than ever thanks to interactive learning.',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    rating: 4.5,
  },
  {
    name: 'David Tesfaye',
    role: 'Grade 10 Student',
    quote: 'Gamified learning kept me motivated throughout the year.',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4.2,
  },
  {
    name: 'Amina Yusuf',
    role: 'Grade 9 Student',
    quote: 'Now I understand science formulas easily thanks to interactive lessons.',
    avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
    rating: 4.9,
  },
  {
    name: 'Samuel Bekele',
    role: 'Grade 12 Graduate · Valedictorian',
    quote: 'EduTwin helped me become top of my class.',
    avatar: 'https://randomuser.me/api/portraits/men/53.jpg',
    rating: 5,
  },
];

const Testimonials = () => {
  const [page, setPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const current = testimonials.slice(page * perPage, (page + 1) * perPage);

  // Auto‑play carousel every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setIsAutoPlaying(true);
  };

  return (
    <section className="relative py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Animated background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#0056D2]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#0056D2] to-[#3b82f6] bg-clip-text text-transparent">
            What Our Students Say
          </h2>
          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            Real success stories from learners who transformed their education with us
          </p>
        </motion.div>

        {/* TESTIMONIAL GRID */}
        <div className="grid gap-8 md:grid-cols-3">
          <AnimatePresence mode="wait">
            {current.map((item, idx) => (
              <motion.div
                key={`${page}-${idx}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative h-full bg-white/80 backdrop-blur-sm rounded-2xl p-7 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#0056D2]/20 transform hover:-translate-y-1">
                  {/* Quote icon */}
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-[#0056D2]/10 group-hover:text-[#0056D2]/20 transition" />

                  {/* User info */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-[#0056D2]/20 group-hover:ring-[#0056D2]/50 transition"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=0056D2&color=fff&size=128`;
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#0056D2] font-medium tracking-wide">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`${
                          i < Math.floor(item.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : i < item.rating
                            ? 'text-yellow-400 fill-yellow-400/50'
                            : 'text-gray-200'
                        } transition-colors`}
                      />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-gray-700 leading-relaxed">
                    “{item.quote}”
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* PAGINATION & CONTROLS */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={() => handlePageChange((page - 1 + totalPages) % totalPages)}
            className="p-2 rounded-full bg-white border border-gray-200 text-[#0056D2] hover:bg-[#0056D2] hover:text-white hover:border-[#0056D2] transition-all duration-200"
            aria-label="Previous"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page
                    ? 'bg-[#0056D2] w-8'
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => handlePageChange((page + 1) % totalPages)}
            className="p-2 rounded-full bg-white border border-gray-200 text-[#0056D2] hover:bg-[#0056D2] hover:text-white hover:border-[#0056D2] transition-all duration-200"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;