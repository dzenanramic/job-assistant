from ..schemas.schemas import AnalysisResponse
from fastapi import HTTPException, status
import json


class AnalysisService:
    def __init__(self, guard, analyzer):
        self._guard = guard
        self._analyzer = analyzer

    def analyze(self, job_desc, cv) -> AnalysisResponse:
        if not self._guard(cv=cv):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt injection"
            )
        result = self._analyzer(job_desc=job_desc, cv=cv)
        return AnalysisResponse(**json.loads(result))
