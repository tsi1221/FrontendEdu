import { memo, useMemo, useContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Cpu, Box } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { LanguageContext } from "../../context/LanguageContext";
import { RippleButton } from "../ui/RippleButton";
import { AnimatedText } from "../ui/AnimatedText";
import landing from "../../assets/landing.png";

const Hero = memo(() => {
  const languageContext = useContext(LanguageContext);
  const navigate = useNavigate();

  const t = languageContext?.t ?? ((key) => key);
  const language = languageContext?.language ?? "en";

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 320], [1, 0]);

  const animatedTexts = useMemo(() => {
    return language === "om"
      ? ["EduTwin AI", "3D Barnoota", "Barsiisaa Dhuunfaa"]
      : ["EduTwin AI", "3D Visuals", "Personalized Tutor"];
  }, [language]);

  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map(() => ({
      top: 50 + (Math.random() - 0.5) * 40,
      left: 50 + (Math.random() - 0.5) * 40,
      size: 1 + Math.random() * 2,
      duration: 5 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
  }, []);

  const handleJoin = () => navigate("/signup");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img src={landing} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-br from-[#0056D2]/90 via-[#003d99]/85 to-[#001a4d]/95" />
      </div>

      {/* GRID OVERLAY (NEW) */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* FLOAT LIGHTS */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-[140px]" />
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl text-center">

        {/* PARTICLES */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${p.top}%`,
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: 0.6,
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, 8, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
              }}
            />
          ))}
        </div>

        {/* FLOATING BADGES (NEW ATOMS) */}
        <div className="flex justify-center gap-3 mb-6 flex-wrap">
          <span className="flex items-center gap-2 px-3 py-1 text-xs bg-white/10 text-white backdrop-blur rounded-full">
            <Sparkles size={12} /> AI Powered
          </span>
          <span className="flex items-center gap-2 px-3 py-1 text-xs bg-white/10 text-white backdrop-blur rounded-full">
            <Box size={12} /> 3D & AR Labs
          </span>
          <span className="flex items-center gap-2 px-3 py-1 text-xs bg-white/10 text-white backdrop-blur rounded-full">
            <Cpu size={12} /> Smart Learning
          </span>
        </div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
        >
          {t("learnSmarter")}
          <br />
          <span className="bg-linear-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            <AnimatedText texts={animatedTexts} />
          </span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-white/80 max-w-xl mx-auto"
        >
          Learn faster with AI-powered 3D simulations, AR labs, and personalized tutoring built for modern students.
        </motion.p>

        {/* CTA GROUP (NEW GLASS CONTAINER) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <div className="flex gap-3 p-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            
            <RippleButton
              onClick={handleJoin}
              icon={<ArrowRight size={18} />}
              className="bg-white text-black! hover:bg-white/90"
            >
              Get Started
            </RippleButton>

           

          </div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-white/60 rounded-full mt-2"
          />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export { Hero };