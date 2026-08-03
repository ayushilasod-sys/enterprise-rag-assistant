import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

import type { EmbeddingGenerator } from '../../interfaces/embedding.interface';
import type { DocumentChunk } from 'src/ingestion/models/document-chunk';
import type { EmbeddedChunk } from '../../../embedding/models/embedded-chunk';

@Injectable()
export class GeminiEmbeddingGenerator implements EmbeddingGenerator {
  private readonly client: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    this.client = new GoogleGenAI({
      apiKey: this.configService.getOrThrow<string>('GEMINI_API_KEY'),
    });
  }

  async generateQueryEmbedding(question: string): Promise<number[]> {
    return this.createEmbedding(question);
  }

  async generateDocumentEmbeddings(
    chunks: DocumentChunk[],
  ): Promise<EmbeddedChunk[]> {
    const embeddedChunks: EmbeddedChunk[] = [];

    for (const chunk of chunks) {
      const embedding = await this.createEmbedding(chunk.content);

      embeddedChunks.push({
        chunk,
        embedding,
      });
    }

    return embeddedChunks;
  }

  private async createEmbedding(text: string): Promise<number[]> {
    const response = await this.client.models.embedContent({
      model: this.configService.getOrThrow<string>('GEMINI_EMBEDDING_MODEL'),
      contents: text,
    });

    const embeddedChunks = response.embeddings?.[0]?.values ?? [];
    console.log('Gemini Embedding Response:', embeddedChunks.length);
    return response.embeddings?.[0]?.values ?? [];
  }
}
