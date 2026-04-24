import { memo, useContext, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from "../../context/LanguageContext";
import { FloatingFormulas } from '../ui/FloatingFormulas';

const team = [
  { name: 'Eyob Birhanu', roleEn: 'Frontend & Canva Designer', roleOm: 'Dizaayinara Fuula Duraa & Canva', roleAm: 'Frontend & Canva ዲዛይነር', img: '/team/eyob.jpg' },
  { name: 'Yeabsira Fekadu', roleEn: 'Backend & 3D Engineer', roleOm: 'Injinara Duubaa & 3D', roleAm: 'Backend & 3D ኢንጂነር', img: '/team/yeabsira.jpg' },
  { name: 'Tsehaynesh Biruh', roleEn: 'Fullstack Developer & PM', roleOm: 'Hojjataa Fullstack & PM', roleAm: 'Fullstack ገንቢ & PM', img: '/team/tsehaynesh.jpg' },
  { name: 'Natnael Zewdu', roleEn: 'UI/UX Designer', roleOm: 'Dizaayinara UI/UX', roleAm: 'UI/UX ዲዛይነር', img: '/team/natnael.jpg' },
  { name: 'Elias Abera', roleEn: 'Mobile & AI Engineer', roleOm: 'Injinara Moobaayilii & AI', roleAm: 'ሞባይል & AI ኢንጂነር', img: '/team/elias.jpg' },
];

const Team = memo(() => {
  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language ?? 'en';
  const t = languageContext?.t ?? ((key) => key);

  const getRole = useCallback(
    (member) => {
      if (language === 'om') return member.roleOm;
      if (language === 'am') return member.roleAm;
      return member.roleEn;
    },
    [language]
  );

  return (
    <section
      id="team"
      className="relative py-20 px-6 bg-linear-to-b from-white to-gray-50/70 overflow-hidden"
    >
      {/* GLOBAL SUBTLE DARK OVERLAY (CONSISTENCY LAYER) */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      <FloatingFormulas className="opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#193CB8] tracking-tight">
            {t('meetTeam')}
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            {t('brilliantMinds')}
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              {/* AVATAR WRAPPER */}
              <div className="relative w-24 h-24 mx-auto mb-4">
                {/* glow layer */}
                <div className="absolute inset-0 rounded-full bg-[#193CB8]/10 blur-md group-hover:blur-lg transition" />

                {/* image */}
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target).src =
                      `https://ui-avatars.com/api/?name=${member.name}&background=193CB8&color=fff`;
                  }}
                  className="relative w-24 h-24 rounded-full object-cover border-2 border-[#193CB8]/30 shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* NAME */}
              <h3 className="font-semibold text-gray-800 group-hover:text-[#193CB8] transition">
                {member.name}
              </h3>

              {/* ROLE */}
              <p className="text-sm text-gray-500 mt-1">
                {getRole(member)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Team.displayName = 'Team';

export { Team };