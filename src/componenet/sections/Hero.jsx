import { memo, useMemo, useContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { LanguageContext } from "../../context/LanguageContext";
import { RippleButton } from "../ui/RippleButton";
import { AnimatedText } from "../ui/AnimatedText";
import landing from "../../assets/landing.png";

const Hero = memo(() => {
  const languageContext = useContext(LanguageContext);

  const t = languageContext?.t ?? ((key) => key);
  const language = languageContext?.language ?? "en";

  const { scrollY } = useScroll();

  const heroY = useTransform(scrollY, [0, 500], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 320], [1, 0]);

  const animatedTexts = useMemo(() => {
    if (language === "en") {
      return ["EduTwin AI", "3D Visuals", "Personalized Tutor"];
    }

    if (language === "om") {
      return ["EduTwin AI", "Viizhulaayizeeshinii 3D", "Barsiisaa Dhuunfaa"];
    }

    // Default to English if language not supported
    return ["EduTwin AI", "3D Visuals", "Personalized Tutor"];
  }, [language]);

  const handleGetStarted = () => {
    window.location.href = "/register";
  };

  const handleExploreCourses = () => {
    document
      .getElementById("features")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pb-20 pt-28 md:pb-24 md:pt-32"
    >
      {/* ================= Fancy Overlay Background ================= */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Main black cinematic overlay */}
        <div className="absolute inset-0 bg-black/5" />

        {/* Elegant gradient darkness */}
        <div className="absolute inset-0 bg-linear-to-br from-black/5 via-black/2 to-black/16" />

        {/* Luxury spotlight fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_30%)]" />

        {/* Primary Blue premium glows - Updated to #0056D2 */}
        <div className="absolute -left-16 top-10 h-80 w-80 rounded-full bg-[#0056D2]/20 blur-[140px] animate-pulse" />
        <div className="absolute -right-20 bottom-10 h-104 w-104 rounded-full bg-[#0056D2]/15 blur-[160px] animate-pulse" />
        <div className="absolute left-[35%] top-[25%] h-72 w-72 rounded-full bg-[#0056D2]/10 blur-[140px]" />

        {/* Glass noise grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px",
          }}
        />
      </motion.div>

      {/* ================= Content ================= */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:gap-14">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl"
          >
            {/* Badge content can be added here if needed */}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-bold leading-tight text-black md:text-5xl lg:text-6xl"
          >
            {t("learnSmarter")}
            <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-[#0056D2] via-[#4a8eff] to-[#0056D2] bg-clip-text text-transparent">
              <AnimatedText texts={animatedTexts} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-5 max-w-xl text-base leading-7 text-blue-400 md:text-lg lg:mx-0"
          >
            {t("heroDescription")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <RippleButton
              onClick={handleGetStarted}
              variant="primary"
              icon={<ArrowRight size={18} />}
            >
              {t("getStarted")}
            </RippleButton>

            <RippleButton
              onClick={handleExploreCourses}
              variant="outline"
            >
              {t("exploreCourses")}
            </RippleButton>
          </motion.div>
        </div>

        {/* Right Image Card */}
        <motion.div
          initial={{ opacity: 0, x: 35, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            {/* Image */}
            <img
              src={landing}
              alt="Educational platform"
              className="h-auto w-full object-cover"
              loading="eager"
            />

            {/* Dark image overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/10" />

            {/* Glow border - Updated to primary blue */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-[#0056D2]/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export { Hero };