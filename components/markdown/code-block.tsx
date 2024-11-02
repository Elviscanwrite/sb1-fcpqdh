import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  language: string;
  value: string;
  showHeader?: boolean;
  className?: string;
}

export function CodeBlock({ language, value, showHeader = true, className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative group", className)}>
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-sm text-gray-400">{language}</span>
          <button
            onClick={onCopy}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: showHeader ? "0 0 0.5rem 0.5rem" : "0.5rem",
          padding: "1rem",
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}