import { Injectable } from '@nestjs/common';
import type { LLM } from '../interfaces/llm.interface';
import type { Prompt } from '../models/prompt';

@Injectable()
export class MockLLM implements LLM {
  async generate(prompt: Prompt): Promise<string> {
    console.log('Prompt sent to LLM:', prompt);
    return Promise.resolve(
      'Mock Response: Employees are eligible for 20 annual leaves.',
    );
  }
}
