'use client';
import React from 'react';
import { SendOutlined, TeamOutlined } from '@ant-design/icons';

const Actions: React.FC = () => {
  return (
    <section className="bg-white p-8 rounded-lg shadow-lg mx-auto max-w-2xl mt-8 mb-12">
      <h2 className="text-2xl font-bold text-center text-primary1 mb-6">
        Take Action
      </h2>
      <div className="flex flex-col sm:flex-row sm:justify-center gap-6">
        {/* Send Money Button */}
        <button className="flex items-center justify-center bg-primary1 text-white py-4 px-6 rounded-lg hover:bg-primary2 transition duration-300 w-full sm:w-auto">
          <SendOutlined className="text-2xl mr-2" />
          <span className="text-lg font-semibold">Send Money</span>
        </button>

        {/* Request Money Button */}
        <button className="flex items-center justify-center bg-primary1 text-white py-4 px-6 rounded-lg hover:bg-primary2 transition duration-300 w-full sm:w-auto">
          <TeamOutlined className="text-2xl mr-2" />
          <span className="text-lg font-semibold">Request Money</span>
        </button>
      </div>
    </section>
  );
};

export default Actions;