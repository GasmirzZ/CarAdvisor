import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';
import MessageBubble from '../components/MessageBubble';
import CarCard from '../components/CarCard';
import BackgroundPattern from '../components/BackgroundPattern';
import { sendMessage } from '../services/api';

export default function Dashboard() {
  const [conversation, setConversation] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const mutation = useMutation({
    mutationFn: ({ message, history }) => sendMessage(message, history),
    onSuccess: (data) => {
      setError(null);
      setConversation((prev) => [
        ...prev,
        { type: 'assistant', content: data.message },
      ]);
      if (data.recommendations && data.recommendations.length > 0) {
        setRecommendations(data.recommendations);
      }
    },
    onError: (error) => {
      console.error('Error:', error);
      setError('Failed to get response. Please try again.');
      setError('Failed to get response. Please try again.');
      setConversation((prev) => [
        ...prev,
        { type: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    },
  });

  const handleSendMessage = (message) => {
    // Build history BEFORE adding new message
    const history = conversation.map((msg) => ({
      [msg.type === 'user' ? 'user' : 'assistant']: msg.content,
    }));
    
    // Add user message to conversation
    setConversation((prev) => [...prev, { type: 'user', content: message }]);
    
    // Send to API
    mutation.mutate({ message, history });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 relative">
      <BackgroundPattern />
      <Header />
      
      <main className="w-full py-8">
        {/* Chat Section - Full Width */}
        <div className="mb-8 px-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 max-w-[1600px] mx-auto border border-white/20 hover:shadow-blue-200/50 transition-all duration-300">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Chat with AI Advisor</h2>
            
            {/* Messages */}
            <div className="h-96 overflow-y-auto mb-4 p-4 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100">
                {conversation.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <p>Start a conversation to get car recommendations!</p>
                  </div>
                ) : (
                  <>
                    {conversation.map((msg, index) => (
                      <MessageBubble
                        key={index}
                        message={msg.content}
                        isUser={msg.type === 'user'}
                      />
                    ))}
                    {mutation.isPending && (
                      <div className="flex justify-start mb-4">
                        <div className="bg-gray-200 rounded-2xl px-4 py-3 max-w-[70%] animate-pulse">
                          <div className="flex gap-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>
              
              {/* Error Banner */}
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center justify-between">
                  <span>{error}</span>
                  <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                    ✕
                  </button>
                </div>
              )}
              
              {/* Input */}
              <ChatBox onSendMessage={handleSendMessage} isLoading={mutation.isPending} />
          </div>
        </div>

        {/* Recommendations Section - Full Width Below Chat */}
        {recommendations.length > 0 && (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mx-6 max-w-[1600px] lg:mx-auto border border-white/20">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
