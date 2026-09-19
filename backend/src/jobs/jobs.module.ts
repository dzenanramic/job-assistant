import { Module } from '@nestjs/common';
import { JobsService, AI_CLIENT } from './jobs.service';
import { JobsController } from './jobs.controller';
import OpenAI from 'openai';

@Module({
  controllers: [JobsController],
  providers: [
    JobsService,
    {
      provide: AI_CLIENT,
      useFactory: () =>
        new OpenAI({
          apiKey: process.env.DEEPSEEK_API_KEY,
          baseURL: 'https://api.deepseek.com',
        }),
    },
  ],
})
export class JobsModule {}
