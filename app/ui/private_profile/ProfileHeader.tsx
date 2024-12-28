import React from 'react';

interface ProfileHeaderProps {
  userName: string;
  avatarUrl?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userName, avatarUrl }) => {
  return (
    <header className="text-primary1 py-6">
      <div className="max-w-7xl mx-auto flex justify-between px-5 w-screen md:ml-20">
        {/* Welcome Message */}
        <div>
          <h1 className="text-3xl font-semibold">Welcome, {userName}</h1>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;