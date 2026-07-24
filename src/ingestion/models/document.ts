export interface Document {
  id: string;
  source: string;
  content: string;
  metadata: Record<string, string>;
}
