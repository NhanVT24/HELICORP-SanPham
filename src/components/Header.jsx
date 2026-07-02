import React, { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";

const navItems = [
  { id: "hero", label: "Overview" },
  { id: "design", label: "Design" },
  { id: "camera", label: "Camera" },
  { id: "performance", label: "Performance" },
  { id: "explore", label: "Explore" },
];

export default function Header({ darkMode, onToggleTheme, activeId }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shellClass = darkMode
    ? scrolled
      ? "border-white/10 bg-black/55 shadow-[0_10px_35px_rgba(0,0,0,.38)]"
      : "border-white/10 bg-black/40"
    : scrolled
    ? "border-black/10 bg-white/65 shadow-[0_14px_40px_rgba(0,0,0,.12)]"
    : "border-black/10 bg-white/45 shadow-[0_12px_32px_rgba(0,0,0,.08)]";

  const textClass = darkMode ? "text-white" : "text-[#1d1d1f]";
  const subTextClass = darkMode ? "text-white/58" : "text-[#6e6e73]";

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 sm:px-5">
      <div
        className={`relative mx-auto flex h-16 max-w-7xl items-center justify-between rounded-[28px] border backdrop-blur-3xl transition-[background-color,border-color,box-shadow] duration-500 ${shellClass}`}
      >
        <a
          href="#hero"
          className={`ml-4 flex items-center gap-3 rounded-2xl px-2 py-1 lg:w-64 ${textClass}`}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center">
            <img
              src={darkMode ? "/white-removebg-preview.png" : "/black-removebg-preview.png"}
              alt="Apple mark"
              className="h-full w-full object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,.18)]"
            />
          </span>

          <div className="hidden leading-tight sm:block">
            <p className={`text-[15px] font-semibold tracking-tight ${textClass}`}>
              iPhone 17 Pro Max
            </p>
            <p className={`text-[11px] ${subTextClass}`}>Apple</p>
          </div>
        </a>

        <nav
          aria-label="Product navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full p-1 lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "page" : undefined}
              className={`rounded-full px-5 py-2.5 text-[15px] font-semibold transition-all duration-300 ${
                activeId === item.id
                  ? darkMode
                    ? "bg-white text-black shadow-[0_8px_22px_rgba(0,0,0,0.16)]"
                    : "bg-[#1d1d1f] text-white shadow-[0_8px_22px_rgba(0,0,0,0.16)]"
                  : darkMode
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-[#1d1d1f]/80 hover:bg-black/5 hover:text-[#1d1d1f]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mr-3 flex shrink-0 items-center justify-end gap-2 sm:mr-4 lg:w-64">
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden ${
              darkMode ? "border-white/10 bg-white/10 text-white" : "border-black/10 bg-black/5 text-[#1d1d1f]"
            }`}
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>

          <div className="relative h-11 w-11 sm:w-[8.75rem]">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className={`absolute inset-0 flex h-11 w-full items-center justify-center gap-2 rounded-full border px-0 transition-colors duration-300 sm:px-3 ${
                darkMode ? "border-white/10 bg-white/10" : "border-black/10 bg-black/5"
              }`}
            >
              <span className="flex shrink-0 items-center justify-center">
                {darkMode ? (
                  <Sun
                    size={18}
                    className="text-[#f5d36d] transition duration-500 hover:rotate-180"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="text-[#1d1d1f] transition duration-500 hover:-rotate-12"
                  />
                )}
              </span>

              <span
                className={`pointer-events-none hidden whitespace-nowrap text-sm font-semibold leading-none sm:block ${
                  darkMode ? "text-white" : "text-[#1d1d1f]"
                }`}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </div>
        </div>

        <nav
          aria-label="Mobile product navigation"
          className={`absolute left-0 top-[4.75rem] grid w-full gap-1 rounded-[24px] border p-2 backdrop-blur-3xl transition-all duration-200 lg:hidden ${
            darkMode ? "border-white/10 bg-black/90" : "border-black/10 bg-[#e8e8ed]/95"
          } ${mobileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileOpen(false)}
              aria-current={activeId === item.id ? "page" : undefined}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                activeId === item.id
                  ? darkMode ? "bg-white text-black" : "bg-[#1d1d1f] text-white"
                  : darkMode ? "text-white/80 hover:bg-white/10" : "text-[#1d1d1f]/80 hover:bg-black/5"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
