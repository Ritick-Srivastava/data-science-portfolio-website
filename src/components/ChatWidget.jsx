import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Mic, MicOff } from "lucide-react";
import { streamChat } from "../lib/nimClient";
import ChatMessage from "./ui/ChatMessage";

const SUGGESTED = [
  "What does Ritick do at HackerRank?",
  "What are his biggest wins?",
  "What tools & skills does he use?",
  "Tell me something personal about him",
];

const hasSpeechRecognition =
  typeof window !== "undefined" &&
  !!(window.SpeechRecognition || window.webkitSpeechRecognition);

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShowPulse(true), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  // Stop recording if widget closes
  useEffect(() => {
    if (!isOpen && isRecording) stopRecording();
  }, [isOpen]);

  const handleSend = useCallback(async (text) => {
    const userText = (text ?? input).trim();
    if (!userText || isStreaming) return;
    setInput("");

    const userMsg = { role: "user", content: userText };
    const historyWithUser = [...messages, userMsg];
    setMessages([...historyWithUser, { role: "assistant", content: "", streaming: true }]);
    setIsStreaming(true);

    try {
      let full = "";
      for await (const chunk of streamChat(historyWithUser)) {
        full += chunk;
        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: full, streaming: true };
          return next;
        });
      }
      setMessages(prev => {
        const next = [...prev];
        next[next.length - 1] = { role: "assistant", content: full, streaming: false };
        return next;
      });
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => {
        const next = [...prev];
        next[next.length - 1] = {
          role: "assistant",
          content: `Error: ${err.message}`,
          streaming: false,
        };
        return next;
      });
    }

    setIsStreaming(false);
  }, [input, messages, isStreaming]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsRecording(false);
  };

  const handleMicToggle = () => {
    if (isRecording) {
      stopRecording();
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsRecording(false);
      recognitionRef.current = null;
      // auto-send whatever was transcribed
      setInput((current) => {
        if (current.trim()) {
          setTimeout(() => handleSend(current.trim()), 0);
        }
        return "";
      });
    };

    recognition.onerror = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.25, 0.4, 0.25, 1] }}
            className="w-[380px] max-w-[calc(100vw-48px)] flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0f]/95 backdrop-blur-xl shadow-2xl shadow-black/60"
            style={{ height: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-heading font-bold text-white">
                  R
                </div>
                <div>
                  <p className="text-sm font-heading font-semibold text-white/90">Ask about Ritick</p>
                  <p className="text-[10px] font-body text-white/25">Powered by NVIDIA NIM</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer p-1 text-white/25 transition-colors hover:text-white/60"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 min-h-0">
              {messages.length === 0 && (
                <div className="flex flex-col gap-3">
                  <p className="text-center text-xs font-body text-white/25">
                    Ask about Ritick's work, skills, or journey — type or speak.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTED.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSend(q)}
                        className="cursor-pointer rounded-full border border-white/[0.09] px-3 py-1.5 text-xs font-body text-white/40 transition-all hover:border-white/20 hover:bg-white/[0.04] hover:text-white/70"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <ChatMessage
                  key={i}
                  role={msg.role}
                  content={msg.content}
                  isStreaming={msg.streaming}
                />
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex shrink-0 items-center gap-2 border-t border-white/[0.06] px-3 py-3">
              {hasSpeechRecognition && (
                <button
                  onClick={handleMicToggle}
                  disabled={isStreaming}
                  title={isRecording ? "Stop recording" : "Speak your question"}
                  className={`relative cursor-pointer rounded-xl p-2 transition-all disabled:cursor-not-allowed disabled:opacity-30
                    ${isRecording
                      ? "border border-rose-500/40 bg-rose-500/15 text-rose-400"
                      : "border border-white/[0.07] bg-white/[0.03] text-white/30 hover:border-white/15 hover:text-white/60"
                    }`}
                >
                  {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
                  {isRecording && (
                    <span className="absolute inset-0 rounded-xl animate-ping bg-rose-500/20" />
                  )}
                </button>
              )}
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={isStreaming || isRecording}
                placeholder={isRecording ? "Listening..." : "Ask something..."}
                className="flex-1 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-sm font-body text-white/80 placeholder:text-white/20 focus:border-indigo-500/40 focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isStreaming}
                className="cursor-pointer rounded-xl border border-indigo-500/25 bg-indigo-500/15 p-2 text-indigo-400 transition-all hover:bg-indigo-500/25 hover:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        whileHover={{ scale: 1.04 }}
        className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 font-heading text-sm font-medium backdrop-blur-xl shadow-lg shadow-black/40 transition-all duration-300
          ${isOpen
            ? "border-white/[0.14] bg-[#0a0a0f]/90 text-white/80"
            : showPulse
            ? "border-indigo-500/30 bg-[#0a0a0f]/90 text-white/70 shadow-indigo-500/10"
            : "border-white/[0.1] bg-[#0a0a0f]/90 text-white/60"
          }`}
      >
        <MessageCircle size={15} className="text-indigo-400" />
        {isOpen ? "Close" : "Ask about Ritick"}
      </motion.button>
    </div>
  );
}
