from fastapi import APIRouter, Depends
from ...services.analyzer import AnalysisService
from ...schemas.schemas import AnalysisResponse, JobContext
from ...clients.deepseek_client import ai_response
from ...clients.jev_client import is_injection

router = APIRouter()


def get_analysis_service() -> AnalysisResponse:
    return AnalysisService(guard=is_injection, analyzer=ai_response)


@router.post("/", response_model=AnalysisResponse)
def get_cv_score(
    payload: JobContext, service: AnalysisService = Depends(get_analysis_service)
):
    return service.analyze(job_desc=payload.text, cv=payload.cvText)
