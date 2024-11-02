import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export default function ClaudeAI() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = {
        role: 'assistant' as const,
        content: `I understand you said: "${input}". As an experimental AI assistant, I aim to provide helpful and informative responses while maintaining clear ethical boundaries.`
      };
      setMessages(prev => [...prev, assistantMessage]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-purple-600 text-white p-4">
        <h2 className="text-xl font-bold">Claude AI Assistant Experiment</h2>
        <p className="text-sm opacity-90">Test the AI assistant's capabilities in natural conversation</p>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0">
                <Bot className="h-8 w-8 rounded-full bg-purple-100 p-1 text-purple-600" />
              </div>
            )}
            <div
              className={`rounded-lg p-3 max-w-[80%] ${
                message.role === 'assistant'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-purple-600 text-white'
              }`}
            >
              {message.content}
            </div>
            {message.role === 'user' && (
              <div className="flex-shrink-0">
                <User className="h-8 w-8 rounded-full bg-purple-100 p-1 text-purple-600" />
              </div>
            )}
          </motion.div>
        ))}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gray-500"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Claude is thinking...</span>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Claude anything..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </div>
      </form>
    </div>
  );
}