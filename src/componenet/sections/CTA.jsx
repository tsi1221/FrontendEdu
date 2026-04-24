import { memo, useContext } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { LanguageContext } from "../../context/LanguageContext";
import { RippleButton } from "../ui/RippleButton";
import { FloatingFormulas } from "../ui/FloatingFormulas";

const CTA = memo(() => {
  const languageContext = useContext(LanguageContext);

  const t = languageContext?.t ?? ((key) => key);

  const handleGetStarted = () => {
    window.location.href = "/register";
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 text-center">
      {/* ================= CONSISTENT OVERLAY ================= */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft black wash */}
        <div className="absolute inset-0 bg-black/5" />

        {/* gradient depth */}
        <div className="absolute inset-0 bg-linear-to-bm-black/5 via-transparent to-black/10" />

        {/* premium glow */}
        <div className="absolute -left-30 top-10 h-96 w-96 rounded-full bg-[#193CB8]/10 blur-[160px]" />
        <div className="absolute -right-30 bottom-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[180px]" />
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[150px]" />
      </div>

      <FloatingFormulas className="opacity-20" />

      {/* ================= CARD ================= */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          relative mx-auto max-w-3xl rounded-3xl border border-gray-200
          bg-white/80 p-10 shadow-xl backdrop-blur-xl
        "
      >
        {/* soft top glow line */}
        <div className="absolute inset-x-0 top-0 h-0.5g-gradient-to-r from-transparent via-[#193CB8]/40 to-transparent" />

        <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
          {t("startJourney")}
        </h2>

        <p className="mt-4 text-lg text-gray-500">
          {t("joinThousands")}
        </p>

        <div className="mt-8 flex justify-center">
          <RippleButton
            onClick={handleGetStarted}
            variant="primary"
            icon={<ChevronRight size={18} />}
            className="px-6 py-3 text-base"
          >
            {t("getStartedFree")}
          </RippleButton>
        </div>

        {/* subtle bottom accent */}
        <div className="absolute bottom-0 left-1/2 h-0.5 w-24 -translate-x-1/2 bg-[#193CB8]/30" />
      </motion.div>
    </section>
  );
});

CTA.displayName = "CTA";

export { CTA };