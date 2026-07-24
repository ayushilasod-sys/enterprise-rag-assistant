import { Injectable } from '@nestjs/common';
import { Retriever } from '../interfaces/retriever.interface';
import { RetrievedChunk } from '../models/retrieved-chunk';

@Injectable()
export class MockRetriever implements Retriever {
  async retrieve(_question: string): Promise<RetrievedChunk[]> {
    return Promise.resolve([
      {
        id: 'chunk-1',
        content: 'Employees are eligible for 20 days of annual leave.',
        source: 'Employee Handbook.pdf',
        pageNumber: 12,
        score: 0.96,
      },
      {
        id: 'chunk-2',
        content: 'Leave requests must be approved by the reporting manager.',
        source: 'HR Policy.pdf',
        pageNumber: 8,
        score: 0.91,
      },
    ]);
  }
}
