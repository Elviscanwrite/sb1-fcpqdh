import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Message } from './types';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[80%] rounded-lg p-3 ${
        message.role === 'user' 
          ? 'bg-purple-600 text-white' 
          : 'bg-gray-800 text-gray-100'
      }`}>
        <div className="flex items-start gap-2">
          {message.role === 'assistant' && (
            <Bot className="w-5 h-5 mt-1 text-purple-400" />
          )}
          <div>
            {message.content}
            <div className="text-xs opacity-50 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
          {message.role === 'user' && (
            <User className="w-5 h-5 mt-1 text-purple-200" />
          )}
        </div>
      </div>
    </motion.div>
  );
}