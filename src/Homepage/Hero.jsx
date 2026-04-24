import { memo, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useContext } from 'react';
import { RippleButton } from '../../components/ui/RippleButton';

const Hero = memo(() => {
  const languageContext = useContext(LanguageContext);
  const t = languageContext?.t ?? ((key) => key);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);
  
  const canvasRef = useRef(null);


  const handleGetStarted = () => (window.location.href = '/register');
  const handleExploreCourses = () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }
    
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(150, Math.floor(window.innerWidth * window.innerHeight / 8000));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationId = requestAnimationFrame(animateParticles);
    };
    
    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };
    
    setCanvasSize();
    initParticles();
    animateParticles();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-[#0056D2] via-[#003d99] to-[#001a4d]">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      {/* Animated Glow Orbs */}
      <motion.div 
        style={{ y: heroY, opacity: opacityHero }} 
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-1255h-125white/5 rounded-full blur-[150px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#0056D2]/20 rounded-full blur-[140px]" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium border border-white/20">
            {t('tagline') || 'Reach Back, Connect & Empower'}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight"
        >
          Reach Back,
          <br />
          <span className="bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
            Connect & Empower
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-base md:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto"
        >
          Building interconnected networks of Black AI scholars, professionals, innovators, 
          and allies across Canada and the globe.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <RippleButton
            onClick={handleGetStarted}
            variant="primary"
            icon={<ArrowRight size={18} />}
            className="bg-white text-[#0056D2] hover:bg-white/90 shadow-lg"
          >
            Join the Movement
          </RippleButton>
          
          <RippleButton
            onClick={handleExploreCourses}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            Explore Networks
          </RippleButton>
        </motion.div>

        {/* Stats or Trust Badge (Optional) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-white/60 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/80" />
            <span>500+ Members</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/80" />
            <span>10+ Countries</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/80" />
            <span>50+ Partners</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-2 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';

export { Hero };