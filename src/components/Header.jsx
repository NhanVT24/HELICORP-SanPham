import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Header({ darkMode, onToggleTheme, activeId }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Overview" },
    { id: "design", label: "Design" },
    { id: "camera", label: "Camera" },
    { id: "performance", label: "Performance" },
    { id: "explore", label: "Explore" },
  ];

  const shellClass = darkMode
    ? scrolled
      ? "border-white/10 bg-black/88 shadow-[0_10px_35px_rgba(0,0,0,.62)]"
      : "border-white/10 bg-black/72"
    : scrolled
    ? "border-black/15 bg-[#e8e8ed]/92 shadow-[0_14px_40px_rgba(0,0,0,.16)]"
    : "border-black/12 bg-[#e8e8ed]/82 shadow-[0_12px_32px_rgba(0,0,0,.11)]";

  const textClass = darkMode ? "text-white" : "text-[#1d1d1f]";
  const subTextClass = darkMode ? "text-white/58" : "text-[#6e6e73]";
  const navTextIdle = darkMode ? "#ffffffd1" : "#1d1d1fc7";
  const navTextActive = darkMode ? "#000000" : "#ffffff";
  const navBgIdle = darkMode ? "transparent" : "transparent";
  const navBgActive = darkMode ? "#ffffff" : "#1d1d1f";

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 sm:px-5">
      <div
        className={`glass mx-auto flex h-16 max-w-6xl items-center justify-between rounded-[28px] border backdrop-blur-3xl transition-all duration-500 ${shellClass}`}
      >
        <a
          href="#hero"
          className={`ml-4 flex items-center gap-3 rounded-2xl px-2 py-1 ${textClass}`}
        >
          <img
            src={darkMode ? "/white-removebg-preview.png" : "/black-removebg-preview.png"}
            alt="Apple mark"
            className="h-10 w-auto object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,.18)]"
          />

          <div className="leading-tight">
            <p className={`text-[15px] font-semibold tracking-tight ${textClass}`}>
              iPhone 17 Pro Max
            </p>
            <p className={`text-[11px] ${subTextClass}`}>Apple</p>
          </div>
        </a>

        <nav className="hidden items-center rounded-full p-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-6 py-2.5 text-[15px] font-semibold transition-all duration-300"
              style={{
                color: activeId === item.id ? navTextActive : navTextIdle,
                backgroundColor: activeId === item.id ? navBgActive : navBgIdle,
                boxShadow:
                  activeId === item.id
                    ? "0 8px 22px rgba(0, 0, 0, 0.16)"
                    : "none",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="relative mr-4 h-11 w-[8.75rem] shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`group absolute right-0 top-0 flex h-11 w-11 items-center overflow-hidden rounded-full border px-0 transition-all duration-300 hover:w-full hover:px-3 ${
              darkMode ? "border-white/10 bg-white/10" : "border-black/10 bg-black/5"
            }`}
          >
            <span className="flex h-11 w-11 flex-none items-center justify-center">
              {darkMode ? (
                <Sun
                  size={18}
                  className="text-[#f5d36d] transition duration-500 group-hover:rotate-180"
                />
              ) : (
                <Moon
                  size={18}
                  className="text-[#1d1d1f] transition duration-500 group-hover:-rotate-12"
                />
              )}
            </span>

            <span
              className={`pointer-events-none whitespace-nowrap rounded-full px-1 text-sm font-semibold leading-none opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                darkMode ? "text-white" : "text-[#1d1d1f]"
              }`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
