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
    return language === "om"
      ? ["EduTwin AI", "Viizhulaayizeeshinii 3D", "Barsiisaa Dhuunfaa"]
      : ["EduTwin AI", "3D Visuals", "Personalized Tutor"];
  }, [language]);

  // ✅ CENTERED PARTICLES (around text)
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map(() => ({
      top: 50 + (Math.random() - 0.5) * 40,   // center Y
      left: 50 + (Math.random() - 0.5) * 40,  // center X
      size: 1 + Math.random() * 2.5,
      duration: 4 + Math.random() * 5,
      delay: Math.random() * 2,
      driftX: (Math.random() - 0.5) * 20,
      driftY: (Math.random() - 0.5) * 20,
    }));
  }, []);

  const handleJoin = () => navigate("/signup");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={landing} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-br from-[#0056D2]/90 via-[#003d99]/85 to-[#001a4d]/90" />
      </div>

      {/* Effects */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-[150px]" />
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl text-center">
        
        {/* ⭐ CENTERED WHITE PARTICLES AROUND TEXT */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${p.top}%`,
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: 0.6,
                boxShadow: "0 0 8px rgba(255,255,255,0.6)",
                transform: "translate(-50%, -50%)",
                animation: `float ${p.duration}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* TEXT */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
          transition={{ delay: 0.3 }}
          className="mt-6 text-white/80 max-w-xl mx-auto"
        >
          Learn faster with AI-powered 3D visualizations and personalized tutoring experiences designed for modern students.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <RippleButton
            onClick={handleJoin}
            icon={<ArrowRight size={18} />}
            className="bg-white text-black! hover:bg-white/90"
          >
            Join Now
          </RippleButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-white/60 rounded-full mt-2"
          />
        </div>
      </div>

      {/* FLOAT ANIMATION */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translate(0px, 0px);
          }
          50% {
            transform: translate(-50%, -50%) translate(10px, -18px);
          }
        }
      `}</style>
    </section>
  );
});

Hero.displayName = "Hero";

export { Hero };