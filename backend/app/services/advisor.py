from app.core.ai import GeminiClient
from app.schemas.recommendation import ChatResponse


class CarAdvisorService:
    def __init__(self):
        self.ai_client = GeminiClient()

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

        return ChatResponse(
            message=ai_response,
            recommendations=[]  # TODO: Parse recommendations from AI response
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

Ask relevant questions about:
- Budget
- Usage (city, highway, off-road)
- Family size
- Fuel preference (gasoline, diesel, electric, hybrid)
- Brand preferences
- Body type (sedan, SUV, hatchback, etc.)
- Special requirements (cargo space, towing, luxury features)

Once you have enough information, recommend 2-3 specific car models with explanations.

Keep responses conversational and friendly."""

        full_prompt = f"{system_prompt}\n\n"

        if context:
            full_prompt += f"Conversation history:\n{context}\n\n"

        full_prompt += f"User: {message}\nAssistant:"

        return full_prompt
