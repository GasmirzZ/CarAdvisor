import asyncio
import httpx
from app.core.config import settings


async def test_pexels():
    brand = "Toyota"
    model = "Corolla Cross"
    query = f"{brand} {model} car"
    url = "https://api.pexels.com/v1/search"
    headers = {"Authorization": settings.pexels_api_key}
    params = {"query": query, "per_page": 1, "orientation": "landscape"}

    print(f"Testing Pexels API...")
    print(f"Query: {query}")
    print(f"API Key: {settings.pexels_api_key[:20]}...")
    print()

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, params=params, timeout=10.0)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.text[:500]}")

            if response.status_code == 200:
                data = response.json()
                if data.get("photos") and len(data["photos"]) > 0:
                    image_url = data["photos"][0]["src"]["medium"]
                    print(f"\n✅ SUCCESS! Image URL: {image_url}")
                else:
                    print(f"\n❌ No photos found for query: {query}")
            else:
                print(f"\n❌ API Error: {response.status_code}")
        except Exception as e:
            print(f"\n❌ Exception: {e}")

asyncio.run(test_pexels())
