import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

import type { LLM } from '../interfaces/llm.interface';
import type { Prompt } from '../models/prompt';

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

    const response = await this.client.models.generateContent({
      model: this.configService.getOrThrow<string>('GEMINI_CHAT_MODEL'),
      contents: content,
    });

    return response.text ?? '';
  }
}
