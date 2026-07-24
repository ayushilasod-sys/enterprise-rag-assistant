export interface VectorSearchRequest {
  embedding: number[];
  topK: number;
  namespace?: string;
  filter?: Record<string, string>;
  minScore?: number;
}
