'use client';
import React from 'react';
import {useState, useEffect} from 'react';
import ProfileHeader from '../../ui/public_profile/ProfileHeader';
import ProfileDetails from '../../ui/public_profile/ProfileDetails';
import Actions from '../../ui/public_profile/Actions';
import { usePathname } from 'next/navigation';
import {User} from '../../interfaces'

const PublicProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const id = usePathname().split('/')[2]
  async function fetchPublicProfileData(){
    await fetch(`http://localhost:8000/api/user/${id}`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => {
      res.json().then((data) =>{
        const dataUser : User = {
          user_id: data.id,
          full_name: data.full_name,
          email: data.email,
          phone_number: data.phone,
          address: data.address,
          is_suspended: data.is_suspended,
          is_verified: data.is_verified,
          is_first_login: data.is_first_login,
        }
        console.log(data)
        setUser(dataUser)
      })
    })
  }

  useEffect(() => {
    fetchPublicProfileData()
  }, [])

  return (
    <div className="min-h-screen bg-primary4">
      <ProfileHeader />
      <main className="container mx-auto px-4">
        <ProfileDetails user={user} />
        <Actions user_id={id}/>
      </main>
    </div>
  );
};

export default PublicProfilePage;