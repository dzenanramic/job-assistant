from pydantic import BaseModel, Field
from typing import List


class AnalysisResponse(BaseModel):
    score: int
    strengths: List[str] = Field(default_factory=list)
    gaps: List[str] = Field(default_factory=list)
    suggestions: List[str] = Field(default_factory=list)
    flags: List[str] = Field(default_factory=list)


class JobContext(BaseModel):
    text: str
    cvText: str
