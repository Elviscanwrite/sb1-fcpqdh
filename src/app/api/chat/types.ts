import { Message } from 'ai';

export type ChatRequest = {
  messages: Message[];
  apiKey: string;
  model: string;
};

export type ChatResponse = {
  role: string;
  content: string;
};

export type ArtifactType = 
  | "application/code"
  | "text/markdown"
  | "text/html"
  | "application/react"
  | "image/svg+xml";

export interface ArtifactData {
  id: string;
  type: ArtifactType;
  title: string;
  content: string;
  language?: string;
  generating: boolean;
}