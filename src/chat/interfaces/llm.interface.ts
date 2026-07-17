import type { Prompt } from '../models/prompt';

export interface LLM {
  generate(prompt: Prompt): Promise<string>;
}
