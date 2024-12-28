'use client';
import React from 'react';
import ProfileHeader from '../ui/public_profile/ProfileHeader';
import ProfileDetails from '../ui/public_profile/ProfileDetails';
import Actions from '../ui/public_profile/Actions';

const PublicProfilePage: React.FC = () => {
  const userData = {
    userId: 'TSX123459@AMR876',
    name: 'Abdulrahman Mahmoud Riyad',
    email: 'abdo@django.backend',
    phoneNumber: '+20 111 364 3894',
    address: '20 B2, Spooky Dorms, Borg El-Arab, Alexandria, Egypt',
  };

  return (
    <div className="min-h-screen bg-primary4">
      <ProfileHeader />
      <main className="container mx-auto px-4">
        <ProfileDetails user={userData} />
        <Actions />
      </main>
    </div>
  );
};

export default PublicProfilePage;