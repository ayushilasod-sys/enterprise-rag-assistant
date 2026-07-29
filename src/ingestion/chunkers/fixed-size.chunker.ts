import { Injectable } from '@nestjs/common';
import type { Chunker } from '../interfaces/chunker.interface';
import type { Document } from '../models/document';
import type { DocumentChunk } from '../models/document-chunk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FixedSizeChunker implements Chunker {
  private readonly chunkSize: number;

  constructor(private readonly configService: ConfigService) {
    this.chunkSize = this.configService.get<number>('chunkSize') ?? 100;
  }

  chunk(document: Document): DocumentChunk[] {
    const words = document.content.split(/\s+/);

    const chunks: DocumentChunk[] = [];

    for (let i = 0; i < words.length; i += this.chunkSize) {
      const chunkWords = words.slice(i, i + this.chunkSize);

      chunks.push({
        id: crypto.randomUUID(),
        documentId: document.id,
        content: chunkWords.join(' '),
        pageNumber: 1,
        metadata: { ...document.metadata },
        documentSource: '',
      });
    }

    return chunks;
  }
}
