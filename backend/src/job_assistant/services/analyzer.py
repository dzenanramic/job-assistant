from ..clients.jev_client import is_injection
from ..clients.deepseek_client import ai_response
from fastapi import HTTPException, status
import json


def analyze_cv(job_desc, cv):
    is_prompt_safe = is_injection(cv=cv)

    if is_prompt_safe:
        result = ai_response(job_desc=job_desc, cv=cv)
        result = json.loads(result)

        return result
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Security check failed: Input text contains potential prompt injection.",
        )
