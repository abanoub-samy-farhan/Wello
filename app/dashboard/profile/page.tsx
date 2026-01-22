// /app/dashboard/profile/page.tsx
'use client'
import React from 'react';
import {useState, useEffect} from 'react';
import ProfileHeader from '../../ui/private_profile/ProfileHeader';
import ProfileDetails from '../../ui/private_profile/ProfileDetails';
import ProfileActions from '../../ui/private_profile/ProfileActions';
import {User} from '../../interfaces';
import { fetchUser } from '@/app/utils/fetches';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() =>{
    async function fetchData() {
      const fetchedUser = await fetchUser();
      setUser(fetchedUser);
      console.log("fetchedUser", fetchedUser);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="bg-primary4 min-h-screen">
      {user ? <ProfileHeader userName={user?.full_name} /> : null}
      <main>
        {user ? <ProfileDetails user={user} /> : null}
        <ProfileActions />
      </main>
    </div>
  );
};

export default ProfilePage;