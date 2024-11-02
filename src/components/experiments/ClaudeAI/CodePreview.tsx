import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodePreviewProps {
  code: string;
  mode: 'preview' | 'code';
}

export function CodePreview({ code, mode }: CodePreviewProps) {
  const [iframeContent, setIframeContent] = useState('');

  useEffect(() => {
    if (mode === 'preview') {
      // Add necessary wrapper HTML for preview
      setIframeContent(`
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body class="bg-gray-900">
            <div id="root">${code}</div>
          </body>
        </html>
      `);
    }
  }, [code, mode]);

  if (mode === 'code') {
    return (
      <SyntaxHighlighter
        language="tsx"
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: '#1f2937',
        }}
      >
        {code}
      </SyntaxHighlighter>
    );
  }

  return (
    <iframe
      srcDoc={iframeContent}
      className="w-full h-full border-0 bg-gray-900"
      sandbox="allow-scripts"
    />
  );
}