import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  get topK(): number {
    return this.config.getOrThrow<number>('TOP_K');
  }

  get chunkSize(): number {
    return this.config.getOrThrow<number>('CHUNK_SIZE');
  }

  get geminiApiKey(): string {
    return this.config.getOrThrow<string>('GEMINI_API_KEY');
  }

  get embeddingModel(): string {
    return this.config.getOrThrow<string>('GEMINI_EMBEDDING_MODEL');
  }

  get llmModel(): string {
    return this.config.getOrThrow<string>('GEMINI_LLM_MODEL');
  }

  get pineconeApiKey(): string {
    return this.config.get<string>('PINECONE_API_KEY') ?? '';
  }

  get pineconeIndex(): string {
    return this.config.get<string>('PINECONE_INDEX') ?? '';
  }
}
