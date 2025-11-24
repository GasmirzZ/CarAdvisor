from app.core.ai import GeminiClient
from app.core.config import settings
from app.schemas.recommendation import ChatResponse, CarRecommendation
import json
import re
import httpx


class CarAdvisorService:
    def __init__(self):
        self.ai_client = GeminiClient()
        self.pexels_api_key = settings.pexels_api_key

    async def process_message(self, message: str, conversation_history: list = None) -> ChatResponse:
        """
        Process user message and generate car recommendations
        """
        # Build context from conversation history
        context = self._build_context(conversation_history or [])

        # Create prompt for AI
        prompt = self._create_prompt(message, context)

        # Get AI response
        ai_response = await self.ai_client.generate_response(prompt)

        # Parse recommendations from response
        recommendations = await self._parse_recommendations(ai_response)

        # Remove [RECOMMENDATIONS] block from displayed message
        clean_message = re.sub(
            r'\[RECOMMENDATIONS\].*?\[/RECOMMENDATIONS\]',
            '',
            ai_response,
            flags=re.DOTALL
        ).strip()

        return ChatResponse(
            message=clean_message,
            recommendations=recommendations
        )

    def _build_context(self, history: list) -> str:
        """Build conversation context from history"""
        if not history:
            return ""

        context_parts = []
        for item in history:
            context_parts.append(f"User: {item.get('user', '')}")
            context_parts.append(f"Assistant: {item.get('assistant', '')}")

        return "\n".join(context_parts)

    def _create_prompt(self, message: str, context: str) -> str:
        """Create prompt for AI with car advisor instructions"""
        system_prompt = """You are a car advisor assistant. Your job is to help users find the perfect car based on their needs, preferences, and budget.

IMPORTANT: Always respond in the SAME LANGUAGE as the user's message. If they write in Serbian/Croatian/Bosnian, respond in Serbian. If they write in English, respond in English.

Ask relevant questions about:
- Budget
- Usage (city, highway, off-road)
- Family size
- Fuel preference (gasoline, diesel, electric, hybrid)
- Brand preferences
- Body type (sedan, SUV, hatchback, etc.)
- Special requirements (cargo space, towing, luxury features)

CRITICAL FORMATTING RULE - YOU MUST FOLLOW THIS IN EVERY RESPONSE:

1. If you DON'T have enough information yet, ask questions AND include this at the end:
[RECOMMENDATIONS]
{"cars": []}
[/RECOMMENDATIONS]

2. When you HAVE enough information, recommend 2-3 cars AND include:
[RECOMMENDATIONS]
{
  "cars": [
    {
      "brand": "Toyota",
      "model": "Camry",
      "year": 2024,
      "price_range": "$25,000-$35,000",
      "reason": "Reliable, fuel-efficient, perfect for families"
    },
    {
      "brand": "Honda",
      "model": "CR-V",
      "year": 2024,
      "price_range": "$30,000-$40,000",
      "reason": "Spacious SUV with great safety features"
    }
  ]
}
[/RECOMMENDATIONS]

ALWAYS include the [RECOMMENDATIONS] block in EVERY response, even if cars array is empty."""

        full_prompt = f"{system_prompt}\n\n"

        if context:
            full_prompt += f"Conversation history:\n{context}\n\n"

        full_prompt += f"User: {message}\nAssistant:"

        return full_prompt

    async def _get_car_image(self, brand: str, model: str) -> str:
        """Fetch car image from Imagin Studio API"""
        try:
            # Use Imagin Studio Car Image API - has watermark but accurate models
            # Format: make, model (no spaces, lowercase, hyphens)
            make = brand.lower().replace(' ', '-').replace('&', 'and')
            model_name = model.lower().replace(' ', '-').replace('&', 'and')

            # Imagin Studio API URL
            image_url = f"https://cdn.imagin.studio/getimage?customer=hrjavascript-mastery&make={make}&modelFamily={model_name}&zoomType=fullscreen&zoomLevel=0&angle=01"

            return image_url

        except Exception as e:
            print(f"Failed to generate image URL: {e}")
            return None

    async def _parse_recommendations(self, ai_response: str) -> list[CarRecommendation]:
        """Extract car recommendations from AI response"""
        try:
            # Look for JSON between [RECOMMENDATIONS] tags
            match = re.search(
                r'\[RECOMMENDATIONS\](.*?)\[/RECOMMENDATIONS\]', ai_response, re.DOTALL)

            if not match:
                return []

            json_str = match.group(1).strip()
            data = json.loads(json_str)

            recommendations = []
            for car in data.get('cars', []):
                brand = car.get('brand', 'Unknown')
                model = car.get('model', 'Unknown')
                year = car.get('year', 2024)

                # Get image from Pexels API
                image_url = await self._get_car_image(brand, model)

                recommendations.append(CarRecommendation(
                    brand=brand,
                    model=model,
                    year=year,
                    price_range=car.get('price_range'),
                    reason=car.get('reason', 'No reason provided'),
                    image_url=image_url
                ))

            return recommendations
        except (json.JSONDecodeError, KeyError, AttributeError) as e:
            print(f"Failed to parse recommendations: {e}")
            return []
