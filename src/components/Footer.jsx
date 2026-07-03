import React from "react";

export default function Footer({ darkMode, language }) {
  return (
    <footer className={`relative z-[2] border-t px-5 py-8 ${darkMode ? "border-white/10 bg-black text-white" : "border-black/10 bg-white text-[#1d1d1f]"}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="opacity-55">{language === "vi" ? "© 2026 Ý tưởng sản phẩm iPhone. Chỉ dùng cho mục đích trình diễn." : "© 2026 iPhone product concept. For demonstration purposes only."}</p>
        <div className="flex gap-5"><a className="opacity-60 hover:opacity-100" href="#hero">{language === "vi" ? "Đầu trang" : "Back to top"}</a><a className="opacity-60 hover:opacity-100" href="#explore">{language === "vi" ? "So sánh" : "Compare"}</a></div>
      </div>
    </footer>
  );
}
