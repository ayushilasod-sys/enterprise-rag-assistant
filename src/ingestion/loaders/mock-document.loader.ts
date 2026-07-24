import { Injectable } from '@nestjs/common';
import type { DocumentLoader } from '../interfaces/document-loader.interface';
import type { Document } from '../models/document';

@Injectable()
export class MockDocumentLoader implements DocumentLoader {
  async load(source: string): Promise<Document> {
    return Promise.resolve({
      id: crypto.randomUUID(),
      source,
      content: `
Employees are entitled to 20 days of annual leave.
Leave requests must be approved by the reporting manager.
Employees can work remotely up to three days per week.
      `.trim(),
      metadata: {
        department: 'HR',
        documentType: 'Policy',
        version: '1.0',
      },
    });
  }
}
