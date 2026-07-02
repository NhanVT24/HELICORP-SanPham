import React, { useEffect, useRef, useState } from "react";

const cameraSlides = [
  {
    image: "/iPhone_17_pro_max_camera-1-removebg-preview.webp",
    label: "48MP Main",
    width: 671,
    height: 372,
  },
  {
    image: "/yeqLy2FcV3GcCycuTx6zVZ-removebg-preview.webp",
    label: "Pro telephoto",
    width: 666,
    height: 375,
  },
  {
    image: "/iphone-17-pro-512gb-2-removebg-preview.webp",
    label: "Ultra Wide",
    width: 666,
    height: 375,
  },
];

export default function CameraSection({ darkMode }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const videoShellRef = useRef(null);
  const shouldPlayVideoRef = useRef(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const youtubeOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
  const cameraVideoSrc = `https://www.youtube-nocookie.com/embed/h6CwwHyQxKI?enablejsapi=1&origin=${encodeURIComponent(
    youtubeOrigin,
  )}&autoplay=1&mute=1&playsinline=1&controls=0&disablekb=1&fs=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0`;

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % cameraSlides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const iframe = videoRef.current;
    const shell = videoShellRef.current;
    if (!iframe || !shell) return undefined;

    const postCommand = (func) => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args: [] }),
        "*",
      );
    };

    const handlePlayerMessage = (event) => {
      if (
        event.origin !== "https://www.youtube-nocookie.com" &&
        event.origin !== "https://www.youtube.com"
      ) {
        return;
      }

      let message = event.data;
      if (typeof message === "string") {
        try {
          message = JSON.parse(message);
        } catch {
          return;
        }
      }

      if (message?.event === "onReady") {
        postCommand("mute");
        postCommand(shouldPlayVideoRef.current ? "playVideo" : "pauseVideo");
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldPlay = entry.isIntersecting && entry.intersectionRatio >= 0.45;
        shouldPlayVideoRef.current = shouldPlay;
        postCommand(shouldPlay ? "playVideo" : "pauseVideo");
      },
      { threshold: [0, 0.45, 0.75] },
    );

    window.addEventListener("message", handlePlayerMessage);
    observer.observe(shell);

    return () => {
      observer.disconnect();
      window.removeEventListener("message", handlePlayerMessage);
      postCommand("pauseVideo");
    };
  }, []);

  return (
    <section
      id="camera"
      ref={sectionRef}
      className={`relative z-[2] min-h-screen overflow-hidden px-4 pb-20 pt-4 transition-colors duration-500 [contain-intrinsic-size:auto_900px] [content-visibility:auto] sm:px-8 sm:pb-24 sm:pt-6 lg:px-12 ${
        darkMode
          ? "bg-[radial-gradient(circle_at_center,#1c1c1f_0%,#0a0a0b_46%,#020202_100%)] text-white"
          : "bg-[radial-gradient(circle_at_center,#d9d9df_0%,#eeeeF2_48%,#f7f7f9_100%)] text-[#1d1d1f]"
      }`}
    >
      <div className="relative mx-auto max-w-[1500px]">
        <div className={`mb-2 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
          <p className={`inline-flex rounded-full border px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] shadow-lg backdrop-blur-xl ${darkMode ? "border-white/15 bg-white/10 text-white" : "border-black/10 bg-white/80 text-[#1d1d1f]"}`}>
            Camera
          </p>
        </div>

      <div
        className={`grid min-h-[600px] items-center gap-8 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] lg:grid-cols-2 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        <div
          className="relative min-h-[510px] lg:min-h-[560px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {cameraSlides.map((slide, index) => (
            <img
              key={slide.image}
              src={slide.image}
              alt={index === activeSlide ? `${slide.label} camera view` : ""}
              aria-hidden={index !== activeSlide}
              width={slide.width}
              height={slide.height}
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              className={`pointer-events-none absolute left-1/2 top-1/2 h-auto w-[112%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_28px_55px_rgba(0,0,0,0.24)] transition-[opacity,transform,filter] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                index === activeSlide
                  ? "scale-100 opacity-100 blur-0"
                  : "scale-[1.06] opacity-0 blur-sm"
              }`}
            />
          ))}

          <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-xl">
            {cameraSlides.map((slide, index) => (
              <button
                key={slide.label}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show ${slide.label}`}
                aria-current={index === activeSlide ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  index === activeSlide ? "w-9 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <p className="absolute bottom-7 left-4 rounded-full bg-black/35 px-3 py-2 text-sm font-semibold tracking-[0.08em] text-white backdrop-blur-xl sm:left-8">
            {cameraSlides[activeSlide].label}
          </p>
        </div>

        <div className="max-w-xl lg:pl-4">
          <h2 className={`animate-[appleGradient_7s_ease-in-out_infinite] bg-[length:240%_240%] bg-clip-text text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-transparent [text-shadow:0_2px_18px_rgba(255,255,255,0.12)] sm:text-5xl lg:text-6xl ${darkMode ? "bg-[linear-gradient(100deg,#fff_0%,#b7d7ff_18%,#9bbcff_34%,#d6b4ff_50%,#ffb6d9_66%,#ffd39b_82%,#fff_100%)]" : "bg-[linear-gradient(100deg,#111_0%,#0071e3_25%,#7b61ff_50%,#ff5fa2_75%,#111_100%)]"}`}>
            A pro camera system. At every focal length.
          </h2>
          <p className={`mt-7 text-lg leading-relaxed sm:text-xl ${darkMode ? "text-white/65" : "text-black/60"}`}>
            The iPhone 17 Pro Max features a 48MP Pro Fusion triple-camera system with advanced telephoto, ultra-wide, and main sensors, offering up to 16x total optical zoom and enhanced low-light performance.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              ["48MP", "Pro Fusion"],
              ["16×", "Total zoom"],
              ["3", "Pro lenses"],
            ].map(([value, label]) => (
              <div
                key={value}
                className={`rounded-2xl border p-4 ${
                  darkMode ? "border-white/10 bg-white/[0.06]" : "border-black/10 bg-white/70"
                }`}
              >
                <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{value}</p>
                <p className={`mt-1 text-xs sm:text-sm ${darkMode ? "text-white/50" : "text-black/50"}`}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

        <div
          className={`mt-16 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          }`}
        >
          <div className="mb-7 text-center">
            <p className={`text-sm font-bold uppercase tracking-[0.16em] ${darkMode ? "text-white/48" : "text-black/45"}`}>
              Shot on iPhone 17 Pro Max
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              See the pro camera in action.
            </h3>
          </div>

          <div
            ref={videoShellRef}
            className={`relative aspect-video overflow-hidden rounded-[34px] border bg-black shadow-[0_32px_90px_rgba(0,0,0,0.25)] ${
              darkMode ? "border-white/10" : "border-black/10"
            }`}
          >
            <iframe
              ref={videoRef}
              src={cameraVideoSrc}
              title="iPhone 17 Pro Max camera video"
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              className="pointer-events-none absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>

        <div
          className={`mt-20 grid items-center gap-10 transition-all delay-150 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] lg:grid-cols-[0.85fr_1.15fr] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-xl lg:pr-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#ff8a33]">Front camera</p>
            <h3 className={`mt-4 animate-[appleGradient_7s_ease-in-out_infinite] bg-[length:240%_240%] bg-clip-text text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-transparent sm:text-6xl ${darkMode ? "bg-[linear-gradient(100deg,#fff_0%,#b7d7ff_24%,#d6b4ff_50%,#ffb6d9_74%,#fff_100%)]" : "bg-[linear-gradient(100deg,#111_0%,#0071e3_25%,#7b61ff_50%,#ff5fa2_75%,#111_100%)]"}`}>
              Center Stage keeps every face in frame.
            </h3>
            <p className={`mt-6 text-lg leading-relaxed ${darkMode ? "text-white/62" : "text-black/60"}`}>
              The 18MP Center Stage front camera gives you more flexible ways to frame photos and video. It automatically adjusts the field of view for group shots, keeps you centered on calls, and captures beautifully stabilized 4K HDR video.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["18MP", "Center Stage", "4K HDR"].map((item) => (
                <span
                  key={item}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                    darkMode ? "border-white/10 bg-white/[0.06]" : "border-black/10 bg-white/70"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[520px] sm:min-h-[680px]">
            <img
              src="/camerafront-removebg-preview.webp"
              alt="iPhone 17 Pro Max Center Stage front camera"
              width="500"
              height="499"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              className="pointer-events-none absolute left-1/2 top-1/2 h-auto w-[92%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.28)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
