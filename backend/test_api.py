import asyncio
from app.services.advisor import CarAdvisorService


async def test():
    service = CarAdvisorService()

    # First message - user provides initial info
    print("=== First message ===")
    response1 = await service.process_message('Treba mi porodican SUV do 30000 dolara')
    print('AI:', response1.message[:200], '...')
    print('Recommendations:', len(response1.recommendations))
    print()

    # Second message - user provides all needed info
    print("=== Second message with full details ===")
    response2 = await service.process_message(
        'Potreban mi je porodican SUV do 30000 dolara, imam 4 clana porodice, vozim grad i autoput, zelim benzinac ili hibrid, volim Toyota Honda ili Mazda. Nemam posebnih zahteva, daj mi 3 najbolje opcije odmah.',
        conversation_history=[
            {'user': 'Treba mi porodican SUV do 30000 dolara',
                'assistant': response1.message}
        ]
    )
    print('AI:', response2.message)
    print('Recommendations:', len(response2.recommendations))
    for car in response2.recommendations:
        print(f'- {car.brand} {car.model}')
        print(f'  Year: {car.year}')
        print(f'  Price: {car.price_range}')
        print(f'  Image: {car.image_url}')
        print(f'  Reason: {car.reason}')
        print()

asyncio.run(test())
