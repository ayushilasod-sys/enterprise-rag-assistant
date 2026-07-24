import { Module } from '@nestjs/common';

import { VECTOR_STORE_TOKEN } from './constants/vector-store.constants';
import { MockVectorStore } from './stores/mock-vector.store';

@Module({
  providers: [
    {
      provide: VECTOR_STORE_TOKEN,
      useClass: MockVectorStore,
    },
  ],
  exports: [VECTOR_STORE_TOKEN],
})
export class VectorStoreModule {}
