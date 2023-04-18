import { type Document } from 'langchain/document';
import { type Interview } from '@/types/interviews';

export interface Message {
  type: 'apiMessage' | 'userMessage';
  message: string;
  isStreaming?: boolean;
  sourceDocs?: Document[];
}

export interface ChatMessage {
  messages: Message[];
  pending?: string;
  history: Array<[string, string]>;
  pendingSourceDocs?: SourceDoc[];
}

export type ChatMessages = Record<string, ChatMessage>;

export interface SourceDoc {
  pageContent: string;
  metadata: {
    source: string;
    interview?: Interview;
  };
}

export type Chats = Array<
  | Message
  | {
      type: string;
      message: string;
      sourceDocs?: SourceDoc[];
    }
>;
