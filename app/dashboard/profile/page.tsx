// /app/dashboard/profile/page.tsx

import React from 'react';
import ProfileHeader from '../../ui/private_profile/ProfileHeader';
import ProfileDetails from '../../ui/private_profile/ProfileDetails';
import ProfileActions from '../../ui/private_profile/ProfileActions';

const userData = {
  fullName: 'Abdulrahman Mahmoud Riyad',
  email: 'abdo@django.backend',
  phoneNumber: '+20 111 364 3894',
  address: '20 B2, Spooky Dorms, Borg El-Arab, Alexandria, Egypt',
};

const ProfilePage: React.FC = () => {
  return (
    <div className="bg-primary4 min-h-screen">
      <ProfileHeader userName={userData.fullName} />
      <main>
        <ProfileDetails user={userData} />
        <ProfileActions />
      </main>
    </div>
  );
};

export default ProfilePage;