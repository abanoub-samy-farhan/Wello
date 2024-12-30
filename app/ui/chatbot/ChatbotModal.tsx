// src/components/ChatbotModal/ChatbotModal.tsx

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BiSend, BiX } from 'react-icons/bi';
import ReactMarkdown from 'react-markdown';

interface MessageType {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatbotModalProps {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      role: 'assistant',
      content: 'Hello, how can I help you today?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = useCallback(async () => {
    if (!message.trim() || loading) return;

    const userMessage: MessageType = {
      role: 'user',
      content: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // Append user message and a placeholder for assistant's reply
    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      { role: 'assistant', content: '', timestamp: new Date().toISOString() },
    ]);
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chatbot/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      const assistantReply = data.reply;

      // Update the assistant's reply in the last message
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        if (lastMessage.role === 'assistant') {
          lastMessage.content = assistantReply;
          lastMessage.timestamp = new Date().toISOString();
        }
        return updatedMessages;
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        if (lastMessage.role === 'assistant') {
          lastMessage.content = 'Sorry, something went wrong. Please try again later.';
          lastMessage.timestamp = new Date().toISOString();
        }
        return updatedMessages;
      });
    } finally {
      setLoading(false);
    }
  }, [message, messages, loading]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello, how can I help you today?',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <>
      {isChatOpen && (
        <div
          className="fixed inset-0 flex items-end justify-center lg:items-center bg-gray-900 bg-opacity-50 z-50 transition-opacity ease-in-out duration-300"
          onClick={() => setIsChatOpen(false)}
          aria-modal="true"
          role="dialog"
          aria-labelledby="chatbot-title"
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md h-5/6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-purple-600 text-white p-4 flex justify-between items-center rounded-t-lg">
              <h3 id="chatbot-title" className="text-lg font-semibold">
                Wello Assistant
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleClearChat}
                  className="hover:text-gray-200 transition-colors ease-in-out"
                  title="Clear Chat"
                  aria-label="Clear Chat"
                >
                  🗑️
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="hover:text-gray-200 transition-colors ease-in-out"
                  title="Close Chat"
                  aria-label="Close Chat"
                >
                  <BiX size={24} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                    <span className="block text-xs text-gray-500 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                    </div>
                    <span className="block text-xs text-gray-500 mt-1">Assistant is typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Field */}
            <div className="p-4 bg-gray-100 flex items-center rounded-b-lg">
              <textarea
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={loading}
                rows={1}
              />
              <button
                onClick={sendMessage}
                className={`ml-2 p-2 rounded-md ${
                  loading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
                disabled={loading}
                aria-label="Send Message"
              >
                <BiSend size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotModal;
