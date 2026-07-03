import React, { useEffect, useRef, useState } from "react";
import { BrainCircuit, Cpu, Gauge } from "lucide-react";

const performanceSlides = [
  {
    image: "/iPhone-17-Pro-Max-gaming-test.webp",
    label: "Console-class gaming",
    width: 1200,
    height: 675,
  },
  {
    image: "/a19-pro-chipset-.webp",
    label: "A19 Pro chip",
    width: 1600,
    height: 900,
  },
];

const performanceFeatures = [
  {
    icon: Cpu,
    title: "A19 Pro chip",
    description: "Apple silicon delivers exceptional speed and efficiency for the most demanding tasks.",
    accent: "#ff8a33",
  },
  {
    icon: Gauge,
    title: "Graphics and speed",
    description: "A powerful GPU and advanced thermal design sustain high performance for longer.",
    accent: "#ffb02e",
  },
  {
    icon: BrainCircuit,
    title: "Neural Accelerators",
    description: "Dedicated acceleration in every GPU core powers demanding AI and graphics workloads.",
    accent: "#ff6b35",
  },
];

export default function PerformanceSection({ darkMode, language }) {
  const sectionRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % performanceSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="performance"
      ref={sectionRef}
      className={`relative z-[2] min-h-screen overflow-hidden px-4 py-24 transition-colors duration-500 [contain-intrinsic-size:auto_1100px] [content-visibility:auto] sm:px-8 sm:py-28 lg:px-12 ${
        darkMode
          ? "bg-[radial-gradient(circle_at_50%_40%,#18130f_0%,#070707_42%,#000_75%)] text-white"
          : "bg-[radial-gradient(circle_at_50%_40%,#fff5eb_0%,#eeeef2_45%,#f7f7f9_78%)] text-[#1d1d1f]"
      }`}
    >
      <div className="relative mx-auto max-w-[1400px]">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#ff7a1a]">Performance</p>
          <h2 className={`mt-4 pb-[0.14em] animate-[appleGradient_7s_ease-in-out_infinite] bg-[length:240%_240%] bg-clip-text text-4xl font-semibold leading-[1.1] tracking-[-0.055em] text-transparent sm:text-6xl lg:text-7xl ${darkMode ? "bg-[linear-gradient(100deg,#fff_0%,#ffd39b_22%,#ff9b62_48%,#ffb6d9_72%,#fff_100%)]" : "bg-[linear-gradient(100deg,#111_0%,#d94f00_25%,#ff7a1a_52%,#7b61ff_78%,#111_100%)]"}`}>
            {language === "vi" ? "Một tầm cao mới" : "New dimensions"}
            <br />
            {language === "vi" ? "về sức mạnh." : "in power."}
          </h2>
          <p className={`mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${darkMode ? "text-white/62" : "text-black/60"}`}>
            {language === "vi" ? "Từ đồ họa chuyên sâu đến các tệp đa phương tiện dung lượng lớn, iPhone 17 Pro Max mang lại hiệu năng cực nhanh. A19 Pro, buồng hơi tiên tiến và thân nhôm nguyên khối phối hợp để duy trì tốc độ và kiểm soát nhiệt hiệu quả." : "From intensive graphics to massive media files, iPhone 17 Pro Max delivers blazing-fast performance. A19 Pro, an advanced vapor chamber, and the aluminum unibody work together to sustain speed while efficiently managing heat."}
          </p>
        </div>

        <div
          className={`relative mx-auto mt-14 min-h-[430px] w-full max-w-[1150px] transition-all delay-150 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] sm:min-h-[560px] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={() => setActiveSlide((current) => (current + 1) % performanceSlides.length)}
          onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setActiveSlide((current) => (current + 1) % performanceSlides.length); }}
          role="button"
          tabIndex={0}
          aria-label="Show next performance view"
        >
          {performanceSlides.map((slide, index) => (
            <img
              key={slide.image}
              src={slide.image}
              alt={index === activeSlide ? `${slide.label} on iPhone 17 Pro Max` : ""}
              aria-hidden={index !== activeSlide}
              width={slide.width}
              height={slide.height}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              className={`pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_35px_65px_rgba(0,0,0,0.3)] transition-[opacity,transform,filter] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                index === activeSlide
                  ? "animate-[performanceSlideIn_850ms_cubic-bezier(0.16,1,0.3,1)] scale-100 opacity-100 blur-0"
                  : "scale-[1.04] opacity-0 blur-sm"
              }`}
            />
          ))}

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-xl sm:bottom-6">
            {performanceSlides.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                onClick={(event) => { event.stopPropagation(); setActiveSlide(index); }}
                aria-label={`Show ${slide.label}`}
                aria-current={index === activeSlide ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  index === activeSlide ? "w-10 bg-[#ff8a33]" : "w-2.5 bg-white/40 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {performanceFeatures.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <article
                key={feature.title}
                className={`relative overflow-hidden border-t pt-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  darkMode ? "border-white/20" : "border-black/15"
                } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: `${350 + index * 120}ms` }}
              >
                <span
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07]"
                  style={{ color: feature.accent, boxShadow: `0 0 24px ${feature.accent}25` }}
                >
                  <FeatureIcon size={23} strokeWidth={1.8} />
                </span>
                <h3 className="text-lg font-semibold">{language === "vi" ? ["Chip A19 Pro", "Đồ họa và tốc độ", "Bộ tăng tốc Neural"][index] : feature.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${darkMode ? "text-white/55" : "text-black/55"}`}>
                  {language === "vi" ? ["Apple silicon mang lại tốc độ và hiệu quả vượt trội cho những tác vụ đòi hỏi cao nhất.", "GPU mạnh mẽ và thiết kế tản nhiệt tiên tiến duy trì hiệu năng cao lâu hơn.", "Khả năng tăng tốc chuyên dụng trong từng lõi GPU hỗ trợ các tác vụ AI và đồ họa nặng."][index] : feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
