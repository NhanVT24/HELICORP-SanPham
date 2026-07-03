import React, { useEffect, useRef, useState } from "react";
import { Bot, Check, ChevronRight, MessageCircle, Send, Sparkles, X } from "lucide-react";

const initialForm = { name: "", email: "", phone: "", color: "Cosmic Orange", storage: "256GB", note: "" };

function AIAdvisor({ darkMode, language }) {
  const vi = language === "vi";
  const welcome = vi ? "Xin chào! Mình có thể giúp bạn chọn màu, dung lượng hoặc giải đáp về iPhone 17 Pro Max." : "Hi! I can help you choose a color, storage size, or answer questions about iPhone 17 Pro Max.";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: welcome }]);
  const listRef = useRef(null);
  useEffect(() => setMessages([{ role: "assistant", content: welcome }]), [welcome]);
  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }); }, [messages, loading]);

  const send = async (event) => {
    event?.preventDefault();
    const value = input.trim();
    if (!value || loading) return;
    const nextMessages = [...messages, { role: "user", content: value }];
    setMessages(nextMessages); setInput(""); setLoading(true);
    try {
      const configuredValue = import.meta.env.VITE_AI_CHAT_ENDPOINT?.trim();
      const openAIKey = import.meta.env.VITE_OPENAI_API_KEY?.trim() || (configuredValue?.startsWith("sk-") ? configuredValue : "");
      const geminiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim() || (configuredValue && !configuredValue.startsWith("http") && !configuredValue.startsWith("sk-") ? configuredValue : "");
      const backendEndpoint = configuredValue?.startsWith("http") ? configuredValue : "";
      const conversationInput = nextMessages.filter((_, index) => index > 0);
      const advisorInstruction = `You are a friendly iPhone 17 Pro Max sales consultant.
Always answer in the same language as the user's latest message, regardless of the interface language.
Known product information for this demo:
- Starting price: 37,990,000 VND. Always quote this price in VND, never in US dollars.
- Available finishes: Cosmic Orange, Deep Blue, and Silver.
- Storage choices: 256GB, 512GB, 1TB, and 2TB.
- Key features: A19 Pro, forged aluminum unibody, vapor chamber, 48MP Pro Fusion camera system, 18MP Center Stage front camera, and 4K 120 fps Dolby Vision video.
Keep answers concise, complete, and helpful. Never leave a sentence unfinished. If information is not listed above, clearly say it needs confirmation instead of inventing an answer.`;
      const conciseInstruction = `${advisorInstruction}\nAnswer directly in no more than 2 short sentences and 60 words. Do not add a greeting or marketing filler unless the user greets first.`;
      if (!openAIKey && !geminiKey && !backendEndpoint) {
        await new Promise((resolve) => setTimeout(resolve, 650));
        setMessages([...nextMessages, { role: "assistant", content: vi ? "Đây đang là chế độ demo. Hãy cấu hình VITE_AI_CHAT_ENDPOINT để kết nối trợ lý OpenAI từ backend." : "This is demo mode. Configure VITE_AI_CHAT_ENDPOINT to connect the OpenAI assistant through your backend." }]);
      } else if (geminiKey) {
        const model = import.meta.env.VITE_GEMINI_MODEL || "gemini-3.5-flash";
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": geminiKey },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: conciseInstruction }] },
            contents: conversationInput.map(({ role, content }) => ({ role: role === "assistant" ? "model" : "user", parts: [{ text: content }] })),
            generationConfig: { maxOutputTokens: 1200, thinkingConfig: { thinkingLevel: "minimal" } },
          }),
        });
        if (!response.ok) { const error = await response.json().catch(() => ({})); throw new Error(error?.error?.message || "Gemini request failed"); }
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();
        setMessages([...nextMessages, { role: "assistant", content: reply || (vi ? "Mình chưa nhận được nội dung phản hồi." : "I didn't receive a response message.") }]);
      } else if (openAIKey) {
        const response = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${openAIKey}` },
          body: JSON.stringify({
            model: import.meta.env.VITE_OPENAI_MODEL || "gpt-5.4-nano",
            instructions: conciseInstruction,
            input: conversationInput.map(({ role, content }) => ({ role, content })),
            max_output_tokens: 800,
          }),
        });
        if (!response.ok) { const error = await response.json().catch(() => ({})); throw new Error(error?.error?.message || "OpenAI request failed"); }
        const data = await response.json();
        const reply = data.output_text || data.output?.flatMap((item) => item.content || []).find((item) => item.type === "output_text")?.text;
        setMessages([...nextMessages, { role: "assistant", content: reply || (vi ? "Mình chưa nhận được nội dung phản hồi." : "I didn't receive a response message.") }]);
      } else {
        const response = await fetch(backendEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: nextMessages, language, systemInstruction: advisorInstruction }) });
        if (!response.ok) throw new Error("Advisor request failed");
        const data = await response.json();
        setMessages([...nextMessages, { role: "assistant", content: data.reply || data.output_text || (vi ? "Mình chưa nhận được nội dung phản hồi." : "I didn't receive a response message.") }]);
      }
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown error";
      setMessages([...nextMessages, { role: "assistant", content: vi ? `Chưa thể kết nối trợ lý: ${detail}` : `The advisor is unavailable: ${detail}` }]);
    } finally { setLoading(false); }
  };

  return <div className="fixed bottom-5 right-5 z-[80]">
    <div aria-hidden={!open} className={`absolute bottom-[68px] right-0 flex h-[min(560px,75vh)] w-[min(390px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-[30px] border shadow-[0_28px_90px_rgba(0,0,0,.35)] backdrop-blur-3xl transition-[opacity,transform,visibility] duration-300 ease-out ${open ? "visible translate-y-0 scale-100 opacity-100" : "invisible pointer-events-none translate-y-3 scale-[.97] opacity-0"} ${darkMode ? "border-white/12 bg-[#111113]/94 text-white" : "border-black/10 bg-white/94 text-[#1d1d1f]"}`}>
      <div className="flex items-center justify-between border-b border-current/10 p-4"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#ff9f0a,#ff5e3a)] text-white"><Bot size={21} /></span><div><p className="font-semibold">AI Product Advisor</p><p className="text-xs text-emerald-500">{vi ? "Sẵn sàng tư vấn" : "Ready to help"}</p></div></div><button onClick={() => setOpen(false)} aria-label="Close AI advisor" className="rounded-full p-2 hover:bg-current/10"><X size={18} /></button></div>
      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">{messages.map((message, index) => <p key={index} className={`w-fit max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "ml-auto bg-[#0071e3] text-white" : darkMode ? "bg-white/[.08]" : "bg-black/[.05]"}`}>{message.content}</p>)}{loading && <p className={`w-fit rounded-2xl px-4 py-3 text-sm ${darkMode ? "bg-white/[.08]" : "bg-black/[.05]"}`}>•••</p>}</div>
      <form onSubmit={send} className="flex gap-2 border-t border-current/10 p-3"><input value={input} onChange={(event) => setInput(event.target.value)} placeholder={vi ? "Hỏi AI về sản phẩm..." : "Ask AI about the product..."} aria-label="Message AI advisor" className="min-w-0 flex-1 rounded-full border border-current/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[#ff8a33]" /><button disabled={loading} aria-label="Send message" className="grid h-10 w-10 place-items-center rounded-full bg-[#ff8a33] text-white disabled:opacity-50"><Send size={17} /></button></form>
    </div>
    <button onClick={() => setOpen((current) => !current)} className="ml-auto flex h-14 items-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff9f0a,#ff5e3a)] px-5 font-semibold text-white shadow-[0_16px_45px_rgba(255,122,26,.35)] transition hover:-translate-y-1" aria-label="Open AI product advisor">{open ? <X size={20} /> : <><Sparkles size={19} /><span>AI Advisor</span></>}</button>
  </div>;
}

export default function OrderSection({ darkMode, language }) {
  const vi = language === "vi";
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || !/^[+\d][\d\s.-]{7,}$/.test(form.phone)) return setStatus("invalid");
    setStatus("loading");
    try {
      const endpoint = import.meta.env.VITE_ORDER_WEBHOOK;
      if (endpoint) { const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, product: "iPhone 17 Pro Max", createdAt: new Date().toISOString() }) }); if (!response.ok) throw new Error(); }
      else { await new Promise((resolve) => setTimeout(resolve, 700)); localStorage.setItem("iphone-order-draft", JSON.stringify(form)); }
      setStatus("success"); setForm(initialForm);
    } catch { setStatus("error"); }
  };
  const inputClass = `h-12 w-full rounded-2xl border bg-white/[.045] px-4 outline-none transition placeholder:opacity-35 focus:border-[#ff8a33] ${darkMode ? "border-white/12" : "border-black/12"}`;
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return <>
    <section id="order" ref={sectionRef} className={`relative z-[2] overflow-hidden px-4 py-24 [contain-intrinsic-size:auto_850px] [content-visibility:auto] sm:px-8 sm:py-28 lg:px-12 ${darkMode ? "bg-black text-white" : "bg-[#f5f5f7] text-[#1d1d1f]"}`}>
      <div className="pointer-events-none absolute left-[8%] top-[10%] h-80 w-80 rounded-full bg-[#ff8a33]/20 blur-[120px]" /><div className="pointer-events-none absolute bottom-[5%] right-[8%] h-96 w-96 rounded-full bg-[#0071e3]/15 blur-[140px]" />
      <div className="relative mx-auto grid max-w-[1250px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}><p className={`text-sm font-bold uppercase tracking-[.18em] ${darkMode ? "text-white/48" : "text-black/45"}`}>{vi ? "Đặt hàng" : "Reserve yours"}</p><h2 className={`mt-4 pb-[0.14em] animate-[appleGradient_7s_ease-in-out_infinite] bg-[length:240%_240%] bg-clip-text text-4xl font-semibold leading-[1.12] tracking-[-.055em] text-transparent sm:text-6xl ${darkMode ? "bg-[linear-gradient(100deg,#fff_0%,#b7d7ff_18%,#d6b4ff_48%,#ffb6d9_70%,#ffd39b_86%,#fff_100%)]" : "bg-[linear-gradient(100deg,#111_0%,#0071e3_24%,#7b61ff_50%,#ff5fa2_76%,#111_100%)]"}`}>{vi ? "Sẵn sàng cho bước tiến tiếp theo?" : "Ready for your next big upgrade?"}</h2><p className={`mt-6 max-w-lg text-lg leading-relaxed ${darkMode ? "text-white/55" : "text-black/55"}`}>{vi ? "Để lại thông tin, lựa chọn phiên bản bạn yêu thích và đội ngũ tư vấn sẽ liên hệ với bạn." : "Share your details and preferred configuration. Our product team will get in touch with you."}</p><div className="mt-8 flex items-center gap-3 text-sm"><span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500/15 text-emerald-500"><Check size={17} /></span>{vi ? "Không thanh toán ở bước này" : "No payment is collected at this step"}</div></div>

        <form onSubmit={submit} noValidate className={`rounded-[34px] border p-5 shadow-[0_28px_100px_rgba(0,0,0,.18)] backdrop-blur-3xl transition-all delay-150 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"} ${darkMode ? "border-white/12 bg-white/[.055]" : "border-white/70 bg-white/45"}`}>
          <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">{vi ? "Họ và tên" : "Full name"}<input name="name" value={form.name} onChange={update} placeholder="Vo Thanh Nhan" className={`${inputClass} mt-2`} /></label><label className="text-sm font-medium">Email<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" className={`${inputClass} mt-2`} /></label><label className="text-sm font-medium">{vi ? "Số điện thoại" : "Phone number"}<input name="phone" value={form.phone} onChange={update} placeholder="+84 123 456 789" className={`${inputClass} mt-2`} /></label><label className="text-sm font-medium">{vi ? "Màu sắc" : "Finish"}<select name="color" value={form.color} onChange={update} className={`${inputClass} mt-2`}><option className="text-black">Cosmic Orange</option><option className="text-black">Deep Blue</option><option className="text-black">Silver</option></select></label><label className="text-sm font-medium sm:col-span-2">{vi ? "Dung lượng" : "Storage"}<select name="storage" value={form.storage} onChange={update} className={`${inputClass} mt-2`}><option className="text-black">256GB</option><option className="text-black">512GB</option><option className="text-black">1TB</option><option className="text-black">2TB</option></select></label><label className="text-sm font-medium sm:col-span-2">{vi ? "Ghi chú" : "Message"}<textarea name="note" value={form.note} onChange={update} rows="4" placeholder={vi ? "Bạn cần tư vấn thêm điều gì?" : "Anything else we should know?"} className={`${inputClass} mt-2 h-auto resize-none py-3`} /></label></div>
          <button disabled={status === "loading"} className="mt-5 flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff9f0a,#ff5e3a)] px-6 font-semibold text-white shadow-[0_14px_35px_rgba(255,122,26,.25)] transition hover:-translate-y-0.5 disabled:opacity-60">{status === "loading" ? (vi ? "Đang gửi..." : "Sending...") : <>{vi ? "Gửi yêu cầu" : "Request a callback"}<ChevronRight size={18} /></>}</button>
          <p className="mt-3 min-h-5 text-center text-sm" aria-live="polite">{status === "invalid" && (vi ? "Vui lòng kiểm tra họ tên, email và số điện thoại." : "Please check your name, email, and phone number.")}{status === "success" && (vi ? "Đã nhận yêu cầu. Chúng tôi sẽ sớm liên hệ!" : "Request received. We'll be in touch soon!")}{status === "error" && (vi ? "Chưa thể gửi yêu cầu. Vui lòng thử lại." : "We couldn't submit your request. Please try again.")}</p>
        </form>
      </div>
    </section>
    <AIAdvisor darkMode={darkMode} language={language} />
  </>;
}
