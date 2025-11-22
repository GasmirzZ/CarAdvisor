from fastapi import APIRouter, HTTPException
from app.schemas.recommendation import ChatRequest, ChatResponse
from app.services.advisor import CarAdvisorService

router = APIRouter()
advisor_service = CarAdvisorService()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Process user message and return AI response with car recommendations
    """
    try:
        response = await advisor_service.process_message(request.message, request.conversation_history)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    return {"status": "healthy"}
