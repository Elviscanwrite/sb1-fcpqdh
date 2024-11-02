import { Message } from './types';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { Bot } from 'lucide-react';

interface ChatPanelProps {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  isTyping: boolean;
}

export function ChatPanel({
  messages,
  input,
  setInput,
  handleSend,
  isTyping
}: ChatPanelProps) {
  return (
    <div className="flex-1 flex flex-col bg-black rounded-lg overflow-hidden border border-gray-800">
      <div className="bg-gray-900 border-b border-gray-800 p-4 flex items-center gap-2">
        <div className="h-3 w-3 bg-purple-500 rounded-full animate-pulse" />
        <Bot className="w-5 h-5 text-purple-400" />
        <span className="font-medium text-white">Claude AI Assistant</span>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <MessageList messages={messages} isTyping={isTyping} />
      </div>

      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        disabled={isTyping}
      />
    </div>
  );
}