import { Models } from '@/app/types';
import { ChatMessage } from './ChatMessage';
import { Separator } from '@/components/ui/separator';
import { ArtifactMessagePartData } from '@/lib/utils';
import { Message } from 'ai';
import { RefObject } from 'react';

type Props = {
  messages: Message[];
  setCurrentArtifact: (data: ArtifactMessagePartData) => void;
  containerRef: RefObject<HTMLDivElement>;
};

export function ChatMessageList({
  messages,
  setCurrentArtifact,
  containerRef,
}: Props) {
  return (
    <div
      ref={containerRef}
      className="flex-1 space-y-6 py-8"
    >
      {messages.map((message, index) => (
        <div key={message.id}>
          <ChatMessage
            role={message.role}
            model={Models.claude}
            text={message.content}
            attachments={message.experimental_attachments || []}
            setCurrentArtifact={setCurrentArtifact}
          />
          {index < messages.length - 1 && (
            <Separator className="my-6 bg-gray-800" />
          )}
        </div>
      ))}
    </div>
  );
}