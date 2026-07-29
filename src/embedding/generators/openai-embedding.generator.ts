import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { DocumentChunk } from 'src/ingestion/models/document-chunk';
import { EmbeddedChunk } from '../models/embedded-chunk';

@Injectable()
export class OpenAIEmbeddingGenerator {
  protected readonly client: OpenAI;

  constructor(private readonly configService: ConfigService) {
    console.log(
      'OpenAI API Key:',
      this.configService.get<string>('openai.apiKey'),
    );
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('openai.apiKey'),
    });
  }

  private async createEmbedding(text: string): Promise<number[]> {
    const response = await this.client.embeddings.create({
      model: this.configService.get<string>('openai.embeddingModel')!,
      input: text,
    });

    return response.data[0].embedding;
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
}
