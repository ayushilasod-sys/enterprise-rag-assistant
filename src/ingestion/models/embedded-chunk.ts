import type { DocumentChunk } from './document-chunk';

export interface EmbeddedChunk {
  chunk: DocumentChunk;
  embedding: number[];
}
