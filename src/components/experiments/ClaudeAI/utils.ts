interface ClaudeResponse {
  text: string;
  code?: string;
  title?: string;
}

export const generateClaudeResponse = (userInput: string): ClaudeResponse => {
  const input = userInput.toLowerCase();
  
  // If the input appears to be requesting code generation
  if (input.includes('create') || input.includes('generate') || input.includes('make')) {
    return {
      text: "I've generated a sample component based on your request. You can see the preview and code in the panel on the right.",
      code: `
import React from 'react';

export default function GeneratedComponent() {
  return (
    <div className="p-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
      <h2 className="text-2xl font-bold text-white mb-4">
        Generated Component
      </h2>
      <p className="text-white/80">
        This is a sample component generated based on your request.
        You can modify it further to meet your specific needs.
      </p>
    </div>
  );
}`,
      title: 'Generated React Component'
    };
  }

  // Default response for non-code requests
  return {
    text: "I understand you're asking about " + userInput + ". Let me help you with that...",
  };
};