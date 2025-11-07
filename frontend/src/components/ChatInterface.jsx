import React, { useState } from "react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    try {
      const response = await fetch(`${API_URL}/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.reply || "No response" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to backend." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">AI Chat Portal 💬</h2>
      <div className="h-96 overflow-y-auto border rounded-lg p-3 mb-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg w-fit max-w-[75%] ${
              msg.sender === "user"
                ? "ml-auto bg-blue-100 text-right"
                : "mr-auto bg-gray-200 text-left"
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && (
          <div className="text-gray-500 text-sm italic">AI is thinking...</div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-grow border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
