import React, { useEffect, useRef, useState } from "react";

export default function HeroSections({ darkMode, language }) {
  const iframeRef = useRef(null);
  const videoShellRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const youtubeOrigin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost";
  const youtubeSrc = `https://www.youtube-nocookie.com/embed/_-AS5DtDeqs?enablejsapi=1&origin=${encodeURIComponent(
    youtubeOrigin,
  )}&autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=0&iv_load_policy=3&cc_load_policy=0&fs=0&disablekb=1`;

  useEffect(() => {
    const loadVideo = () => setShouldLoadVideo(true);
    const events = ["pointerdown", "keydown", "touchstart"];
    events.forEach((eventName) => window.addEventListener(eventName, loadVideo, { once: true, passive: true }));

    return () => {
      events.forEach((eventName) => window.removeEventListener(eventName, loadVideo));
    };
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    const shell = videoShellRef.current;
    if (!iframe || !shell) return undefined;

    const postCommand = (func) => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func,
          args: [],
        }),
        "*",
      );
    };

    const hideCaptions = () => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "setOption",
          args: ["captions", "track", {}],
        }),
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

      if (message?.event === "onReady") hideCaptions();
    };

    window.addEventListener("message", handlePlayerMessage);
    const captionTimers = [600, 1600, 3200].map((delay) =>
      window.setTimeout(hideCaptions, delay),
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          postCommand("playVideo");
          return;
        }

        postCommand("pauseVideo");
      },
      { threshold: [0, 0.5, 1] },
    );

    observer.observe(shell);

    return () => {
      observer.disconnect();
      window.removeEventListener("message", handlePlayerMessage);
      captionTimers.forEach((timer) => window.clearTimeout(timer));
      postCommand("pauseVideo");
    };
  }, [shouldLoadVideo]);

  return (
    <section
      id="hero"
      className={`relative z-[1] grid min-h-screen place-items-center overflow-hidden px-4 transition-colors duration-500 sm:px-6 ${darkMode ? "bg-black" : "bg-[#f5f5f7]"}`}
    >
      <div className="relative z-[2] grid w-full max-w-[1100px] justify-items-center gap-9 pt-[clamp(5.375rem,7vh,6rem)] max-md:gap-[22px]">
        <div className="grid justify-items-center gap-6 rounded-[28px] bg-black/[0.015] px-9 pb-6 pt-7 text-center shadow-[0_12px_36px_rgba(0,0,0,0.07),0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-[2px] max-md:gap-5 max-md:px-[18px] max-md:pb-[18px] max-md:pt-[22px]">
          <p className="m-0 animate-[appleFadeUp_700ms_ease_forwards] text-[clamp(1.05rem,1.7vw,1.4rem)] font-bold leading-[1.3] tracking-[0.01em] text-white opacity-0 [text-shadow:0_2px_14px_rgba(0,0,0,0.55),0_0_28px_rgba(0,113,227,0.16)]">
            iPhone 17 Pro Max
          </p>

          <h1
            className={`m-0 animate-[appleGradient_7s_ease-in-out_infinite] whitespace-nowrap rounded-[20px] bg-[length:240%_240%] px-5 pb-3.5 pt-2.5 text-[clamp(2.1rem,3.6vw,3.55rem)] font-extrabold uppercase leading-[1.16] tracking-[0.035em] [background-clip:text] [text-shadow:0_2px_18px_rgba(255,255,255,0.22),0_0_36px_rgba(0,113,227,0.18)] [word-spacing:0.12em] [-webkit-background-clip:text] max-md:whitespace-normal max-md:px-3 max-md:pb-3 max-md:pt-2 max-md:text-[clamp(1.8rem,8.5vw,3.15rem)] max-md:tracking-[0.02em] ${
              darkMode
                ? "bg-[linear-gradient(100deg,#fff_0%,#b7d7ff_18%,#9bbcff_34%,#d6b4ff_50%,#ffb6d9_66%,#ffd39b_82%,#fff_100%)] text-transparent"
                : "bg-[linear-gradient(100deg,#fff_0%,#8fc5ff_22%,#c8afff_48%,#ff9dca_72%,#fff_100%)] text-transparent"
            }`}
          >
            Hello, Apple Intelligence.
          </h1>

          <p
            className="m-0 max-w-2xl animate-[appleFadeUp_750ms_ease_380ms_forwards] text-[clamp(0.95rem,1.35vw,1.1rem)] font-medium leading-relaxed tracking-[0.01em] text-white/75 opacity-0 [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]"
          >
            {language === "vi" ? "Được tạo ra để thấu hiểu, đồng hành sáng tạo và khiến mỗi ngày trở nên nhẹ nhàng hơn." : "Built to understand you, create with you, and make every day feel effortless."}
          </p>

          <div className="mt-2 flex animate-[appleFadeUp_750ms_ease_600ms_forwards] flex-wrap justify-center gap-4 opacity-0">
            <a href="#design" className="inline-flex h-12 min-w-[132px] items-center justify-center rounded-full bg-[#f5a623] px-7 text-[0.98rem] font-extrabold text-[#111] shadow-[0_16px_38px_rgba(245,166,35,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffb83d]">
              {language === "vi" ? "Tìm hiểu thêm" : "Learn more"}
            </a>
            <a href="#order" className="inline-flex h-12 min-w-[132px] items-center justify-center rounded-full border border-white/20 bg-black/15 px-7 text-[0.98rem] font-extrabold text-white backdrop-blur-xl transition duration-200 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:bg-black/25">
              {language === "vi" ? "Mua ngay" : "Buy"}
            </a>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 animate-[appleVideoIn_900ms_cubic-bezier(0.22,1,0.36,1)_780ms_forwards] overflow-hidden bg-black bg-cover bg-center opacity-0 [background-image:linear-gradient(rgba(0,0,0,.18),rgba(0,0,0,.18)),url('/thumnail.jpg')] [mask-image:linear-gradient(to_bottom,#000_0%,#000_90%,rgba(0,0,0,0.82)_94%,transparent_100%)] [transform:scale(1.3)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_90%,rgba(0,0,0,0.82)_94%,transparent_100%)]"
        ref={videoShellRef}
      >
        {!shouldLoadVideo && <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_center,#292929,#050505_65%)]" aria-hidden="true" />}
        {shouldLoadVideo && (
          <iframe
            ref={iframeRef}
            src={youtubeSrc}
            title="YouTube video player"
            allow="autoplay; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            className="pointer-events-none absolute left-1/2 top-1/2 block h-[63vw] min-h-[112vh] w-[112vw] min-w-[199.12vh] -translate-x-1/2 -translate-y-1/2 animate-[appleFadeUp_500ms_ease_forwards] border-0 opacity-0"
          />
        )}
      </div>
    </section>
  );
}
