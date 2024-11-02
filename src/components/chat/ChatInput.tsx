import { Button } from '@/components/ui/button';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CircleStopIcon,
  PaperclipIcon,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import Textarea from 'react-textarea-autosize';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Attachment, Models } from '@/app/types';
import { getSettings, updateSettings } from '@/lib/userSettings';
import { AttachmentPreviewButton } from './AttachmentPreviewButton';
import { convertFileToBase64 } from '@/lib/utils';

export type Props = {
  input: string;
  setInput: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  attachments: Attachment[];
  onRemoveAttachment: (attachment: Attachment) => void;
  onAddAttachment: (newAttachments: Attachment[]) => void;
  showScrollButton: boolean;
  handleManualScroll: () => void;
  stopGenerating: () => void;
};

export function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
  attachments,
  onRemoveAttachment,
  onAddAttachment,
  showScrollButton,
  handleManualScroll,
  stopGenerating,
}: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { onKeyDown } = useEnterSubmit({ onSubmit });
  const [model, setModel] = useState<Models>(getSettings().model);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newAttachments = await Promise.all(
        filesArray.map(async (file) => ({
          url: await convertFileToBase64(file),
          name: file.name,
          contentType: file.type,
        }))
      );
      onAddAttachment(newAttachments);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleModelChange = (newModel: Models) => {
    setModel(newModel);
    updateSettings({ ...getSettings(), model: newModel });
  };

  return (
    <div className="sticky bottom-0 mx-auto w-full pt-6 flex flex-col gap-4 items-center">
      {showScrollButton && (
        <Button
          onClick={handleManualScroll}
          variant="outline"
          size="icon"
          className="rounded-full shadow-lg w-8 h-8 bg-gray-800 hover:bg-gray-700"
        >
          <ArrowDownIcon className="h-4 w-4" />
        </Button>
      )}

      <div className="w-full flex flex-col gap-1 bg-gray-800 p-2.5 pl-4 rounded-lg border border-gray-700">
        {attachments.length > 0 && (
          <div className="flex items-center gap-2 mb-2">
            {attachments.map((attachment, index) => (
              <AttachmentPreviewButton
                key={index}
                value={attachment}
                onRemove={onRemoveAttachment}
              />
            ))}
          </div>
        )}

        <div className="flex gap-2 items-start">
          <Textarea
            ref={inputRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder="Send a message..."
            className="min-h-[44px] w-full bg-transparent border-none resize-none focus:outline-none text-white placeholder-gray-400"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={handleFileUpload}
          >
            <PaperclipIcon className="w-4 h-4" />
          </Button>

          <Button
            onClick={isLoading ? stopGenerating : onSubmit}
            size="icon"
            className="w-8 h-8 bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? (
              <CircleStopIcon className="w-4 h-4" />
            ) : (
              <ArrowUpIcon className="w-4 h-4" />
            )}
          </Button>
        </div>

        <Select value={model} onValueChange={handleModelChange}>
          <SelectTrigger className="w-fit bg-transparent border-none">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Models.claude}>Claude Sonnet</SelectItem>
            <SelectItem value={Models.gpt4turbo}>GPT-4 Turbo</SelectItem>
            <SelectItem value={Models.gpt35turbo}>GPT-3.5 Turbo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}