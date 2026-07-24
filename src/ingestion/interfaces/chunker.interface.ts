import type { Document } from '../models/document';
import type { DocumentChunk } from '../models/document-chunk';

export interface Chunker {
  chunk(document: Document): DocumentChunk[];
}
