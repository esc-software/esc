import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle, Trash2 } from "lucide-react";
import { content as t } from "@/content";

const BASE = import.meta.env.VITE_CHATBOT_BASE_URL;

type Entity = { type: string; value: string };
type Msg = {
  role: "bot" | "user";
  text: string;
  intent?: string;
  entities?: Entity[];
  lang?: string;
  blocked?: boolean;
  error?: string;
};

/** Floating chat widget. Talks to the API at `VITE_CHATBOT_BASE_URL` (see docs/ARCHITECTURE.md for the contract). */
const FloatingChat = () => {
  const { chat } = t;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "bot", text: chat.greeting }]);

  const [input, setInput] = useState("");
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const clearChat = async () => {
    await fetch(`${BASE}/clear`, { method: "POST" });
    setMessages([{ role: "bot", text: chat.greeting }]);
  };

  const send = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");

    setMessages((m) => [...m, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch(`${BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userText }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();

      if (data.blocked) {
        setMessages((m) => [
          ...m,
          {
            role: "bot",
            text: chat.blocked,
            blocked: true,
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          {
            role: "bot",
            text: data.response || chat.noResponse,
            intent: data.intent,
            entities: data.entities?.length ? data.entities : undefined,
            lang: data.lang,
          },
        ]);
      }
    } catch {
      setMessages((m) => [...m, { role: "bot", text: chat.connectionError, error: "connection" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        aria-label={chat.ariaLabel}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full backdrop-blur-md flex items-center justify-center text-foreground/70 hover:text-black hover:bg-white/55 border border-white/30 bg-transparent transition-all duration-300"
      >
        {open ? <X size={20} strokeWidth={1.5} /> : <MessageCircle size={20} strokeWidth={1.5} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-20 right-8 z-50 w-72 glass-panel rounded-md overflow-hidden flex flex-col"
            style={{ maxHeight: "420px", border: "1px solid rgb(255 255 255 / 16%)" }}
            initial={{ opacity: 0, y: 16, scale: 0.95, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0)" }}
            exit={{ opacity: 0, y: 16, scale: 0.95, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <p className="title-chat text-center text-sm">{chat.title}</p>
              <button
                onClick={clearChat}
                className="text-white/30 hover:text-white transition-colors"
                title={chat.clear}
                aria-label={chat.clear}
              >
                <Trash2 size={14} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ maxHeight: "260px" }}>
              {messages.map((msg, i) => (
                <div key={i}>
                  <motion.div
                    className={`text-chat text-[11px] leading-relaxed p-2.5 max-w-[88%] font-normal rounded-md ${
                      msg.role === "bot"
                        ? "bg-zinc-100/60 text-black"
                        : "bg-zinc-100/60 text-black ml-auto"
                    }`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-1 flex-wrap">{msg.text}</div>

                    {msg.lang && msg.lang !== "en" && (
                      <div className="text-[9px] text-white/40 mt-1 uppercase">{msg.lang}</div>
                    )}

                    {msg.entities && msg.entities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {msg.entities.map((e, j) => (
                          <span key={j} className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded">
                            {e.type}: {e.value}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
              {loading && (
                <div className="text-chat text-[11px] text-white/70 px-2">{chat.thinking}</div>
              )}
              <div ref={messagesEnd} />
            </div>

            <div className="p-3 border-t border-white/20 flex gap-2 items-center">
              <input
                className="text-chat flex-1 bg-transparent text-[11px] text-foreground placeholder:text-white/50 outline-none font-light"
                placeholder={chat.placeholder}
                aria-label={chat.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <button
                onClick={send}
                disabled={loading}
                aria-label={chat.send}
                className="text-white/30 hover:text-silver-bright transition-colors duration-300 disabled:opacity-30"
              >
                <Send size={14} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
