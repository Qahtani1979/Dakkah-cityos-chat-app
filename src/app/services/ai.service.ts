import { gateway } from './gateway-client';

export const AIService = {
  chat(messages: Array<{ role: string; content: string }>, options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }) {
    return gateway.post('/ai/chat', { messages, ...options });
  },

  embeddings(input: string | string[]) {
    return gateway.post('/ai/embeddings', { input });
  },
};
