import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService, AI_CLIENT } from './jobs.service';
import type OpenAI from 'openai';

// A stub client so the service behind the controller can be constructed
// without an API key. HTTP-level behaviour is covered by the e2e suite.
const stubClient = {
  chat: { completions: { create: jest.fn() } },
} as unknown as OpenAI;

describe('JobsController', () => {
  let controller: JobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [JobsService, { provide: AI_CLIENT, useValue: stubClient }],
    }).compile();

    controller = module.get<JobsController>(JobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
