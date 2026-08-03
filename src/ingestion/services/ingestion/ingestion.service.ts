import { Inject, Injectable } from '@nestjs/common';
import { CHUNKER_TOKEN } from 'src/ingestion/constants/chunker.constants';
import { DOCUMENT_LOADER_TOKEN } from 'src/ingestion/constants/document-loader.constants';
import { EMBEDDING_GENERATOR_TOKEN } from 'src/embedding/constants/embedding-generator.constants';
import type { Chunker } from 'src/ingestion/interfaces/chunker.interface';
import type { DocumentLoader } from 'src/ingestion/interfaces/document-loader.interface';
import type { EmbeddingGenerator } from 'src/ai/interfaces/embedding.interface';
import { IngestionResult } from 'src/ingestion/models/ingestion-result';
import { VECTOR_STORE_TOKEN } from 'src/vector-store/constants/vector-store.constants';
import type { VectorStore } from 'src/ingestion/interfaces/vector-store.interface';

@Injectable()
export class IngestionService {
  constructor(
    @Inject(DOCUMENT_LOADER_TOKEN)
    private readonly documentLoader: DocumentLoader,

    @Inject(CHUNKER_TOKEN)
    private readonly chunker: Chunker,

    @Inject(EMBEDDING_GENERATOR_TOKEN)
    private readonly embeddingGenerator: EmbeddingGenerator,

    @Inject(VECTOR_STORE_TOKEN)
    private readonly vectorStore: VectorStore,
  ) {}

  async ingest(source: string): Promise<IngestionResult> {
    // Step 1
    const document = await this.documentLoader.load(source);
    //console.log('Document:', document);

    const chunks = this.chunker.chunk(document);
    // Step 3
    const embeddedChunks =
      await this.embeddingGenerator.generateDocumentEmbeddings(chunks);
    // Step 4
    await this.vectorStore.store(embeddedChunks);

    return {
      documentId: document.source,
      chunksProcessed: chunks.length,
      embeddingsGenerated: embeddedChunks.length,
    };
  }
}
