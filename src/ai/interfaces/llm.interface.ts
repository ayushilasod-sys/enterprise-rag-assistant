import type { Prompt } from '../../chat/models/prompt';

export interface LLM {
  generate(prompt: Prompt): Promise<string>;
  generateText(content: string): Promise<string>;
}
