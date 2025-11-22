import httpx
from app.core.config import settings

class GeminiClient:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    
    async def generate_response(self, prompt: str) -> str:
        """
        Send prompt to Gemini API and return response
        """
        headers = {
            "Content-Type": "application/json"
        }
        
        payload = {
            "contents": [{
                "parts": [{
                    "text": prompt
                }]
            }]
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}?key={self.api_key}",
                headers=headers,
                json=payload,
                timeout=30.0
            )
            response.raise_for_status()
            data = response.json()
            
            return data["candidates"][0]["content"]["parts"][0]["text"]
