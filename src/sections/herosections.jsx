import React, { useEffect, useRef } from "react";

export default function HeroSections() {
  const iframeRef = useRef(null);
  const videoShellRef = useRef(null);
  const youtubeOrigin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost";
  const youtubeSrc = `https://www.youtube.com/embed/_-AS5DtDeqs?si=_EaDwMg1hA-jWZIk&enablejsapi=1&origin=${encodeURIComponent(
    youtubeOrigin,
  )}&autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=0&iv_load_policy=3&cc_load_policy=0&fs=0&disablekb=1`;

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
      if (event.origin !== "https://www.youtube.com") return;

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
  }, []);

  return (
    <section id="hero" className="apple-hero apple-hero--overlay">
      <div className="apple-hero__content">
        <div className="apple-hero__copy">
          <p className="apple-hero__eyebrow">iPhone 17 Pro Max</p>

          <h1 className="apple-hero__title">Hello, Apple Intelligence.</h1>

          <div className="apple-hero__actions">
            <a href="#design" className="apple-hero__button apple-hero__button--primary">
              Learn more
            </a>
            <a href="#buy" className="apple-hero__button apple-hero__button--secondary">
              Buy
            </a>
          </div>
        </div>
      </div>

      <div className="apple-hero__video" ref={videoShellRef}>
        <iframe
          ref={iframeRef}
          src={youtubeSrc}
          title="YouTube video player"
          allow="autoplay; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  );
}
