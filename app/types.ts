export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ChatMessageRoles = 'user' | 'assistant' | 'system';

export enum Models {
  claude = "claude",
  gpt4o = "gpt-4o",
  gpt4oMini = "gpt-4o-mini",
  gpt35turbo = "gpt-3.5-turbo",
  gpt4turbo = "gpt-4-turbo",
}

export type Chat = {
  id: string;
  created_at: string;
  title: string;
  user_id: string;
};

export type Attachment = {
  contentType?: string;
  url: string;
  name?: string;
};

export enum OAuthProviders {
  google = "google",
  github = "github",
}