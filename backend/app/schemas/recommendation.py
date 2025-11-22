from pydantic import BaseModel
from typing import List, Optional


class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[dict]] = None


class CarRecommendation(BaseModel):
    model: str
    brand: str
    year: Optional[int] = None
    price_range: Optional[str] = None
    reason: str


class ChatResponse(BaseModel):
    message: str
    recommendations: List[CarRecommendation] = []
