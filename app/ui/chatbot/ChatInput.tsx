// src/components/ChatbotModal/ChatInput.tsx
import React, { KeyboardEvent } from 'react';
import { BiSend } from 'react-icons/bi';

interface ChatInputProps {
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: () => void;
  loading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, sendMessage, loading }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-4 bg-gray-100 flex items-center rounded-b-lg">
      <textarea
        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        rows={1}
      />
      <button
        onClick={sendMessage}
        className={`ml-2 p-2 rounded-md ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
        disabled={loading}
        aria-label="Send Message"
      >
        <BiSend size={24} />
      </button>
    </div>
  );
};

export default ChatInput;
