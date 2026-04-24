import { memo, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { TiltCard } from "../ui/TiltCard";
import { CountUp } from "../ui/CountUp";
import { FloatingFormulas } from "../ui/FloatingFormulas";

const stats = [
  { labelKey: "partnerSchools", value: 150, suffix: "+" },
  { labelKey: "activeStudents", value: 32, suffix: "K+" },
  { labelKey: "expertEducators", value: 5, suffix: "K+" },
];

const Stats = memo(() => {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) return null;

  const { t } = languageContext;

  return (
    <section className="relative overflow-hidden bg-white px-6 py-16">
      {/* ================= CONSISTENT OVERLAY ================= */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft black wash */}
        <div className="absolute inset-0 bg-black/5" />

        {/* gradient depth */}
        <div className="absolute inset-0 bg-linear-to-b from-black/5 via-transparent to-black/10" />

        {/* glow system (same as other sections) */}
        <div className="absolute -left-30 top-0 h-80 w-80 rounded-full bg-[#193CB8]/10 blur-[150px]" />
        <div className="absolute -right-30 bottom-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-[170px]" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[140px]" />
      </div>

      <FloatingFormulas className="opacity-20" />

      {/* ================= GRID ================= */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-3">
        {stats.map((s, i) => (
          <TiltCard key={i}>
            <div
              className="
                group relative rounded-3xl border border-gray-200
                bg-white/80 p-8 text-center shadow-sm backdrop-blur-xl
                transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
              "
            >
              {/* subtle top glow line */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-[#193CB8]/30 to-transparent" />

              {/* number */}
              <div className="text-4xl font-bold text-[#193CB8] md:text-5xl">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>

              {/* label */}
              <p className="mt-3 text-sm font-medium text-gray-500 md:text-base">
                {t(s.labelKey)}
              </p>

              {/* hover accent */}
              <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-[#193CB8] transition-all duration-300 group-hover:w-1/2" />
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
});

Stats.displayName = "Stats";

export { Stats };