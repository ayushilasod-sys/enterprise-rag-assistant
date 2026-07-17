import { RetrievedChunk } from '../models/retrieved-chunk';

export interface Retriever {
  retrieve(question: string): Promise<RetrievedChunk[]>;
}
