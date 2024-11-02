import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${
        message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        message.role === 'assistant' ? 'bg-purple-900' : 'bg-blue-900'
      }`}>
        {message.role === 'assistant' ? (
          <Bot className="w-4 h-4 text-purple-300" />
        ) : (
          <User className="w-4 h-4 text-blue-300" />
        )}
      </div>
      <div className={`flex-1 rounded-lg p-4 ${
        message.role === 'assistant' ? 'bg-gray-800' : 'bg-purple-900'
      }`}>
        <p className="text-sm text-gray-100">{message.content}</p>
        <span className="text-xs text-gray-500 mt-2 block">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </motion.div>
  );
}