import Logo from './Logo';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center gap-6">
          <Logo className="w-24 h-24 drop-shadow-[0_0_24px_rgba(255,255,255,0.45)] text-white" />
          <div>
            <h1 className="text-4xl font-bold drop-shadow-2xl">CAR ADVISOR</h1>
            <p className="text-blue-100 mt-2 text-lg drop-shadow-lg">Find your perfect car with AI assistance</p>
          </div>
        </div>
      </div>
    </header>
  );
}
