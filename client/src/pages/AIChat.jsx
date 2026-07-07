import { useState, useRef, useEffect } from "react";
import { chatWithAI } from "../services/ai";


const SUGGESTED_PROMPTS = [
  "I've been feeling anxious about exams",
  "Help me understand why I can't sleep",
  "I need to vent about something",
  "Give me a simple breathing exercise",
];

const CHAT_HISTORY = [
  { id: 1, title: "Feeling overwhelmed at work", date: "Today" },
  { id: 2, title: "Trouble sleeping this week", date: "Yesterday" },
  { id: 3, title: "Exam anxiety check-in", date: "2 days ago" },
  { id: 4, title: "Just needed to vent", date: "Last week" },
];

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef(null);
 

 

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  


  const [loading, setLoading] = useState(false);
  const sendMessage = async (text = input) => {
  if (!text.trim()) return;

  const userMessage = {
    id: Date.now(),
    role: "user",
    content: text,
  };

  setMessages((prev) => [...prev, userMessage]);

  setInput("");
  setIsTyping(true);

  try {
    const res = await chatWithAI(
      text,
    );

    const aiMessage = {
      id: Date.now() + 1,
      role: "ai",
      content: res.data.reply,
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (err) {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        role: "ai",
        content: "Sorry, something went wrong.",
      },
    ]);
  }

  setIsTyping(false);
};
const handleSubmit = (e) => {
  e.preventDefault();
  sendMessage();
};
  return (
    <div className="h-screen w-full flex bg-[#faf9fc] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white border-r border-black/[0.06] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="p-4 border-b border-black/[0.06]">
          <button
            onClick={() => {
              setMessages([]);
              setSidebarOpen(false);
            }}
            className="w-full py-2.5 rounded-xl text-white font-semibold text-sm bg-gradient-to-br from-[#a78bfa] to-[#f472b6] shadow-[0_6px_16px_-6px_rgba(167,139,250,0.6),inset_0_1px_1px_rgba(255,255,255,0.35)] transition hover:-translate-y-0.5"
          >
            + New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="px-2 py-1.5 text-xs font-semibold text-[#a29cb3] uppercase tracking-wide">
            Recent
          </p>
          {CHAT_HISTORY.map((chat) => (
            <button
              key={chat.id}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#faf9fc] transition group"
            >
              <p className="text-sm font-medium text-[#2d2a3d] truncate group-hover:text-[#2d2a3d]">
                {chat.title}
              </p>
              <p className="text-xs text-[#a29cb3] mt-0.5">{chat.date}</p>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-black/[0.06]">
          <div className="flex items-center gap-2 px-2 py-2 rounded-xl bg-amber-50 border border-amber-100">
            <span className="text-amber-500 text-sm">⚠</span>
            <p className="text-xs text-amber-700 leading-snug">
              Not a substitute for professional help. In crisis, call iCall:{" "}
              <span className="font-semibold">+91 9152987821</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/20 lg:hidden"
        />
      )}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center gap-3 px-4 sm:px-6 py-3.5 bg-white border-b border-black/[0.06]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#faf9fc]"
            aria-label="Open chat history"
          >
            <span className="text-[#2d2a3d]">☰</span>
          </button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#a78bfa] to-[#f472b6] flex items-center justify-center text-white text-sm font-bold shadow-[0_6px_14px_-4px_rgba(167,139,250,0.5)]">
            S
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2d2a3d]">Sukoon AI</p>
            <p className="text-xs text-[#7a7488] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Here to listen
            </p>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#a78bfa] to-[#f472b6] flex items-center justify-center text-white text-2xl font-bold mb-5 shadow-[0_12px_28px_-10px_rgba(167,139,250,0.5)]">
                S
              </div>
              <h1 className="text-xl font-semibold text-[#2d2a3d] mb-2">
                What's on your mind today?
              </h1>
              <p className="text-sm text-[#7a7488] mb-8 leading-relaxed">
                Talk it through, no judgment. Everything here is just between us.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="text-left px-4 py-3 rounded-xl bg-white border border-black/[0.06] text-sm text-[#2d2a3d] shadow-[0_8px_20px_-14px_rgba(167,139,250,0.4)] transition hover:-translate-y-0.5 hover:border-[#a78bfa]/30"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#f472b6] flex items-center justify-center text-white text-xs font-bold mr-2.5 mt-0.5 shrink-0">
                      S
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                        ? "bg-gradient-to-br from-[#a78bfa] to-[#f472b6] text-white rounded-br-sm shadow-[0_8px_20px_-10px_rgba(167,139,250,0.5)]"
                        : "bg-white text-[#2d2a3d] border border-black/[0.06] rounded-bl-sm shadow-[0_8px_20px_-16px_rgba(45,42,61,0.15)]"
                      }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#f472b6] flex items-center justify-center text-white text-xs font-bold mr-2.5 shrink-0">
                    S
                  </div>
                  <div className="bg-white border border-black/[0.06] rounded-2xl rounded-bl-sm px-4 py-3 shadow-[0_8px_20px_-16px_rgba(45,42,61,0.15)]">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 sm:px-6 pb-5 pt-2">
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto flex items-end gap-2.5 bg-white rounded-2xl border border-black/[0.08] shadow-[0_10px_30px_-18px_rgba(167,139,250,0.4)] p-2"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              rows={1}
              placeholder="Type how you're feeling..."
              className="flex-1 resize-none bg-transparent px-3 py-2 text-sm text-[#2d2a3d] placeholder:text-[#a29cb3] outline-none max-h-32"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-[#a78bfa] to-[#f472b6] shadow-[0_6px_14px_-4px_rgba(167,139,250,0.55)] transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
              aria-label="Send message"
            >
              ↑
            </button>
          </form>
          <p className="text-center text-xs text-[#a29cb3] mt-2.5">
            Sukoon AI can be wrong. For emergencies, contact a professional.
          </p>
        </div>
      </div>
    </div>
  );
}