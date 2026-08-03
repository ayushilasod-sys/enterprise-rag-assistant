import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { EmbeddingModule } from './embedding/embedding.module';
import { VectorStoreModule } from './vector-store/vector-store.module';
import { AppConfigModule } from './config/app-config.module';
import { EvaluationModule } from './evaluation/evaluation.module';

@Module({
  imports: [
    AppConfigModule,
    ChatModule,
    IngestionModule,
    EmbeddingModule,
    VectorStoreModule,
    EvaluationModule,
  ],
})
export class AppModule {}
