import React from 'react';
import { FiSend, FiDownloadCloud } from 'react-icons/fi';

const ProfileActions: React.FC = () => {
  return (
    <section className="mt-8 md:ml-20 p-10">
      <h2 className="text-3xl font-bold text-primary1 mb-6">Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Send Money */}
        <button className="flex items-center justify-center bg-gradient-to-r from-primary2 to-primary3 text-primary1 p-6 rounded-lg hover:from-primary3 hover:to-primary2 transition duration-300"
        onClick={() => window.location.href = '/dashboard/transfer'}>
          <FiSend className="text-4xl mr-4" />
          <span className="text-xl font-semibold">Send Money</span>
        </button>
        {/* Request Money */}
        <button className="flex items-center justify-center bg-gradient-to-r from-primary2 to-primary3 text-primary1 p-6 rounded-lg hover:from-primary3 hover:to-primary2 transition duration-300"
        onClick={() => window.location.href = '/dashboard/transfer'}
        >
          <FiDownloadCloud className="text-4xl mr-4" 
          
          />
          <span className="text-xl font-semibold">Request Money</span>
        </button>
      </div>
    </section>
  );
};

export default ProfileActions;