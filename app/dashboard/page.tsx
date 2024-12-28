import React from 'react';
import Dashboard  from '../ui/dashboard/Dashboard';
import { User } from '../interfaces';

export default async function DashboardPage() {
  const user: User = {
    user_id: '1',
    address: '12 B6, Spooky Dorms, Borg El-Arab, Alexandria, Egypt',
    email: 'abanoubsamy2341@gmail.com',
    full_name: 'Abanoub Samy Farhan',
    phone_number: '+201019569244',
    is_suspended: false,
  }  
  
  return (
    <Dashboard user={user} />
  );
}