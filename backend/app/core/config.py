from pydantic_settings import BaseSettings
from functools import lru_cache
from pathlib import Path
import os
from dotenv import load_dotenv

# Get the backend directory path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE = BASE_DIR / ".env"

# Load environment variables
load_dotenv(ENV_FILE)

# Debug: Check if keys are loaded
gemini_key = os.getenv("GEMINI_API_KEY", "")
pexels_key = os.getenv(
    "PEXELS_API_KEY", "563492ad6f917000010000018e0b64d8f8654b0a88e1dd4dcb8d2e3d")

if not gemini_key:
    print(f"WARNING: GEMINI_API_KEY not found in {ENV_FILE}")
    print(f"ENV_FILE exists: {ENV_FILE.exists()}")


class Settings(BaseSettings):
    gemini_api_key: str = gemini_key
    pexels_api_key: str = pexels_key
    app_name: str = "Car Advisor"
    debug: bool = False


@lru_cache()
def get_settings():
    return Settings()


settings = get_settings()
