'use client';
import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { PaymentMethod, User } from '../../interfaces';
import {
  DashboardSendMoneyButton,
  DashboardMakePurchaseButton,
  DashboardRecieveMoneyButton
} from '../buttons';
import Loading from '../../loading';
import { fetchUser } from '@/app/utils/fetches'; // Ensure this returns a User object
import BalanceView from './BalanceView';

export default function DashboardPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    async function fetchData() {
      try {
        const paymentResponse = await fetch(`http://localhost:8000/api/payment/get-by-user-id/`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!paymentResponse.ok) {
          throw new Error(`Error fetching payment methods: ${paymentResponse.status} ${paymentResponse.statusText}`);
        }

        const paymentData = await paymentResponse.json();
        console.log('Fetched payment data:', paymentData);

        // Adjust based on actual response structure
        let lst: PaymentMethod[] = [];

        if (Array.isArray(paymentData.paymentMethods)) {
          // If paymentMethods is an array within data
          lst = paymentData.paymentMethods.map((pm: any) => ({
            payment_method_id: pm.payment_method_id,
            user_id: pm.user_id,
            provider: pm.provider,
            is_primary: pm.is_primary,
            expiry_date: pm.expiry_date,
            method_type: pm.method_type,
            card_number: pm.card_number,
            balance: pm.balance || 0,
          }));
        } else if (Array.isArray(paymentData)) {
          // If data itself is an array
          lst = paymentData.map((pm: any) => ({
            payment_method_id: pm.payment_method_id,
            user_id: pm.user_id,
            provider: pm.provider,
            is_primary: pm.is_primary,
            expiry_date: pm.expiry_date,
            method_type: pm.method_type,
            card_number: pm.card_number,
            balance: pm.balance || 0,
          }));
        } else {
          console.warn('Unexpected payment data structure:', paymentData);
        }

        setPaymentMethods(lst);

        const fetchedUser = await fetchUser();
        setUser(fetchedUser);
      } catch (err: any) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load payment methods or user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-primary4 text-primary1">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3b1e54',
          colorLink: '#3b1e54',
        },
      }}
    >
      <div className="flex flex-col bg-primary4 text-primary1 h-screen w-screen md:ml-20 p-10">
        <div className="flex flex-col text-3xl font-semibold gap-2 mt-10 md:mt-0">
          <h1>Welcome, {user?.full_name || 'User'}</h1>
          <p className='text-sm'>Thanks for Trusting Wello</p>
        </div>
        
        {/* Display Payment Methods */}
        <div className="flex flex-row gap-4 mt-6">
            <BalanceView paymentMethods={paymentMethods} />
        </div>

        <div className="flex flex-col gap-4 mt-10 border-t-2 py-4 border-primary3 pt-4 justify-center items-center">
          <h1 className="text-2xl font-semibold">Take Action</h1>
          <div className="flex flex-col md:flex-row md:justify-center w-full mt-4 gap-4 md:gap-10">
            <DashboardSendMoneyButton />
            <DashboardMakePurchaseButton />
            <DashboardRecieveMoneyButton />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
