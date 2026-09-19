import { Test, TestingModule } from '@nestjs/testing';
import { JobsService, AI_CLIENT } from './jobs.service';
import type OpenAI from 'openai';

// A stub client so the service can be constructed without an API key.
// Prompt-shape and validation behaviour is covered in
// `prompt-injection.spec.ts`; this file only checks wiring.
const stubClient = {
  chat: { completions: { create: jest.fn() } },
} as unknown as OpenAI;

describe('JobsService', () => {
  let service: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobsService, { provide: AI_CLIENT, useValue: stubClient }],
    }).compile();

    service = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
