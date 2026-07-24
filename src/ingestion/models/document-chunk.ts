export interface DocumentChunk {
  id: string;
  documentId: string;
  documentSource: string;
  content: string;
  pageNumber: number;
  metadata: Record<string, string>;
}
