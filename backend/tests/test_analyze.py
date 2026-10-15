from unittest.mock import patch
from fastapi.testclient import TestClient

from job_assistant.main import app

client = TestClient(app)

PAYLOAD = {"text": "We need a Python developer.", "cvText": "I write Python."}

GOOD_JSON = (
    '{"score": 88, "strengths": ["Python"], "gaps": [], '
    '"suggestions": [], "flags": []}'
)


@patch("job_assistant.services.analyzer.ai_response", return_value=GOOD_JSON)
@patch("job_assistant.services.analyzer.is_injection", return_value=True)
def test_returns_parsed_analysis(_guard, _ai):
    """A clean request returns the parsed model, not raw text."""
    response = client.post("/jobs/", json=PAYLOAD)

    assert response.status_code == 200
    body = response.json()
    assert body["score"] == 88
    assert body["strengths"] == ["Python"]


@patch("job_assistant.services.analyzer.is_injection", return_value=False)
def test_injection_is_rejected_with_400(_guard):
    """A prompt-injection hit must be refused before any paid call."""
    response = client.post("/jobs/", json=PAYLOAD)

    assert response.status_code == 400
    assert "injection" in response.json()["detail"].lower()


def test_invalid_payload_is_rejected_with_422():
    """A missing cvText must be refused by validation, before any work happens."""
    response = client.post("/jobs/", json={"text": "only the job ad"})

    assert response.status_code == 422
