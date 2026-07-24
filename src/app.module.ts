import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [ChatModule, IngestionModule],
})
export class AppModule {}
