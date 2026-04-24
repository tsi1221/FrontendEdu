import { memo, useContext } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  BarChart3,
  BookOpen,
  Gamepad2,
} from "lucide-react";

import { LanguageContext } from "../../context/LanguageContext";
import { TiltCard } from "../ui/TiltCard";
import { FloatingFormulas } from "../ui/FloatingFormulas";

const features = [
  { icon: Sparkles, titleKey: "aiTutor", descKey: "aiTutorDesc" },
  { icon: Zap, titleKey: "smartQuiz", descKey: "smartQuizDesc" },
  { icon: BarChart3, titleKey: "progressTracking", descKey: "progressTrackingDesc" },
  { icon: BookOpen, titleKey: "interactiveLessons", descKey: "interactiveLessonsDesc" },
  { icon: Gamepad2, titleKey: "gamifiedLearning", descKey: "gamifiedLearningDesc" },
  { icon: Sparkles, titleKey: "aiRecommendations", descKey: "aiRecommendationsDesc" },
];

const Features = memo(() => {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) return null;

  const { t } = languageContext;

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white py-20 px-6"
    >
      {/* ================= CONSISTENT OVERLAY SYSTEM ================= */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft black wash (very minimal like footer) */}
        <div className="absolute inset-0 bg-black/5" />

        {/* smooth gradient depth */}
        <div className="absolute inset-0 bg-linear-to-b from-black/5 via-transparent to-black/10" />

        {/* soft brand glows */}
        <div className="absolute -left-25 top-20 h-80 w-80 rounded-full bg-[#193CB8]/10 blur-[140px]" />
        <div className="absolute -right-30 top-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[160px]" />
        <div className="absolute -bottom-30 left-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-[140px]" />
      </div>

      <FloatingFormulas className="opacity-25" />

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mb-14 text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
          {t("powerfulFeatures")}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-500">
          {t("featuresSubtitle")}
        </p>
      </motion.div>

      {/* ================= GRID ================= */}
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, idx) => (
          <TiltCard key={idx}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="
                group relative rounded-2xl border border-gray-200
                bg-white/80 p-7 text-center shadow-sm backdrop-blur-xl
                transition-all duration-300 hover:shadow-xl
              "
            >
              {/* icon glow */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#193CB8]/10 transition group-hover:scale-110">
                <feature.icon className="h-6 w-6 text-[#193CB8]" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                {t(feature.titleKey)}
              </h3>

              <p className="text-sm leading-6 text-gray-500">
                {t(feature.descKey)}
              </p>

              {/* subtle hover line */}
              <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-[#193CB8] transition-all duration-300 group-hover:w-1/2" />
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
});

Features.displayName = "Features";

export { Features };