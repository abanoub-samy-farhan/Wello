// src/components/ChatbotModal/Message.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const Message: React.FC<MessageProps> = ({ role, content, timestamp }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs px-4 py-2 rounded-lg ${isUser ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
        <ReactMarkdown>{content}</ReactMarkdown>
        <span className="block text-xs text-gray-500 mt-1">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default Message;
