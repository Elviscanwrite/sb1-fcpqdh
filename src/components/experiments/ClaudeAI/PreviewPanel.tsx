import { Card } from '@/components/ui/card';
import { Message } from './types';
import { CodeBlock } from '@/components/markdown/code-block';

interface PreviewPanelProps {
  messages: Message[];
}

export function PreviewPanel({ messages }: PreviewPanelProps) {
  const codeMessages = messages.filter(msg => 
    msg.role === 'assistant' && msg.content.includes('```')
  );

  return (
    <Card className="w-[500px] flex flex-col bg-black border-gray-800">
      <div className="border-b border-gray-800 p-4">
        <h3 className="font-medium text-white">Generated Content</h3>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {codeMessages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            Start a conversation to see generated content
          </div>
        ) : (
          <div className="space-y-4">
            {codeMessages.map(msg => {
              const codeMatch = msg.content.match(/```(\w+)?\n([\s\S]+?)```/);
              if (codeMatch) {
                return (
                  <div key={msg.id} className="bg-gray-800 rounded-lg overflow-hidden">
                    <CodeBlock
                      language={codeMatch[1] || 'plaintext'}
                      value={codeMatch[2].trim()}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </Card>
  );
}