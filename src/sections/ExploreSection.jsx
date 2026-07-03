import React, { useEffect, useRef, useState } from "react";
import { Box, Check, Cpu, Focus, Maximize2, Smartphone, ThermometerSun } from "lucide-react";

const models = [
  {
    name: "iPhone 16 Pro Max",
    badge: "Previous generation",
    badgeVi: "Thế hệ trước",
    src: "https://sketchfab.com/models/41a071ae12794b668502f58d1e0fd1a3/embed?autostart=1&ui_infos=0&ui_theme=dark&transparent=1",
    link: "https://sketchfab.com/3d-models/iphone-16-pro-max-41a071ae12794b668502f58d1e0fd1a3",
    author: "MajdyModels",
    authorLink: "https://sketchfab.com/MG990",
  },
  {
    name: "iPhone 17 Pro Max",
    badge: "New generation",
    badgeVi: "Thế hệ mới",
    src: "https://sketchfab.com/models/66809964eff043a39d553c3795995008/embed?autostart=1&ui_infos=0&ui_theme=dark&transparent=1",
    link: "https://sketchfab.com/3d-models/phone-17-pro-max-66809964eff043a39d553c3795995008",
    author: "Ranguel",
    authorLink: "https://sketchfab.com/Ranguel",
  },
];

const comparisonRows = [
  { icon: Cpu, label: "Chip", labelVi: "Chip", old: "A18 Pro", next: "A19 Pro" },
  { icon: Box, label: "Enclosure", labelVi: "Khung máy", old: "Titanium design", oldVi: "Thiết kế titan", next: "Aluminum unibody", nextVi: "Nhôm nguyên khối" },
  { icon: ThermometerSun, label: "Thermal system", labelVi: "Hệ thống tản nhiệt", old: "Graphite thermal design", oldVi: "Tản nhiệt graphite", next: "Vapor chamber", nextVi: "Buồng hơi" },
  { icon: Focus, label: "Pro camera", labelVi: "Camera Pro", old: "48MP Fusion system", next: "48MP Pro Fusion system" },
  { icon: Maximize2, label: "Total zoom range", labelVi: "Phạm vi zoom tổng thể", old: "Up to 10×", oldVi: "Đến 10×", next: "Up to 16×", nextVi: "Đến 16×" },
  { icon: Smartphone, label: "Display", labelVi: "Màn hình", old: "6.9-inch Super Retina XDR", next: "6.9-inch Super Retina XDR" },
];

function ModelView({ model, darkMode, language, featured }) {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef(null);
  return (
    <div>
      <div className="flex items-center justify-between gap-4 px-1 pb-5">
        <div><p className={`text-xs font-bold uppercase tracking-[.15em] ${featured ? "text-[#ff8a33]" : "opacity-45"}`}>{language === "vi" ? model.badgeVi : model.badge}</p><h3 className="mt-1.5 text-xl font-semibold tracking-[-.03em] sm:text-2xl">{model.name}</h3></div>
        {featured && <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ff8a33] text-white"><Check size={18} /></span>}
      </div>
      <div className="relative aspect-[4/3] min-h-[340px] overflow-hidden sm:min-h-[430px]" onPointerLeave={() => iframeRef.current?.blur()}>
        {!loaded && <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_center,#343434,#111_68%)]" aria-hidden="true"><div className="absolute left-1/2 top-1/2 h-44 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-white/10 bg-white/5" /></div>}
        <iframe
          ref={iframeRef}
          title={`${model.name} interactive 3D model`}
          src={model.src}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/55 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl">{language === "vi" ? "Kéo để xoay • Cuộn để thu phóng" : "Drag to rotate • Scroll to zoom"}</span>
      </div>
    </div>
  );
}

export default function ExploreSection({ darkMode, language }) {
  const vi = language === "vi";
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
      if (!entry.isIntersecting && document.activeElement?.tagName === "IFRAME" && section.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    }, { threshold: 0.08 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="explore" ref={sectionRef} className={`relative z-[2] overflow-hidden px-4 py-24 [contain-intrinsic-size:auto_1500px] [content-visibility:auto] sm:px-8 sm:py-28 lg:px-12 ${darkMode ? "bg-[radial-gradient(circle_at_50%_15%,#21140d_0%,#080808_32%,#030303_75%)] text-white" : "bg-[radial-gradient(circle_at_50%_15%,#fff1e8_0%,#f1f1f5_38%,#f8f8fa_75%)] text-[#1d1d1f]"}`}>
      <div className="mx-auto max-w-[1400px]">
        <div className={`mx-auto max-w-4xl text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <p className={`text-sm font-bold uppercase tracking-[.18em] ${darkMode ? "text-white/48" : "text-black/45"}`}>{vi ? "So sánh tương tác" : "Interactive comparison"}</p>
          <h2 className={`mt-4 pb-[0.14em] animate-[appleGradient_7s_ease-in-out_infinite] bg-[length:240%_240%] bg-clip-text text-4xl font-semibold leading-[1.12] tracking-[-.055em] text-transparent sm:text-6xl lg:text-7xl ${darkMode ? "bg-[linear-gradient(100deg,#fff_0%,#b7d7ff_18%,#d6b4ff_48%,#ffb6d9_70%,#ffd39b_86%,#fff_100%)]" : "bg-[linear-gradient(100deg,#111_0%,#0071e3_24%,#7b61ff_50%,#ff5fa2_76%,#111_100%)]"}`}>{vi ? "Hai thế hệ. Một bước tiến lớn." : "Two generations. One big leap."}</h2>
          <p className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${darkMode ? "text-white/58" : "text-black/55"}`}>{vi ? "Khám phá từng góc cạnh trong không gian 3D, sau đó đối chiếu những thay đổi quan trọng giữa iPhone 16 Pro Max và iPhone 17 Pro Max." : "Explore every angle in 3D, then compare the key changes between iPhone 16 Pro Max and iPhone 17 Pro Max."}</p>
        </div>

        <div className={`mt-16 overflow-x-auto pb-3 transition-all delay-150 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}>
          <div className={`min-w-[760px] overflow-hidden border-y border-[#f5a623]/60 shadow-[0_0_45px_rgba(245,166,35,.08)] ${darkMode ? "bg-black/15" : "bg-white/35"}`}>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#ff8a33] to-transparent" />

            <div className="grid grid-cols-2 divide-x divide-[#f5a623]/55">
              {models.map((model, index) => (
                <div key={model.name} className="min-w-0 overflow-hidden p-7 xl:p-10">
                  <ModelView model={model} darkMode={darkMode} language={language} featured={index === 1} />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 divide-x divide-[#f5a623]/55 border-t border-[#f5a623]/55">
              {models.map((model, modelIndex) => {
                const featured = modelIndex === 1;
                return <div key={`${model.name}-profile`} className="min-w-0 px-7 py-9 xl:px-10">
                  <div className="mb-5 border-b border-[#f5a623]/35 pb-5">
                    <div><p className={`text-xs font-bold uppercase tracking-[.16em] ${featured ? "text-[#ff8a33]" : darkMode ? "text-[#f5c66d]/65" : "text-[#a86500]/65"}`}>{vi ? "Thông tin chính" : "Product profile"}</p><h3 className="mt-2 text-2xl font-semibold tracking-[-.04em]">{model.name}</h3></div>
                  </div>

                  {comparisonRows.map((row) => {
                    const Icon = row.icon;
                    const value = modelIndex === 0 ? (vi && row.oldVi ? row.oldVi : row.old) : (vi && row.nextVi ? row.nextVi : row.next);
                    return <div key={row.label} className="group flex items-center gap-4 border-b border-[#f5a623]/20 py-5 last:border-0">
                      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition duration-300 group-hover:scale-105 ${featured ? "bg-[#ff8a33]/12 text-[#ff8a33]" : "bg-[#f5a623]/10 text-[#d99416]"}`}><Icon size={20} /></span>
                      <div className="min-w-0 flex-1"><p className={`text-xs font-medium uppercase tracking-[.12em] ${darkMode ? "text-white/38" : "text-black/40"}`}>{vi ? row.labelVi : row.label}</p><p className="mt-1 text-base font-semibold sm:text-lg">{value}</p></div>
                    </div>;
                  })}
                </div>;
              })}
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#f5a623] to-transparent" />
          </div>
        </div>

      </div>
    </section>
  );
}
