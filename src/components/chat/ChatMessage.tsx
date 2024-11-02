import { Attachment, ChatMessageRoles, Models } from '@/app/types';
import { AttachmentPreviewButton } from './AttachmentPreviewButton';
import Markdown from '@/components/markdown/markdown';
import { Button } from '@/components/ui/button';
import {
  ArtifactMessagePartData,
  MessagePart as MessagePartType,
  parseMessage,
} from '@/lib/utils';
import { BotIcon, CodeIcon, Loader2Icon, UserIcon } from 'lucide-react';

type Props = {
  role: ChatMessageRoles;
  model: Models | null;
  text: string;
  setCurrentArtifact: (data: ArtifactMessagePartData) => void;
  attachments: Attachment[];
};

export function ChatMessage({
  role,
  text,
  attachments,
  setCurrentArtifact,
}: Props) {
  return (
    <div className={`flex items-start gap-3 px-4 py-6 rounded-lg ${
      role === 'user' ? 'bg-gray-800' : 'bg-gray-900'
    }`}>
      <div className={`flex-shrink-0 rounded-lg p-2 ${
        role === 'user' ? 'bg-purple-600' : 'bg-gray-700'
      }`}>
        {role === 'user' ? (
          <UserIcon className="w-5 h-5 text-white" />
        ) : (
          <BotIcon className="w-5 h-5 text-white" />
        )}
      </div>

      <div className="flex-1 space-y-4">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment, index) => (
              <AttachmentPreviewButton key={index} value={attachment} />
            ))}
          </div>
        )}

        {role === 'user' ? (
          <div className="prose prose-invert max-w-none">
            <Markdown text={text} />
          </div>
        ) : (
          parseMessage(text).map((part, index) => (
            <MessagePart
              key={index}
              data={part}
              setCurrentArtifact={setCurrentArtifact}
            />
          ))
        )}
      </div>
    </div>
  );
}

function MessagePart({
  data,
  setCurrentArtifact,
}: {
  data: MessagePartType;
  setCurrentArtifact: (data: ArtifactMessagePartData) => void;
}) {
  if (data.type === 'text') {
    return (
      <div className="prose prose-invert max-w-none">
        <Markdown text={data.data} />
      </div>
    );
  }

  if (data.type === 'artifact') {
    return (
      <Button
        variant="outline"
        className="flex items-center gap-4 w-full p-0 hover:bg-gray-800 border-gray-700"
        onClick={() => setCurrentArtifact(data.data)}
      >
        <div className="w-14 h-14 flex items-center justify-center border-r border-gray-700">
          {data.data.generating ? (
            <Loader2Icon className="w-5 h-5 animate-spin text-purple-500" />
          ) : (
            <CodeIcon className="w-5 h-5 text-purple-500" />
          )}
        </div>

        <div className="flex-1 text-left px-4">
          <h3 className="font-medium text-white">
            {data.data?.title || 'Generating...'}
          </h3>
          <p className="text-sm text-gray-400">
            {data.data?.content ? 'Click to view code' : ''}
          </p>
        </div>
      </Button>
    );
  }

  return null;
}