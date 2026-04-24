import React, { Suspense, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { LanguageProvider } from "../context/LanguageContext";
import { Navbar } from "../componenet/sections/Navbar"; // ← Add this import

import { Hero } from "../componenet/sections/Hero";
import { Stats } from "../componenet/sections/Stats";
import { Features } from "../componenet/sections/Features";
import Testimonials  from "../componenet/sections/Testimonials";
import { Team } from "../componenet/sections/Team";
import { CTA } from "../componenet/sections/CTA";
import { Footer } from "../componenet/sections/Footer";

const ThreeBackground = React.lazy(
  () => import("../componenet/ThreeBackground")
);

const MainLayoutContent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const isHome = location.pathname === "/";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <Suspense fallback={<div />}>
        <ThreeBackground />
      </Suspense>

      {/* Navbar - shows on all pages */}
      <Navbar />

      {/* HOME PAGE */}
      {isHome ? (
        <>
          <Hero />
          <Stats />
          <Features />
          <Testimonials />
          <Team/>
          <CTA />
          <Footer />
        </>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

const MainLayout = () => (
  <LanguageProvider>
    <MainLayoutContent />
  </LanguageProvider>
);

export default MainLayout;