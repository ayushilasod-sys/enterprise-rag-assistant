import type { Prompt } from '../models/prompt';
import type { RetrievedChunk } from '../models/retrieved-chunk';

export interface PromptBuilder {
  build(question: string, chunks: RetrievedChunk[]): Prompt;
}
