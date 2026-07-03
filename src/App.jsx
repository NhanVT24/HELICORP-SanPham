import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroSections from "./sections/herosections.jsx";
import DesignSection from "./sections/DesignSection.jsx";
import CameraSection from "./sections/CameraSection.jsx";
import PerformanceSection from "./sections/PerformanceSection.jsx";
import ExploreSection from "./sections/ExploreSection.jsx";
import WhyChooseSection from "./sections/WhyChooseSection.jsx";
import OrderSection from "./sections/OrderSection.jsx";
import Footer from "./components/Footer.jsx";

const THEME_STORAGE_KEY = "landing-theme";
const LANGUAGE_STORAGE_KEY = "landing-language";
const METEORS = [
  { left: "4%", top: "8%", delay: "0s", duration: "8s" },
  { left: "26%", top: "-4%", delay: "2.3s", duration: "10s" },
  { left: "54%", top: "12%", delay: "4.8s", duration: "9s" },
  { left: "76%", top: "-8%", delay: "1.2s", duration: "11s" },
  { left: "12%", top: "48%", delay: "6.2s", duration: "10s" },
  { left: "67%", top: "55%", delay: "7.4s", duration: "9s" },
];

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  });
  const [activeId, setActiveId] = useState("hero");
  const [language, setLanguage] = useState(() => localStorage.getItem(LANGUAGE_STORAGE_KEY) === "vi" ? "vi" : "en");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    const sectionIds = ["hero", "design", "camera", "performance", "explore", "why", "order"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) setActiveId(["why", "order"].includes(visibleSection.target.id) ? "explore" : visibleSection.target.id);
      },
      { rootMargin: "-32% 0px -64%", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(0,113,227,0.08),transparent_20%),linear-gradient(180deg,#111_0%,#050505_55%,#000_100%)] text-white"
          : "bg-[radial-gradient(circle_at_top,#fff,#f6f6f8_58%,#ececec)] text-[#1d1d1f]"
      }`}
    >
      <div className="pointer-events-none fixed inset-0 animate-[drift_14s_ease-in-out_infinite_alternate] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_45%)] opacity-45 blur-[14px]" />
      <div className="pointer-events-none fixed inset-0 animate-[drift_18s_ease-in-out_infinite_alternate-reverse] bg-[radial-gradient(circle_at_80%_70%,rgba(0,113,227,0.06),transparent_40%)] opacity-45 blur-[14px]" />
      <div
        className={`pointer-events-none fixed inset-0 z-[3] bg-[size:145px_145px] ${
          isDark
            ? "bg-[radial-gradient(circle_at_1px_1px,rgba(255,174,35,0.18)_1px,transparent_0)] opacity-30 mix-blend-screen"
            : "bg-[radial-gradient(circle_at_1px_1px,rgba(224,112,0,0.13)_1px,transparent_0)] opacity-25 mix-blend-multiply"
        }`}
      />
      <div className="pointer-events-none fixed inset-0 z-[4] overflow-hidden">
        {METEORS.map((meteor, index) => (
          <span
            key={index}
            className="meteor"
            style={{
              left: meteor.left,
              top: meteor.top,
              animationDelay: meteor.delay,
              animationDuration: meteor.duration,
            }}
          />
        ))}
      </div>

      <Header
        darkMode={isDark}
        activeId={activeId}
        language={language}
        onToggleLanguage={() => setLanguage((current) => current === "en" ? "vi" : "en")}
        onToggleTheme={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
      />

      <main>
        <HeroSections darkMode={isDark} language={language} />
        <DesignSection darkMode={isDark} language={language} />
        <CameraSection darkMode={isDark} language={language} />
        <PerformanceSection darkMode={isDark} language={language} />
        <ExploreSection darkMode={isDark} language={language} />
        <WhyChooseSection darkMode={isDark} language={language} />
        <OrderSection darkMode={isDark} language={language} />
      </main>
      <Footer darkMode={isDark} language={language} />
    </div>
  );
}
