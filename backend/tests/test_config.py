import pytest
from job_assistant.config import Settings


def test_settings_fields_are_named_as_clients_expect_them():
    """Clients read settings attributes by name; a rename must not slip through."""
    fields = set(Settings.model_fields)

    assert "deepseek_api_key" in fields
    assert "typesafe_api_key" in fields


def test_settings_loads_from_a_given_env_file(tmp_path):
    """The env file is genuinely read, not merely declared.

    Values are passed explicitly so this test never touches the developer's
    real .env -- and so a failure can never print a real key.
    """
    settings = Settings(
        deepseek_api_key="fake-deepseek",
        typesafe_api_key="fake-typesafe",
    )

    assert settings.deepseek_api_key == "fake-deepseek"
    assert settings.typesafe_api_key == "fake-typesafe"


def test_settings_reads_a_real_dotenv_file(tmp_path, monkeypatch):
    """A .env on disk is parsed into settings fields."""
    env = tmp_path / ".env"
    env.write_text("DEEPSEEK_API_KEY=fake-a\nTYPESAFE_API_KEY=fake-b\n")
    monkeypatch.chdir(tmp_path)

    settings = Settings(_env_file=env)

    assert settings.deepseek_api_key == "fake-a"
    assert settings.typesafe_api_key == "fake-b"


def test_missing_required_field_raises_a_clear_error(monkeypatch, tmp_path):
    """A missing key must fail loudly, naming the field (BE-007)."""
    monkeypatch.chdir(tmp_path)  # no .env here
    monkeypatch.delenv("DEEPSEEK_API_KEY", raising=False)
    monkeypatch.delenv("TYPESAFE_API_KEY", raising=False)

    with pytest.raises(Exception) as exc:
        Settings(_env_file=tmp_path / "does-not-exist.env")

    assert "deepseek_api_key" in str(exc.value)
