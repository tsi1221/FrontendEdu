import { memo, useMemo, useContext } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

  const heroY = useTransform(scrollY, [0, 500], [0, 140]);
  const heroOpacity = useTransform(scrollY, [0, 320], [1, 0]);

  const animatedTexts = useMemo(() => {
    if (language === "om") {
      return ["EduTwin AI", "Viizhulaayizeeshinii 3D", "Barsiisaa Dhuunfaa"];
    }
    return ["EduTwin AI", "3D Visuals", "Personalized Tutor"];
  }, [language]);

  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
  }, []);

  const handleJoin = () => {
    navigate("/register");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={landing}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#0056D2]/90 via-[#003d99]/85 to-[#001a4d]/90" />
      </div>

      {/* Effects */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-[150px] animate-pulse" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100[#0056D2]/20 rounded-full blur-[140px]" />

        {/* Particles */}
        <div className="absolute inset-0">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                top: `${p.top}%`,
                left: `${p.left}%`,
                animation: `float ${p.duration}s infinite ease-in-out`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
        >
          {t("learnSmarter")}
          <br />
          <span className="bg-linear-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
            <AnimatedText texts={animatedTexts} />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed"
        >
          Learn faster with AI-powered 3D visualizations and personalized tutoring experiences designed for modern students.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <RippleButton
            onClick={handleJoin}
            variant="primary"
            icon={<ArrowRight size={18} />}
            className="text-black! bg-white hover:bg-white/90 shadow-lg"
          >
            Join Now
          </RippleButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>

      {/* Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </section>
  );
});

Hero.displayName = "Hero";

export { Hero };