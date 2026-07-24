import type { Document } from '../models/document';

export interface DocumentLoader {
  load(source: string): Promise<Document>;
}
