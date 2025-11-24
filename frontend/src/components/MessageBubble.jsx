export default function MessageBubble({ message, isUser }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl transition-all hover:shadow-xl ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200/50'
            : 'bg-white text-gray-900 border border-gray-200 shadow-md hover:shadow-blue-100'
        }`}
      >
        <p className="whitespace-pre-wrap">{message}</p>
      </div>
    </div>
  );
}
