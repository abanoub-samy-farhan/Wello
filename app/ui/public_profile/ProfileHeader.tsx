import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const ProfileHeader: React.FC = () => {
  return (
    <header className="w-full bg-primary4 rounded-3xl">
      <div className="max-ws mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and 'Wello' Text */}
        <div className="flex items-center">
          <img
            src="/WelloLogo.png"
            alt="Logo"
            className="h-12 w-10 md:h-20 md:w-16"
          />
          <span className="ml-4 text-3xl font-bold font-sans text-primary1">
            Wello
          </span>
        </div>

        {/* Report Button */}
        <div className="flex items-center">
          <button
            className="flex items-center bg-gradient-to-r from-primary1 to-primary2 text-primary4 rounded-xl px-3 py-1.5 focus:outline-none"
            aria-label="Report"
          >
            <ExclamationCircleOutlined
              style={{ fontSize: '1.5rem', marginRight: '0.5rem', color: 'currentColor' }}
            />
            <span className="text-xl font-bold font-sans">Report</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;