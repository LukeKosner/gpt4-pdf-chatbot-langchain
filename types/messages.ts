import { Document } from 'langchain/document';
import { Interview } from '@/types/interviews';

export type Message = {
  type: 'apiMessage' | 'userMessage';
  message: string;
  isStreaming?: boolean;
  sourceDocs?: Document[];
};

export type ChatMessage = {
  messages: Message[];
  pending?: string;
  history: [string, string][];
  pendingSourceDocs?: SourceDoc[];
};

export type ChatMessages = {
  [key: string]: ChatMessage;
};

export type SourceDoc = {
  pageContent: string;
  metadata: {
    source: string;
    interview?: Interview;
  };
};

export type Chats = (
  | Message
  | {
      type: string;
      message: string;
      sourceDocs?: SourceDoc[];
    }
)[];
