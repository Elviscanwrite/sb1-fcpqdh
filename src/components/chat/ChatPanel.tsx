import { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { useSupabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor';
import { useFakeWhisper } from '@/lib/hooks/use-fake-whisper';
import { getSettings } from '@/lib/userSettings';
import { addMessage, createChat, getChatMessages } from '@/lib/db';
import { Chat, Models, Attachment } from '@/app/types';
import { ArtifactMessagePartData } from '@/lib/utils';
import { ChatInput } from './ChatInput';
import { ChatMessageList } from './ChatMessageList';
import { ArtifactPanel } from '../artifact/ArtifactPanel';

type Props = {
  id: string | null;
};

export function ChatPanel({ id }: Props) {
  const settings = getSettings();
  const { supabase, session } = useSupabase();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [chatId, setChatId] = useState(id);
  const [initialMessages, setInitialMessages] = useState([]);
  const [fetchingMessages, setFetchingMessages] = useState(false);
  const [currentArtifact, setCurrentArtifact] = useState<ArtifactMessagePartData | null>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [selectedArtifacts, setSelectedArtifacts] = useState<string[]>([]);

  const fetchMessages = async () => {
    if (chatId) {
      setFetchingMessages(true);
      const messages = await getChatMessages(supabase, chatId);
      setInitialMessages(
        messages.map((message) => ({
          id: String(message.id),
          role: message.role,
          content: message.text,
          experimental_attachments: message.attachments || [],
        }))
      );
      setFetchingMessages(false);
    } else {
      setInitialMessages([]);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const createChatMutation = useMutation({
    mutationFn: async ({ title }: { title: string }) => 
      await createChat(supabase, title, session?.user.id),
    onSuccess: async (newChat) => {
      queryClient.setQueryData<Chat[]>(['chats'], (oldChats = []) => [...oldChats, newChat]);
      setChatId(newChat.id);
      router.push(`/chat/${newChat.id}`);
    },
  });

  const {
    messages,
    input,
    setInput,
    append,
    stop: stopGenerating,
    isLoading: generatingResponse,
  } = useChat({
    initialMessages,
    onFinish: async (message) => {
      if (chatId) {
        await addMessage(supabase, chatId, message);
      }
    },
    sendExtraMessageFields: true,
  });

  const { messagesRef, scrollRef, showScrollButton, handleManualScroll } = useScrollAnchor(messages);

  useEffect(() => {
    if (!chatId && messages.length === 2 && !generatingResponse) {
      createChatMutation.mutate({
        title: messages[0].content.slice(0, 100),
      });
    }
  }, [chatId, messages, generatingResponse]);

  const useWhispherHook = settings.openaiApiKey ? useRealWhisper : useFakeWhisper;
  const { recording, transcribing, transcript, startRecording, stopRecording } = useWhispherHook({
    apiKey: settings.openaiApiKey,
  });

  useEffect(() => {
    if (!recording && !transcribing && transcript?.text) {
      setInput((prev) => prev + ` ${transcript.text}`);
    }
  }, [recording, transcribing, transcript?.text]);

  const handleCapture = ({ selectionImg, artifactImg }) => {
    setAttachments((prev) => [
      ...prev,
      { contentType: 'image/png', url: selectionImg }
    ]);
    setSelectedArtifacts((prev) => 
      prev.includes(artifactImg) ? prev : [...prev, artifactImg]
    );
  };

  const handleSend = async () => {
    const query = input.trim();
    if (!query) return;

    if (settings.model === Models.claude && !settings.anthropicApiKey) {
      toast.error('Please enter your Claude API Key');
      return;
    }

    if (settings.model.startsWith('gpt') && !settings.openaiApiKey) {
      toast.error('Please enter your OpenAI API Key');
      return;
    }

    const messageAttachments = [
      ...attachments
        .filter((item) => item.contentType?.startsWith('image'))
        .map((item) => ({ url: item.url, contentType: item.contentType })),
      ...selectedArtifacts.map((url) => ({ url })),
    ];

    append(
      {
        role: 'user',
        content: query,
        experimental_attachments: messageAttachments,
      },
      {
        body: {
          model: settings.model,
          apiKey: settings.model.startsWith('gpt')
            ? settings.openaiApiKey
            : settings.anthropicApiKey,
        },
      }
    );

    setInput('');
    stopRecording();

    if (chatId) {
      await addMessage(
        supabase,
        chatId,
        { role: 'user', content: query },
        attachments
      );
    }

    setAttachments([]);
    setSelectedArtifacts([]);
  };

  return (
    <>
      <div
        className="relative flex w-full flex-1 overflow-hidden bg-gray-900"
        ref={scrollRef}
      >
        <div className="relative mx-auto flex h-full w-full max-w-3xl flex-1 flex-col px-4">
          {fetchingMessages && (
            <div className="flex items-center justify-center py-8">
              <Loader2Icon className="h-6 w-6 animate-spin text-purple-500" />
            </div>
          )}

          <ChatMessageList
            messages={messages}
            setCurrentArtifact={setCurrentArtifact}
            containerRef={messagesRef}
          />

          <ChatInput
            input={input}
            setInput={setInput}
            onSubmit={handleSend}
            isLoading={generatingResponse}
            recording={recording}
            onStartRecord={startRecording}
            onStopRecord={stopRecording}
            attachments={attachments}
            onAddAttachment={(newAttachments) => setAttachments(prev => [...prev, ...newAttachments])}
            onRemoveAttachment={(attachment) => 
              setAttachments(prev => prev.filter(item => item.url !== attachment.url))
            }
            showScrollButton={showScrollButton}
            handleManualScroll={handleManualScroll}
            stopGenerating={stopGenerating}
          />
        </div>
      </div>

      {currentArtifact && (
        <div className="w-full max-w-xl h-full max-h-full pt-6 pb-4 bg-gray-900 border-l border-gray-800">
          <ArtifactPanel
            {...currentArtifact}
            onClose={() => setCurrentArtifact(null)}
            recording={recording}
            onCapture={handleCapture}
          />
        </div>
      )}
    </>
  );
}