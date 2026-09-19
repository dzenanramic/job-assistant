import { InternalServerErrorException } from '@nestjs/common';
import { AnalysisResult } from '../types/types';

export default function validateAnalysis(raw: AnalysisResult): void {
  const requiredSections = [
    'score',
    'strengths',
    'gaps',
    'suggestions',
    'flags',
  ];

  // if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
  //   throw new InternalServerErrorException('Response must be a JSON object');
  // }

  for (const section of requiredSections) {
    if (!(section in raw)) {
      throw new InternalServerErrorException(
        `Missing required section: ${section}`,
      );
    }
  }

  if (typeof raw.score !== 'number' || raw.score < 0 || raw.score > 100) {
    throw new InternalServerErrorException(
      'score must be a number between 0 and 100',
    );
  }

  if (!Array.isArray(raw.strengths)) {
    throw new InternalServerErrorException('strengths must be an array');
  }

  if (!Array.isArray(raw.gaps)) {
    throw new InternalServerErrorException('gaps must be an array');
  }

  if (!Array.isArray(raw.suggestions)) {
    throw new InternalServerErrorException('suggestions must be an array');
  }

  if (!Array.isArray(raw.flags)) {
    throw new InternalServerErrorException('flags must be an array');
  }

  // Every entry must be a non-empty string. Without this, a hijacked
  // response can smuggle arbitrary objects into fields the UI renders.
  // for (const section of ['strengths', 'gaps', 'suggestions', 'flags']) {
  //   const items = raw[section] as unknown[];
  //   if (items.some((item) => typeof item !== 'string' || item.trim() === '')) {
  //     throw new InternalServerErrorException(
  //       `${section} must contain only non-empty strings`,
  //     );
  //   }
  // }

  // // A real analysis always has findings. If both lists are empty, the model
  // // did not perform the task (a common outcome of a successful injection).
  // if ((raw as any).strengths.length === 0 && (raw as any).gaps.length === 0) {
  //   throw new InternalServerErrorException(
  //     'analysis is empty: both strengths and gaps are missing',
  //   );
  // }
}
