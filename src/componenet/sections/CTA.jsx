import { memo, useContext } from "react";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, Zap, ChevronRight } from "lucide-react";

import { LanguageContext } from "../../context/LanguageContext";
import { RippleButton } from "../ui/RippleButton";
import { FloatingFormulas } from "../ui/FloatingFormulas";

// ------ mock credit card component ------
const DemoCard = () => (
  <motion.div
    initial={{ rotateX: 20, rotateY: -10, opacity: 0, scale: 0.85 }}
    whileInView={{ rotateX: 0, rotateY: 0, opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="
      relative w-72 h-44 mx-auto rounded-2xl p-5
      bg-linear-to-br from-[#193CB8] to-[#0F2880]
      shadow-[0_20px_50px_-12px_rgba(25,60,184,0.5)]
      text-white overflow-hidden
    "
  >
    {/* card shine */}
    <div className="absolute inset-0 bg-white/5 rounded-2xl" />
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

    {/* chip */}
    <div className="flex justify-between items-start">
      <div className="w-10 h-7 bg-yellow-300/80 rounded-md flex items-center justify-center">
        <CreditCard size={16} className="text-gray-800" />
      </div>
      <ShieldCheck size={22} className="text-white/80" />
    </div>

    {/* card number */}
    <p className="mt-6 text-lg tracking-[0.15em] font-mono font-semibold">
      2671 9860 8300 2023
    </p>

    {/* bottom row */}
    <div className="mt-4 flex justify-between items-end">
      <div>
        <p className="text-[10px] text-white/60 uppercase tracking-wider">Card Holder</p>
        <p className="text-sm font-semibold tracking-wide">VINCE CARTER</p>
      </div>
      <div>
        <p className="text-[10px] text-white/60 uppercase tracking-wider">Expiry</p>
        <p className="text-sm font-semibold">03/22</p>
      </div>
    </div>

    {/* subtle ring animation */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border border-white/20"
    />
  </motion.div>
);

// ------ main CTA component ------
const CTA = memo(() => {
  const languageContext = useContext(LanguageContext);
  const t = languageContext?.t ?? ((key) => key);

  const handleSubscribe = () => {
    window.location.href = "/login";
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 text-center">
      {/* ================= OVERLAY ================= */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 bg-linear-to-b from-black/5 via-transparent to-black/10" />
        <div className="absolute -left-30 top-10 h-96 w-96 rounded-full bg-[#193CB8]/10 blur-[160px]" />
        <div className="absolute -right-30 bottom-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[180px]" />
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[150px]" />
      </div>

      <FloatingFormulas className="opacity-20" />

      {/* ================= MAIN CARD UI ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="
          relative mx-auto max-w-4xl rounded-3xl border border-gray-200
          bg-white/80 p-10 md:p-14 shadow-xl backdrop-blur-xl
        "
      >
        <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-[#193CB8]/40 to-transparent" />

        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* LEFT: Text + pricing */}
          <div className="flex-1 text-left">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              {t("unlockLearning")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-lg text-gray-500 max-w-md"
            >
              {t("joinThousands")}
            </motion.p>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex items-center gap-3"
            >
              <span className="text-6xl font-extrabold text-[#193CB8]">149</span>
              <span className="text-xl text-gray-500 font-medium">Birr</span>
              <span className="text-sm text-gray-400">/ month</span>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap size={16} className="text-[#193CB8]" />
                {t("fullAccess")}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck size={16} className="text-[#193CB8]" />
                {t("securePayment")}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <RippleButton
                onClick={handleSubscribe}
                variant="primary"
                icon={<ChevronRight size={18} />}
                className="px-8 py-4 text-base font-semibold"
              >
                {t("subscribeNow")}
              </RippleButton>
            </motion.div>
          </div>

          {/* RIGHT: Demo card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex-1 flex justify-center"
          >
            <DemoCard />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-1/2 h-0.5 w-24 -translate-x-1/2 bg-[#193CB8]/30" />
      </motion.div>
    </section>
  );
});

CTA.displayName = "CTA";

export { CTA };