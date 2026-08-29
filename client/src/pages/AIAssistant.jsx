import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { Send, Sparkles, Bot, User } from "lucide-react";

const suggestedPrompts = [
  "What is the closest star to Earth?",
  "Explain black holes in simple words.",
  "Tell me about the James Webb Space Telescope.",
  "How far is Mars from Earth?",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "👋 Hello! I'm HorizonX AI. Ask me anything about NASA, astronomy, planets, stars, black holes, galaxies, or space missions.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const send = async (text) => {
    const value = text ?? input;

    if (!value.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: value,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

   try {
  console.log("Sending message:", value);

  const response = await api.post("/ai/chat", {
    message: value,
  });

  console.log("SUCCESS");
  console.log(response);

  const aiMessage = {
    id: Date.now() + 1,
    role: "assistant",
    text: response.data.reply,
  };

  setMessages((prev) => [...prev, aiMessage]);
} catch (error) {
  console.log("ERROR OBJECT:", error);
  console.log("ERROR RESPONSE:", error.response);
  console.log("ERROR DATA:", error.response?.data);
  console.log("STATUS:", error.response?.status);

  setMessages((prev) => [
    ...prev,
    {
     id: Date.now(),
        role: "assistant",
        text: "🔒 Login required. Please register or login to use HorizonX AI.",
    },
  ]);
}
      
     finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col h-[calc(100vh-5rem)]">

      {/* Heading */}

      <div className="text-center mb-8">
        <p className="uppercase tracking-[0.3em] text-blue-400 text-xs">
          AI Assistant
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Ask <span className="text-blue-500">HorizonX AI</span>
        </h1>

        <p className="text-white/50 mt-3">
          Get answers about NASA, astronomy, planets and the universe.
        </p>
      </div>

      {/* Chat */}

      <div className="flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-[#111827]/60 backdrop-blur-lg p-6 space-y-5">

        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex items-start gap-3 max-w-[80%] ${
                message.role === "user"
                  ? "flex-row-reverse"
                  : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === "user"
                    ? "bg-blue-500"
                    : "bg-gray-700"
                }`}
              >
                {message.role === "user" ? (
                  <User size={18} />
                ) : (
                  <Bot size={18} />
                )}
              </div>

              <div
                className={`rounded-2xl px-5 py-3 text-sm leading-7 ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-800 text-gray-200 border border-white/10"
                }`}
              >
                {message.text}
              </div>
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="flex gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <Bot size={18} />
            </div>

            <div className="bg-gray-800 border border-white/10 rounded-2xl px-5 py-3 text-gray-300">
              Thinking...
            </div>
          </motion.div>
        )}

        <div ref={endRef} />
      </div>

      {/* Suggested Questions */}

      <div className="flex flex-wrap gap-2 mt-5">

        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => send(prompt)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm text-white/70 hover:bg-blue-500 hover:text-white transition"
          >
            <Sparkles size={14} />
            {prompt}
          </button>
        ))}

      </div>

      {/* Input */}

      <form
        className="flex gap-3 mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <input
          type="text"
          value={input}
          placeholder="Ask anything about space..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              e.preventDefault();
              send();
            }
          }}
          className="flex-1 rounded-xl border border-white/10 bg-[#111827] px-5 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-6 rounded-xl bg-blue-500 hover:bg-blue-600 transition disabled:opacity-50"
        >
          <Send className="text-white" size={18} />
        </button>
      </form>

    </div>
  );
}