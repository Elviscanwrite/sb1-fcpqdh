import React from "react";
import remarkGfm from "remark-gfm";
import { twMerge } from "tailwind-merge";
import { CodeBlock } from "./code-block";
import { MemoizedReactMarkdown } from "./memoized-react-markdown";

type Props = { text: string; className?: string };

export default function Markdown({ text, className = "" }: Props) {
  return (
    <MemoizedReactMarkdown
      className={twMerge(
        "prose text-black dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-none break-words",
        className
      )}
      remarkPlugins={[remarkGfm]}
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>;
        },
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <CodeBlock
              key={Math.random().toString()}
              language={(match && match[1]) || ""}
              value={String(children).replace(/\n$/, "")}
              {...props}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {text}
    </MemoizedReactMarkdown>
  );
}