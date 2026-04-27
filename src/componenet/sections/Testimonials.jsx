import  { useState, memo, useContext } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronRight } from 'lucide-react';
import { LanguageContext } from "../../context/LanguageContext";
import { TiltCard } from '../ui/TiltCard';
import { FloatingFormulas } from '../ui/FloatingFormulas';

const testimonials = [
  {
    name: 'Hanna Bekele',
    roleEn: 'Grade 12 Student · Top Performer',
    roleOm: 'Barattuu Kutaa 12ffaa · Qabxii Olaanaa',
    roleAm: 'የ12ኛ ክፍል ተማሪ · ከፍተኛ ውጤት ያስመዘገበች',
    quoteEn:
      'EduTwin helped me pass Grade 12 with distinction! The 3D visualizations made complex algorithms feel intuitive.',
    quoteOm:
      'EduTwin kutaa 12ffaa qabxii fulaa (distinction) akkan xumuru na gargaare!',
    quoteAm:
      'EduTwin የ12ኛ ክፍልን ትምህርቴን በከፍተኛ ውጤት እንድጨርስ ረድቶኛል!',
    avatar: '/team/tsehaynesh.jpg',
    rating: 5,
  },
  {
    name: 'Biruk Alemayehu',
    roleEn: 'Grade 11 Student',
    roleOm: 'Barataa Kutaa 11ffaa',
    roleAm: 'የ11ኛ ክፍል ተማሪ',
    quoteEn:
      'I went from a C to an A+ in math in just one semester.',
    quoteOm:
      'Seemisteera tokko keessatti herregaan C irraa gara A+ tti ol guddadhe.',
    quoteAm:
      'በአንድ ሴሚስተር ውስጥ ከC ወደ A+ ተሻሻልኩ።',
    avatar: '/team/eyob.jpg',
    rating: 3,
  },
  {
    name: 'Rahel Abebe',
    roleEn: 'Grade 12 Student',
    roleOm: 'Barataa Kutaa 12ffaa',
    roleAm: 'የ12ኛ ክፍል ተማሪ',
    quoteEn:
      'Interactive learning made biology and chemistry much easier for me this year.',
    quoteOm:
      'Barnoonni interaaktiivii baayoloojii fi keemistirii naaf salphiseera.',
    quoteAm:
      'ኢንተራክቲቭ ትምህርት ባዮሎጂና ኬሚስትሪን ለእኔ በጣም ቀላል አድርጎታል።',
    avatar: '/team/yeabsira.jpg',
    rating: 4,
  },
  {
    name: 'Mekdes Tadesse',
    roleEn: 'Grade 10 Student',
    roleOm: 'Barataa Kutaa 10ffaa',
    roleAm: 'የ10ኛ ክፍል ተማሪ',
    quoteEn:
      'Gamified learning kept me motivated throughout the year.',
    quoteOm:
      'Barnoonni taphaan kaka’umsaa naaf ta’e.',
    quoteAm:
      'በጨዋታ መልክ ትምህርት ተነሳሽነቴን ጠብቆታል።',
    avatar: 'https://ui-avatars.com/api/?name=David+Tesfaye&background=193CB8&color=fff',
    rating: 3.5,
  },
  {
    name: 'Yosef Hailu',
    roleEn: 'Grade 9 Student',
    roleOm: 'Barataa Kutaa 9ffaa',
    roleAm: 'የ9ኛ ክፍል ተማሪ',
    quoteEn:
      'Now I understand science formulas easily thanks to interactive lessons.',
    quoteOm:
      'Foormulaa saayinsii salphaatti nan hubadha.',
    quoteAm:
      'የሳይንስ ቀመሮችን ቀላሉ ተማርኩ።',
    avatar: '/team/natnael.jpg',
    rating: 4.5,
  },
  {
    name: 'Saron Gemechu',
    roleEn: 'Grade 12 Graduate · Valedictorian',
    roleOm: 'Eebbifamaa Kutaa 12ffaa',
    roleAm: 'የ12ኛ ክፍል ተመራቂ',
    quoteEn:
      'EduTwin helped me become top of my class.',
    quoteOm:
      'EduTwin sadarkaa olaanaa na ga’e.',
    quoteAm:
      'EduTwin ከፍተኛ ደረጃ እንድይዝ ረድቶኛል።',
    avatar: '/team/elias.jpg',
    rating: 5,
  },
];

const getInitials = (name = '') =>
  String(name)
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

const Testimonials = memo(() => {
  const languageContext = useContext(LanguageContext);
  const t = languageContext?.t ?? ((key) => key);
  const language = languageContext?.language ?? 'en';

  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const current = testimonials.slice(page * perPage, (page + 1) * perPage);

  const getRole = (item) => {
    if (language === 'om') return item.roleOm;
    if (language === 'am') return item.roleAm;
    return item.roleEn;
  };

  const getQuote = (item) => {
    if (language === 'om') return item.quoteOm;
    if (language === 'am') return item.quoteAm;
    return item.quoteEn;
  };

  return (
    <section
      id="testimonials"
      className="relative py-16 px-6 max-w-7xl mx-auto overflow-hidden"
    >
      {/* GLOBAL SUBTLE DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      <FloatingFormulas className="opacity-40" />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#193CB8]">
          {t('successStories')}
        </h2>
        <p className="text-gray-600 mt-4 text-lg">
          {t('realResults')}
        </p>
      </motion.div>

      {/* GRID */}
      <div className="grid gap-8 md:grid-cols-3 relative z-10">
        {current.map((item, idx) => (
          <TiltCard key={`${page}-${idx}`}>
            <div className="relative h-full rounded-2xl p-8 overflow-hidden flex flex-col bg-white/85 backdrop-blur-xl border border-[#193CB8]/10 shadow-sm hover:shadow-2xl transition-all duration-500 group">

              {/* CARD OVERLAY */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* USER */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full border-2 border-[#193CB8]/20 group-hover:border-[#193CB8]/50 transition bg-[#193CB8] text-white flex items-center justify-center font-bold text-sm tracking-wide">
                    {getInitials(item.name)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-xs text-[#193CB8]/70 uppercase tracking-wider">
                      {getRole(item)}
                    </p>
                  </div>
                </div>

                {/* RATING */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < item.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-200'
                      }
                    />
                  ))}
                </div>

                {/* QUOTE */}
                <p className="text-gray-700 italic leading-relaxed">
                  “{getQuote(item)}”
                </p>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-8 mt-12 relative z-10">
          <button
            onClick={() =>
              setPage((p) => (p - 1 + totalPages) % totalPages)
            }
            className="p-3 rounded-full bg-white/90 border border-black/5 text-[#193CB8] hover:bg-[#193CB8] hover:text-white transition"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>

          <div className="flex gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === page
                    ? 'bg-[#193CB8] w-8'
                    : 'bg-gray-300 w-2.5'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((p) => (p + 1) % totalPages)}
            className="p-3 rounded-full bg-white/90 border border-black/5 text-[#193CB8] hover:bg-[#193CB8] hover:text-white transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
});

Testimonials.displayName = 'Testimonials';

export default Testimonials 