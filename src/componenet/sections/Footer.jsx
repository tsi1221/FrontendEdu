import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";
import { Logo } from "../ui/logo";

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  const organizationLinks = useMemo(
    () => [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Community", href: "/community" },
      { name: "Events", href: "/events" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    []
  );

  const resourceLinks = useMemo(
    () => [
      { name: "AI Learning", href: "/ai-learning" },
      { name: "Scholarships", href: "/scholarships" },
      { name: "Programs", href: "/programs" },
    ],
    []
  );

  return (
    <footer className="relative border-t border-gray-800 bg-black px-6 py-16 text-gray-300">
      <div className="mx-auto max-w-7xl">

        {/* GRID */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="text-lg font-bold text-white">EduTwin</span>
            </div>

            <h3 className="mt-4 text-xl font-bold text-white">
              Learn Smarter with AI
            </h3>

            <p className="mt-3 text-sm text-gray-400">
              AI-powered personalized learning with interactive 3D and AR experiences.
            </p>

            <Link
              to="/signup"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0056D2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0040a0]"
            >
              Get Started
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-white">
              Platform
            </h3>

            <ul className="mt-5 space-y-3">
              {organizationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-1 text-sm text-gray-400 hover:text-[#60a5fa]"
                  >
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-white">
              Resources
            </h3>

            <ul className="mt-5 space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-1 text-sm text-gray-400 hover:text-[#60a5fa]"
                  >
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-white">
              Account
            </h3>

            <div className="mt-5 space-y-3">
              <Link to="/signup" className="block text-sm text-gray-400 hover:text-[#60a5fa]">
                Sign Up
              </Link>
              <Link to="/login" className="block text-sm text-gray-400 hover:text-[#60a5fa]">
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-gray-800" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <div className="flex gap-4 items-center">
            <span>© {currentYear} EduTwin</span>
            <Link to="/privacy" className="hover:text-gray-300">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-300">Terms</Link>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>support@edutwin.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export { Footer };