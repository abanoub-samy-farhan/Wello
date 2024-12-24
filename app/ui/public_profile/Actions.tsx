import React from 'react';
import { SendOutlined, TeamOutlined } from '@ant-design/icons';

const Actions: React.FC = () => {
  return (
    <section className="bg-primary4 p-4 sm:p-6 rounded-lg shadow mb-6">
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        {/* Send Money Button */}
        <button
          className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-primary1 to-primary2 text-primary4 py-6 sm:py-8 rounded-lg focus:outline-none"
        >
          <SendOutlined className="text-3xl sm:text-4xl mb-2" />
          <span className="text-lg sm:text-xl font-bold font-sans">Send Money</span>
        </button>

        {/* Request Money Button */}
        <button
          className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-primary1 to-primary2 text-primary4 py-6 sm:py-8 rounded-lg focus:outline-none"
        >
          <TeamOutlined className="text-3xl sm:text-4xl mb-2" />
          <span className="text-lg sm:text-xl font-bold font-sans">Request Money</span>
        </button>
      </div>
    </section>
  );
};

export default Actions;