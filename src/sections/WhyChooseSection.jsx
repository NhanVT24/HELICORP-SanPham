import React, { useEffect, useRef, useState } from "react";
import { BatteryCharging, Camera, Cpu, Layers3, ScanFace, Video } from "lucide-react";

const reasons = [
  { icon: Layers3, title: "Forged aluminum unibody", titleVi: "Nhôm nguyên khối rèn", detail: "A strong, lightweight enclosure designed around sustained performance.", detailVi: "Thiết kế cứng cáp, nhẹ và tối ưu cho hiệu năng bền bỉ.", metric: "Unibody", image: "/iphone-17-pro-unibody-3.webp", width: 1200, height: 695 },
  { icon: BatteryCharging, title: "All-day battery life", titleVi: "Pin dùng cả ngày", detail: "More time for video, games, and everything between charges.", detailVi: "Thêm thời gian cho video, trò chơi và mọi hoạt động trong ngày.", metric: "+17 hrs", image: "/OIP.webp", width: 474, height: 446 },
  { icon: Camera, title: "48MP Pro cameras", titleVi: "Camera Pro 48MP", detail: "A versatile Pro Fusion camera system across more focal lengths.", detailVi: "Hệ thống camera Pro Fusion linh hoạt ở nhiều tiêu cự hơn.", metric: "48MP", image: "/thong-so-iphone-17-pro-max-6.jpg", width: 1200, height: 800 },
  { icon: Cpu, title: "A19 Pro performance", titleVi: "Hiệu năng A19 Pro", detail: "Faster graphics with advanced thermal management for demanding work.", detailVi: "Đồ họa nhanh hơn cùng khả năng kiểm soát nhiệt cho tác vụ nặng.", metric: "A19 Pro", image: "/a19pro.webp", width: 474, height: 259 },
  { icon: ScanFace, title: "Center Stage camera", titleVi: "Camera Center Stage", detail: "Flexible framing that keeps every face naturally in view.", detailVi: "Khung hình linh hoạt, tự nhiên giữ mọi khuôn mặt trong tầm nhìn.", metric: "18MP", image: "/centercamera.webp", width: 1200, height: 675 },
  { icon: Video, title: "Pro video recording", titleVi: "Quay video Pro", detail: "Capture smooth, high-detail 4K Dolby Vision video.", detailVi: "Ghi lại video 4K Dolby Vision mượt mà và giàu chi tiết.", metric: "4K 120", image: "/pro video.webp", width: 474, height: 266 },
];

export default function WhyChooseSection({ darkMode, language }) {
  const vi = language === "vi";
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="why" ref={sectionRef} className={`relative z-[2] overflow-hidden px-4 py-24 [contain-intrinsic-size:auto_1100px] [content-visibility:auto] sm:px-8 sm:py-28 lg:px-12 ${darkMode ? "bg-[#101012] text-white" : "bg-[#ececf0] text-[#1d1d1f]"}`}>
      <div className="mx-auto max-w-[1400px]">
        <div className={`mx-auto max-w-4xl text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <p className={`text-sm font-bold uppercase tracking-[.18em] ${darkMode ? "text-white/48" : "text-black/45"}`}>{vi ? "Vì sao nên chọn" : "Why choose iPhone 17 Pro Max"}</p><h2 className={`mx-auto mt-4 pb-[0.14em] animate-[appleGradient_7s_ease-in-out_infinite] bg-[length:240%_240%] bg-clip-text text-4xl font-semibold leading-[1.12] tracking-[-.055em] text-transparent sm:text-6xl lg:text-7xl ${darkMode ? "bg-[linear-gradient(100deg,#fff_0%,#b7d7ff_18%,#d6b4ff_48%,#ffb6d9_70%,#ffd39b_86%,#fff_100%)]" : "bg-[linear-gradient(100deg,#111_0%,#0071e3_24%,#7b61ff_50%,#ff5fa2_76%,#111_100%)]"}`}>{vi ? "Mạnh mẽ hơn trong từng trải nghiệm." : "More pro in every experience."}</h2>
        </div>
        <p className={`mx-auto mt-7 max-w-2xl text-center text-lg font-medium leading-relaxed transition-all delay-100 duration-1000 ${darkMode ? "text-white/52" : "text-black/52"} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>{vi ? "Sáu ưu điểm nổi bật giúp iPhone 17 Pro Max mạnh mẽ, linh hoạt và sẵn sàng cho mọi trải nghiệm." : "Six standout advantages that make iPhone 17 Pro Max more powerful, versatile, and ready for everything."}</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return <article key={reason.title} style={{ transitionDelay: `${180 + index * 80}ms` }} className={`group relative min-h-[310px] overflow-hidden rounded-[28px] border p-7 transition-[opacity,transform,background-color,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"} ${darkMode ? "border-white/[.07] bg-black" : "border-black/[.07] bg-white"}`}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff9f0a]/65 to-transparent" />
              <div className={`absolute -bottom-16 -right-12 h-56 w-56 rounded-full blur-3xl transition duration-500 group-hover:scale-125 ${index % 2 ? "bg-[#ff8a33]/10" : "bg-[#0071e3]/10"}`} />
              {reason.image && <img src={reason.image} alt="" width={reason.width} height={reason.height} loading="lazy" decoding="async" fetchPriority="low" className="pointer-events-none absolute left-1/2 top-[78px] h-[44%] w-[82%] -translate-x-1/2 object-contain object-center opacity-75 transition duration-500 group-hover:-translate-x-1/2 group-hover:scale-105 group-hover:opacity-95" />}
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-5"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[.07] text-[#ff9f0a]"><Icon size={24} /></span><span className="text-3xl font-semibold tracking-[-.05em] opacity-90">{reason.metric}</span></div>
                <div className="mt-auto pt-16"><h3 className="text-xl font-semibold">{vi ? reason.titleVi : reason.title}</h3><p className={`mt-3 text-sm leading-relaxed ${darkMode ? "text-white/48" : "text-black/50"}`}>{vi ? reason.detailVi : reason.detail}</p></div>
              </div>
              {/* Add a future card image by setting reason.image above. */}
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
