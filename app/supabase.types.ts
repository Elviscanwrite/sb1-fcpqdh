export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      chats: {
        Row: {
          created_at: string;
          id: string;
          title: string;
          user_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          title: string;
          user_id?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          title?: string;
          user_id?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: number;
          created_at: string;
          chat_id: string;
          role: string;
          text: string;
          attachments: Json | null;
          metadata: Json | null;
          user_id: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          chat_id: string;
          role: string;
          text: string;
          attachments?: Json | null;
          metadata?: Json | null;
          user_id?: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          chat_id?: string;
          role?: string;
          text?: string;
          attachments?: Json | null;
          metadata?: Json | null;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};