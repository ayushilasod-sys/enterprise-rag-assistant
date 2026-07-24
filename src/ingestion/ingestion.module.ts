import { Module } from '@nestjs/common';

import { IngestionService } from './services/ingestion/ingestion.service';

import { DOCUMENT_LOADER_TOKEN } from './constants/document-loader.constants';
import { CHUNKER_TOKEN } from './constants/chunker.constants';
import { EMBEDDING_GENERATOR_TOKEN } from '../embedding/constants/embedding-generator.constants';

import { MockDocumentLoader } from './loaders/mock-document.loader';
import { FixedSizeChunker } from './chunkers/fixed-size.chunker';
import { MockEmbeddingGenerator } from '../embedding/generators/mock-embedding-generator';
import { IngestionController } from './controllers/ingestion.controller';
import { VectorStoreModule } from 'src/vector-store/vector-store.module';
import { EmbeddingModule } from 'src/embedding/embedding.module';

@Module({
  imports: [EmbeddingModule, VectorStoreModule],
  controllers: [IngestionController],
  providers: [
    IngestionService,

    {
      provide: DOCUMENT_LOADER_TOKEN,
      useClass: MockDocumentLoader,
    },

    {
      provide: CHUNKER_TOKEN,
      useClass: FixedSizeChunker,
    },

    {
      provide: EMBEDDING_GENERATOR_TOKEN,
      useClass: MockEmbeddingGenerator,
    },
  ],
  exports: [IngestionService],
})
export class IngestionModule {}
