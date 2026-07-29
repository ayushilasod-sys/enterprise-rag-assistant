import { Module } from '@nestjs/common';

import { VECTOR_STORE_TOKEN } from './constants/vector-store.constants';
import { PineconeVectorStore } from './stores/pinecone-vector.store';

@Module({
  providers: [
    {
      provide: VECTOR_STORE_TOKEN,
      useClass: PineconeVectorStore,
    },
  ],
  exports: [VECTOR_STORE_TOKEN],
})
export class VectorStoreModule {}
