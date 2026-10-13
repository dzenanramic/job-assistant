from fastapi import APIRouter
from ...services.analyzer import analyze_cv
from ...schemas import schemas

router = APIRouter()


@router.post("/", response_model=schemas.AnalysisResponse)
def get_cv_score(payload: schemas.JobContext):
    return analyze_cv(job_desc=payload.text, cv=payload.cvText)
