// src/components/ChatbotModal/MessageList.tsx
import React from 'react';
import Message from './Message';

interface MessageType {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface MessageListProps {
  messages: MessageType[];
  loading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, loading }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <Message key={index} role={msg.role} content={msg.content} timestamp={msg.timestamp} />
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
  );
};

export default MessageList;
