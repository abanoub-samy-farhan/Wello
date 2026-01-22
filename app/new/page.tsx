'use client';
import React, { useState, useEffect } from 'react';
import { ConfigProvider, Steps } from 'antd';
import InformationEntry from '../ui/newUserComponents/InformationEntry';
import PaymentMethodEntry from '../ui/newUserComponents/PaymentMethodEntry';
import ReviewEntries from '../ui/newUserComponents/ReviewEntries';
import { User, PaymentMethod } from '../interfaces';
import Loading from '../loading';

const steps = [
  {
    title: 'Information',
  },
  {
    title: 'Accounts',
  },
  {
    title: 'Review and Proceed',
  },
];

const items = steps.map((item) => ({ key: item.title, title: item.title }));

export default function NewPage() {
  // Initialize user as null to represent the loading state
  const [user, setUser] = useState<User | null>(null);
  const [current, setCurrent] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    payment_method_id: '',
    user_id: '',
    provider: '',
    is_primary: false,
    expiry_date: '',
    method_type: '',
    card_number: '',
  });
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch user data from the backend
  async function fetchUser() {
    try {
      const response = await fetch('http://localhost:8000/api/user/', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      console.log('Fetched data:', data);

      const fetchedUser: User = {
        user_id: data.id,
        email: data.email,
        address: data.address,
        full_name: data.full_name,
        phone_number: data.phone_number,
        is_suspended: data.is_suspended,
        is_verified: data.is_verified,
        is_first_login: data.is_first_login,
      };

      if (fetchedUser.is_first_login === false) {
        window.location.href = '/dashboard';
      }

      setUser(fetchedUser);
      console.log('Fetched user:', fetchedUser);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(user: User){
    try {
      const userJson = JSON.stringify({
        email: user.email,
        full_name: user.full_name,
        phone_number: user.phone_number,
        is_suspended: user.is_suspended,
        is_first_login: user.is_first_login,
        address: user.address,
      });

      await fetch('http://localhost:8000/api/user/',
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: userJson,
        }
      ).then((res) => {
        if (res.ok) {
          console.log('Success');
        }
        else {
          console.log('Failed');
        }
      }); 
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

async function updatePaymentMethod(paymentMethod: PaymentMethod){
  try {
    const paymentMethodJson = JSON.stringify({
      provider: paymentMethod.provider,
      method_type: paymentMethod.method_type,
      card_number: paymentMethod.card_number,
      expiry_date: paymentMethod.expiry_date.substring(5, 10),
      is_primary: paymentMethod.is_primary,
    });

    await fetch('http://localhost:8000/api/payment/create/',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: paymentMethodJson,
      }
    ).then((res) => {
      if (res.ok) {
        console.log('Success');
      }
      else {
        console.log('Failed');
      }
    }); 
} catch (error) {
  console.error('Error updating payment method:', error);
}
}

  useEffect(() => {
    fetchUser();
  }, []);

  const handleNext = () => {
    setCurrent((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleSaveUser = async (user: User) => {
    setLoading(true);
    await updateUser(user);
    setLoading(false);
    handleNext();
  };

  const handleSavePaymentMethods = async (paymentMethod: PaymentMethod) => {
    setPaymentMethod(paymentMethod);
    setLoading(true);
    await updatePaymentMethod(paymentMethod);
    setLoading(false);
    handleNext();
  };

  // Render a loading indicator while fetching user data
  if (loading) {
    return (
      <Loading />
    );
  }

  if (!user) {
    return (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3b1e54',
            colorLink: '#3b1e54',
          },
        }}
      >
        <div className="flex items-center justify-center h-screen w-screen bg-white">
          <p className="text-red-500">Failed to load user data. Please try again.</p>
        </div>
      </ConfigProvider>
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
      <div className="bg-white text-center h-screen overflow-auto w-screen p-16" style={{ color: '#3b1e54' }}>
        <h1 className="text-4xl font-bold">Welcome to Wello</h1>
        <h2>Let&apos;s get started</h2>
        <Steps current={current} items={items} className="mt-10" />
          <div className="mt-10 border-primary3 h-fit justify-center">
            {current === 0 && <InformationEntry user={user} handleSubmit={handleSaveUser} />}
            {current === 1 && (
              <PaymentMethodEntry paymentMethod={paymentMethod} handleSubmit={handleSavePaymentMethods} />
            )}
            {current === 2 && <ReviewEntries user={user} paymentMethod={paymentMethod} />}
          </div>
        <div className="mt-10">
            {current > 0 && (
              <button
                onClick={handleBack}
                className="mr-2 border border-primary1 px-4 py-2 rounded-md hover:bg-primary1 hover:text-white transition-colors duration-300 ease-in-out"
              >
                Back
              </button>
            )}
            {current < steps.length - 1 && (
              <button
                onClick={handleNext}
                className="ml-2 border border-primary1 px-4 py-2 rounded-md hover:bg-primary1 hover:text-white transition-colors duration-300 ease-in-out"
              >
                Next
              </button>
            )}
            {current === steps.length - 1 && (
              <button
                onClick={async () => {
                  user.is_first_login = false
                  await handleSaveUser(user);
                  window.location.href = '/dashboard';
                }}
                className="ml-2 border border-primary1 px-4 py-2 rounded-md text-white bg-primary1 transition-colors duration-300 ease-in-out"
              >
                Save
              </button>
            )}
          </div>
      </div>
    </ConfigProvider>
  );
}
