import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center">
        <Bot className="w-4 h-4 text-purple-300" />
      </div>
      <div className="flex-1 rounded-lg p-4 bg-gray-800">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-gray-400"
        >
          Claude is typing...
        </motion.div>
      </div>
    </motion.div>
  );
}