export interface AnalysisResult {
  score: number;
  strengths: string[];
  gaps: string[];
  suggestions: string[];
  flags: string[];
}
