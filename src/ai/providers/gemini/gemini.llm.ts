import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

import type { LLM } from '../../interfaces/llm.interface';
import type { Prompt } from '../../../chat/models/prompt';
import { retryWithBackoff } from 'src/common/utils/retry-with-backoff';

@Injectable()
export class GeminiLLM implements LLM {
  private readonly client: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    this.client = new GoogleGenAI({
      apiKey: this.configService.getOrThrow<string>('GEMINI_API_KEY'),
    });
  }

  async generate(prompt: Prompt): Promise<string> {
    const content = prompt.messages
      .map((message) => `${message.role.toUpperCase()}:\n${message.content}`)
      .join('\n\n');

    return this.generateText(content);
  }

  async generateText(content: string): Promise<string> {
    const response = await retryWithBackoff(
      () =>
        this.client.models.generateContent({
          model: this.configService.getOrThrow<string>('GEMINI_CHAT_MODEL'),
          contents: content,
        }),
      {
        maxRetries: 3,
        initialDelayMs: 1000,
        shouldRetry: (error) => this.shouldRetry(error),
        onRetry: (attempt, delay) => {
          console.warn(`Gemini unavailable. Retry ${attempt} in ${delay}ms`);
        },
      },
    );
    return response.text ?? '';
  }

  private shouldRetry(error: any): boolean {
    return error?.status === 503 || error?.status === 'UNAVAILABLE';
  }
}
