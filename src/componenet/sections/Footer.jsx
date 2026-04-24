import { memo, useContext, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { LanguageContext } from "../../context/LanguageContext";
import { Logo } from "../ui/logo";

const Footer = memo(() => {
  const languageContext = useContext(LanguageContext);
  const t = languageContext?.t ?? ((key) => key);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const quickLinks = useMemo(
    () => [
      { key: "about", id: "home" },
      { key: "courses", id: "features" },
      { key: "testimonials", id: "testimonials" },
      { key: "team", id: "team" },
    ],
    []
  );

  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-white px-6 py-16 text-gray-900">
      
      {/* GLOBAL CONSISTENCY OVERLAY */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 bg-linear-to-b from-black/5 via-transparent to-black/10" />
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-[140px]" />
        <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        
        {/* GRID */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* BRAND */}
          <div>
            <Logo size="sm" />

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-500">
              Empowering learners with AI-driven education, immersive visuals,
              and personalized learning experiences.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Quick Links
            </h3>

            <div className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => scrollToSection(link.id)}
                  className="group flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#0056D2]"
                >
                  <span>{t(link.key)}</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Platform
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-500">
              <li className="hover:text-[#0056D2] transition cursor-pointer">AI Tutor</li>
              <li className="hover:text-[#0056D2] transition cursor-pointer">3D Learning</li>
              <li className="hover:text-[#0056D2] transition cursor-pointer">Live Classes</li>
              <li className="hover:text-[#0056D2] transition cursor-pointer">Smart Analytics</li>
              <li className="hover:text-[#0056D2] transition cursor-pointer">Progress Tracking</li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Stay Updated
            </h3>

            <p className="mt-5 text-sm leading-6 text-gray-500">
              Get updates, learning insights, and new features directly in your inbox.
            </p>

            <div className="mt-5 flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-transparent px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
              />

              <button className="rounded-full bg-[#0056D2] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2a4ad0]">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-gray-200" />

      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export { Footer };