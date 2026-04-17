export default function ChatMessage({ role, content, isStreaming }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm font-body leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-gradient-to-br from-indigo-500/25 to-violet-600/15 border border-indigo-500/20 text-white/90 rounded-br-sm"
            : "bg-white/[0.04] border border-white/[0.07] border-l-2 border-l-indigo-500/40 text-white/70 rounded-bl-sm"
        }`}
      >
        {content}
        {isStreaming && (
          <span className="inline-block w-0.5 h-3.5 bg-indigo-400/80 ml-0.5 align-middle animate-pulse" />
        )}
      </div>
    </div>
  );
}
