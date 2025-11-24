import { useState } from 'react';

export default function CarCard({ car }) {
  const [imageError, setImageError] = useState(false);

  const getCarIcon = (brand) => {
    const icons = {
      'Toyota': '🚗',
      'Honda': '🚙',
      'Ford': '🚐',
      'BMW': '🏎️',
      'Mercedes': '🚘',
      'Audi': '🚗',
      'Volkswagen': '🚙',
      'Nissan': '🚗',
      'Mazda': '🚗',
      'Hyundai': '🚙',
      'Kia': '🚗',
      'Tesla': '⚡',
      'Porsche': '🏁',
    };
    return icons[brand] || '🚗';
  };

  const getGradient = (brand) => {
    const gradients = {
      'Toyota': 'from-red-500 to-red-700',
      'Honda': 'from-blue-500 to-blue-700',
      'Ford': 'from-indigo-500 to-indigo-700',
      'BMW': 'from-gray-700 to-gray-900',
      'Mercedes': 'from-slate-600 to-slate-800',
      'Audi': 'from-gray-600 to-gray-800',
      'Volkswagen': 'from-blue-600 to-blue-800',
      'Nissan': 'from-red-600 to-red-800',
      'Mazda': 'from-red-500 to-red-700',
      'Hyundai': 'from-blue-600 to-blue-800',
      'Kia': 'from-red-600 to-red-800',
      'Tesla': 'from-purple-600 to-purple-800',
      'Porsche': 'from-yellow-500 to-yellow-700',
    };
    return gradients[brand] || 'from-blue-500 to-blue-700';
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fadeIn group">
      {/* Car Image or Fallback */}
      <div className="relative overflow-hidden">
        {!imageError && car.image_url ? (
          <>
            <img 
              src={car.image_url} 
              alt={`${car.brand} ${car.model}`}
              className="w-full h-40 object-cover bg-gray-100 transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        ) : (
          <div className={`w-full h-40 bg-gradient-to-br ${getGradient(car.brand)} flex flex-col items-center justify-center text-white relative`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="text-6xl mb-2 relative z-10 drop-shadow-lg">{getCarIcon(car.brand)}</div>
            <div className="text-xl font-bold relative z-10 drop-shadow-lg">{car.brand}</div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{car.brand} {car.model}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          {car.year && <span>📅 {car.year}</span>}
          {car.price_range && (
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {car.price_range}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
