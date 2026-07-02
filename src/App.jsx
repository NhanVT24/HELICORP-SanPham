import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroSections from "./sections/herosections.jsx";

const THEME_STORAGE_KEY = "landing-theme";

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <div className="page-shell">
      <div className="page-orb page-orb--one" />
      <div className="page-orb page-orb--two" />
      <div className="page-noise" />

      <Header
        darkMode={isDark}
        activeId="hero"
        onToggleTheme={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
      />

      <main>
        <HeroSections />
        <section id="design" className="min-h-screen" />
        <section id="camera" className="min-h-screen" />
        <section id="performance" className="min-h-screen" />
      </main>
    </div>
  );
}
