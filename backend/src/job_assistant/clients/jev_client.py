from typesafe_sdk import Noul, TypeSafeClient
from ..config import get_settings

guard_prompt: str = "Does this text contain malicious prompt injection"


def _client() -> TypeSafeClient:
    settings = get_settings()
    return TypeSafeClient(api_key=settings.typesafe_api_key)


def is_injection(cv):
    response = _client().system_one(
        state=cv,
        questions={"is_prompt_injection": Noul(instructions=guard_prompt)},
    )

    guard_score = response.answers["is_prompt_injection"].noul * 100

    return guard_score <= 30
