import React from 'react';
import Dashboard  from '../ui/dashboard/Dashboard';
import { User } from '../interfaces';

export default async function DashboardPage() {
  const user: User = {
    user_id: '1',
    email: 'abanoubsamy2341@gmail.com',
    full_name: 'Abanoub Samy Farhan',
    phone_number: '+201019569244',
    photo_uri: 'https://avatars.githubusercontent.com/u/47273207?v=4',
    is_suspended: false,
  }
  await new Promise((resolve) => setTimeout(resolve, 5000));
  
  return (
    <Dashboard user={user} />
  );
}