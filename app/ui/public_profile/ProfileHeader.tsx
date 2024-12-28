'use client';
import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const ProfileHeader: React.FC = () => {
  return (
    <header className="bg-primary4 text-primary1">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo and 'Wello' Text */}
        <div className="flex items-center">
          {/* Added a background to enhance logo visibility */}
          <div>
            <img
              src="/WelloLogo.png"
              alt="Logo"
              className="h-10 w-auto"
            />
          </div>
          <span className="ml-3 text-2xl font-bold font-sans text-primary1">
            Wello
          </span>
        </div>

        {/* Report Button */}
        <div className="flex items-center">
          <button
            className="flex items-center bg-primary1 text-primary4 rounded-md px-4 py-2 shadow hover:bg-primary2"
            aria-label="Report"
          >
            <ExclamationCircleOutlined className="text-xl mr-2" />
            <span className="text-base font-bold">Report</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;