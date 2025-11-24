export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      {/* Subtle dot pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#3b82f6" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      
      {/* Diagonal lines pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diagonals" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="50" stroke="#8b5cf6" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonals)" />
      </svg>
      
      {/* Abstract geometric shapes */}
      <div className="absolute top-1/4 right-1/4 opacity-10 animate-float">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="url(#shapeGradient1)" strokeWidth="2"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="url(#shapeGradient1)" strokeWidth="1.5"/>
          <circle cx="50" cy="50" r="20" fill="none" stroke="url(#shapeGradient1)" strokeWidth="1"/>
          <defs>
            <linearGradient id="shapeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6"/>
              <stop offset="100%" stopColor="#8b5cf6"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="absolute bottom-1/4 left-1/3 opacity-10 animate-float" style={{animationDelay: '1.5s'}}>
        <svg width="80" height="80" viewBox="0 0 100 100">
          <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="url(#shapeGradient2)" strokeWidth="2"/>
          <defs>
            <linearGradient id="shapeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899"/>
              <stop offset="100%" stopColor="#8b5cf6"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
