import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Focus,
  Palette,
  ShieldCheck,
  Smartphone,
  ThermometerSun,
  Zap,
} from "lucide-react";

const colors = [
  { id: "orange", label: "Cosmic Orange", swatch: "#ff6b1a", image: "/color_orange-removebg-preview.webp" },
  { id: "blue", label: "Deep Blue", swatch: "#394b63", image: "/color_blue.webp" },
  { id: "silver", label: "Silver", swatch: "#d9d9d6", image: "/color_silver-removebg-preview.webp" },
];

const features = [
  {
    id: "colors",
    label: "Colors",
    icon: Palette,
    accent: "#ff7a1a",
    description: "Choose from three bold finishes. iPhone 17 Pro Max shown in Silver.",
  },
  {
    id: "unibody",
    label: "Aluminum unibody",
    icon: Box,
    accent: "#6ea8ff",
    image: "/Aluminum_unibody-removebg-preview.webp",
    description:
      "Optimized for performance and all-day battery life. The aluminum alloy unibody is remarkably light and exceptionally effective at conducting heat.",
  },
  {
    id: "vapor",
    label: "Vapor chamber",
    icon: ThermometerSun,
    accent: "#4dd7ff",
    image: "/Vapor_chamber-removebg-preview.webp",
    description:
      "Deionized water sealed inside moves heat away from the A19 Pro chip, enabling even higher sustained performance on iPhone 17 Pro Max.",
  },
  {
    id: "shield",
    label: "Ceramic Shield",
    icon: ShieldCheck,
    accent: "#b6a0ff",
    image: "/Ceramic_Shield.-removebg-preview.webp",
    description:
      "Ceramic Shield protects the back of iPhone 17 Pro Max with 4x better resistance to cracks, while Ceramic Shield 2 on the front delivers 3x better scratch resistance.",
  },
  {
    id: "display",
    label: "Immersive pro display",
    icon: Smartphone,
    accent: "#ff70b8",
    image: "/Immersive_pro_display.-removebg-preview.webp",
    description:
      "Our best-ever 6.9-inch Super Retina XDR display. Brighter, with better anti-reflection and ProMotion technology up to 120Hz.",
  },
  {
    id: "camera-control",
    label: "Camera Control",
    icon: Focus,
    accent: "#ffd166",
    image: "/camera_control__gl7rgu1l9066_large_2x-removebg-preview.webp",
    description:
      "Instantly take a photo, record video, adjust settings, and more — so you never miss a moment.",
  },
  {
    id: "action",
    label: "Action button",
    icon: Zap,
    accent: "#ff8a3d",
    image: "/actionbutton.webp",
    description:
      "A customizable fast track to your favorite feature. Long press to launch Silent mode, Translation, Shortcuts, and more.",
  },
];

export default function DesignSection({ darkMode }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeColor, setActiveColor] = useState("silver");
  const [direction, setDirection] = useState("next");
  const [isVisible, setIsVisible] = useState(false);

  const activeFeature = features[activeIndex];
  const activeColorData = colors.find((color) => color.id === activeColor);
  const activeImage = activeFeature.id === "colors" ? activeColorData.image : activeFeature.image;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          return;
        }

        setActiveIndex(0);
        setActiveColor("silver");
        setDirection("previous");
      },
      { threshold: 0.14 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const selectFeature = (index) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? "next" : "previous");
    setActiveIndex(index);
  };

  return (
    <section
      id="design"
      ref={sectionRef}
      className={`relative z-[2] min-h-screen overflow-hidden px-4 pb-10 pt-24 transition-colors duration-500 sm:px-8 sm:pb-12 sm:pt-28 lg:px-12 ${
        darkMode ? "bg-black text-white" : "bg-[#f5f5f7] text-[#1d1d1f]"
      }`}
    >
      <div className="relative mx-auto max-w-[1500px]">
        <div
          className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-5 text-center">
            <p className={`inline-flex rounded-full border px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] shadow-lg backdrop-blur-xl ${darkMode ? "border-white/15 bg-white/10 text-white" : "border-black/10 bg-white/80 text-[#1d1d1f]"}`}>
              Design
            </p>
          </div>
          <h2 className={`mx-auto max-w-5xl animate-[appleGradient_7s_ease-in-out_infinite] bg-[length:220%_220%] bg-clip-text text-center text-4xl font-semibold tracking-[-0.04em] text-transparent sm:text-5xl lg:text-6xl ${darkMode ? "bg-[linear-gradient(100deg,#fff_0%,#8fc5ff_22%,#c8afff_48%,#ff9dca_72%,#ffd39b_88%,#fff_100%)]" : "bg-[linear-gradient(100deg,#111_0%,#0071e3_25%,#7b61ff_50%,#ff5fa2_75%,#111_100%)]"}`}>
            Innovation in every detail.
          </h2>
        </div>

        <div className="relative mt-10 min-h-[680px] sm:mt-12 lg:min-h-[720px]">
          <div className="pointer-events-none absolute right-[-5%] top-[43%] z-0 h-[82%] w-[82%] -translate-y-1/2 max-lg:right-[-15%] max-lg:w-[100%] max-md:right-[-30%] max-md:top-[40%] max-md:h-[64%] max-md:w-[130%]">
            <div
              key={`${activeFeature.id}-${activeColor}`}
              className={`absolute inset-0 ${
                direction === "next"
                  ? "animate-[designSlideNext_750ms_cubic-bezier(0.22,1,0.36,1)_both]"
                  : "animate-[designSlidePrevious_750ms_cubic-bezier(0.22,1,0.36,1)_both]"
              }`}
            >
              <img
                src={activeImage}
                alt={`${activeFeature.label} on iPhone 17 Pro Max`}
                className="h-full w-full object-contain object-center drop-shadow-[0_28px_50px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>

          <div className="relative z-30 grid min-h-[680px] items-start gap-6 lg:min-h-[720px] lg:grid-cols-[285px_minmax(0,1fr)] xl:grid-cols-[315px_minmax(0,1fr)]">
            <div className="relative z-40 flex w-full max-w-[420px] flex-col items-start gap-2.5">
              {features.map((feature, index) => {
                const isActive = index === activeIndex;
                const isColors = feature.id === "colors";
                const isExpanded = isActive && !isColors;
                const FeatureIcon = feature.icon;

                return (
                  <div
                    key={feature.id}
                    className={`w-full transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                    }`}
                    style={{ transitionDelay: isVisible ? `${180 + index * 90}ms` : "0ms" }}
                  >
                    <div
                      className={`group relative overflow-hidden border backdrop-blur-xl transition-[background-color,border-color,box-shadow,transform] duration-300 ${
                        isExpanded
                          ? `z-50 h-[146px] w-full rounded-[26px] shadow-[0_16px_34px_rgba(0,0,0,0.13)] lg:w-[calc(100%+90px)] ${
                              darkMode ? "border-white/15 bg-[#242426]/95" : "border-black/10 bg-white/95"
                            }`
                          : `z-30 h-[62px] rounded-full ${isActive ? "w-full" : "w-[90%] hover:translate-x-1"} ${
                              darkMode
                                ? `${isActive ? "border-white/15" : "border-transparent"} bg-[#1d1d1f]/92 hover:bg-[#28282a]`
                                : `${isActive ? "border-black/10" : "border-transparent"} bg-[#e8e8ed]/92 hover:bg-[#dedee3]`
                            }`
                      }`}
                    >
                      <span
                        className={`absolute inset-y-3 left-0 w-1 rounded-r-full transition-all duration-500 ${
                          isActive ? "opacity-100" : "scale-y-50 opacity-35 group-hover:scale-y-100 group-hover:opacity-75"
                        }`}
                        style={{ backgroundColor: feature.accent }}
                      />

                      <button
                        type="button"
                        onClick={() => selectFeature(index)}
                        aria-current={isActive ? "true" : undefined}
                        className={`h-[62px] w-full min-w-0 items-center gap-3.5 px-5 text-left ${
                          isColors && isActive ? "pr-32" : ""
                        } ${isExpanded ? "hidden" : "flex"}`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-[transform,background-color,box-shadow] duration-500 group-hover:rotate-[-4deg] group-hover:scale-110 ${
                            darkMode ? "border-white/10 bg-white/[0.06]" : "border-black/10 bg-white/70"
                          }`}
                          style={{
                            color: feature.accent,
                            boxShadow: isActive ? `0 0 20px ${feature.accent}35` : "none",
                          }}
                        >
                          <FeatureIcon size={20} strokeWidth={1.9} />
                        </span>

                        <span className="truncate text-base font-semibold xl:text-lg">{feature.label}</span>
                      </button>

                      <div className={`absolute inset-0 ${isExpanded ? "block" : "hidden"}`}>
                        <FeatureIcon
                          size={68}
                          strokeWidth={1.3}
                          className="pointer-events-none absolute -right-2 -top-2 opacity-[0.08]"
                          style={{ color: feature.accent }}
                        />
                        <p className={`line-clamp-5 px-5 py-4 text-[15px] leading-6 sm:text-base ${darkMode ? "text-white/78" : "text-black/68"}`}>
                          <strong className={darkMode ? "font-semibold text-white" : "font-semibold text-[#1d1d1f]"}>
                            {feature.label}.{" "}
                          </strong>
                          {feature.description}
                        </p>
                      </div>

                      {isColors && isActive && (
                        <div className="absolute right-4 top-[15px] z-10 flex items-center gap-2">
                          {colors.map((color) => (
                            <button
                              key={color.id}
                              type="button"
                              title={color.label}
                              aria-label={`Show ${color.label}`}
                              onClick={() => {
                                const nextColor = colors.findIndex((item) => item.id === color.id);
                                const currentColor = colors.findIndex((item) => item.id === activeColor);
                                setDirection(nextColor >= currentColor ? "next" : "previous");
                                setActiveColor(color.id);
                              }}
                              className={`h-8 w-8 shrink-0 rounded-full border-2 transition duration-300 hover:scale-110 ${
                                activeColor === color.id
                                  ? `scale-110 ${darkMode ? "border-white" : "border-black"}`
                                  : darkMode
                                    ? "border-white/25"
                                    : "border-black/20"
                              }`}
                              style={{ backgroundColor: color.swatch }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div />
          </div>
        </div>
      </div>
    </section>
  );
}
