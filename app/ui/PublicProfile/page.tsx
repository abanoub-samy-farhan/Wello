import React from 'react';
import ProfileHeader from './components/ProfileHeader';
import ProfileDetails from './components/ProfileDetails';
import Actions from './components/Actions';

const PublicProfilePage: React.FC = () => {
  const userData = {
    name: 'Abdulrahman Mahmoud Riyad',
    email: 'abdo@django.backend',
    phoneNumber: '+20 111 364 3894',
    address: '20 B2, Spooky Dorms, Borg El-Arab, Alexandria, Egypt',
  };

  return (
    <div className="min-h-screen bg-primary4">
      <ProfileHeader />
      <div className="container mx-auto p-4">
        <ProfileDetails user={userData} />
        <Actions />
      </div>
    </div>
  );
};

export default PublicProfilePage;