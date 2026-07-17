import { Injectable } from '@nestjs/common';
import { ChatRequestDto } from './dto/chat-request.dto';

@Injectable()
export class ChatService {
  chat(request: ChatRequestDto) {
    return {
      answer: `Hello! You asked: ${request.question}`,
    };
  }
}
