import { useState } from 'react';
import { ChatPanel } from './ChatPanel';
import { PreviewPanel } from './PreviewPanel';
import { Message } from './types';
import { generateClaudeResponse } from './utils';

export default function ClaudeAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate Claude's response
    setTimeout(() => {
      const response = generateClaudeResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
        code: response.code,
        title: response.title
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Chat Panel */}
      <div className="flex-1 p-4">
        <ChatPanel
          messages={messages}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          isTyping={isTyping}
        />
      </div>

      {/* Preview Panel */}
      <div className="w-[500px] border-l border-gray-800 p-4">
        <PreviewPanel messages={messages} />
      </div>
    </div>
  );
}