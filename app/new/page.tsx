'use client';
import React, { useState } from 'react';
import { ConfigProvider, Steps } from 'antd';
import InformationEntry from '../ui/newUserComponents/InformationEntry';
import PaymentMethodEntry from '../ui/newUserComponents/PaymentMethodEntry';
import ReviewEntries from '../ui/newUserComponents/ReviewEntries';
import { User, PaymentMethod } from '../interfaces';


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
  const [current, setCurrent] = useState(0);
  const [user, setUser] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  
  const handleNext = () => {
    setCurrent(current + 1);
  }

  const handleBack = () => {
    setCurrent(current - 1);
  }
  const handleSaveUser = (user: User) => {
    setUser(user);
    handleNext();
  }

  const handleSavePaymentMethods = (paymentMethod: PaymentMethod) => {
    setPaymentMethod(paymentMethod);
    handleNext();
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
        <h1 className="text-4xl font-bold" >
          Welcome to Wello
        </h1>
        <h2>Let's get started</h2>
        <Steps current={current} items={items} className="mt-10" />
        <div className="mt-10">
          <div className='justify-center h-fit md:h-96'>
            {current === 0 && ( <InformationEntry user={user} handleSubmit={handleSaveUser} /> )}
            {current === 1 && ( <PaymentMethodEntry paymentMethod={paymentMethod} handleSubmit={handleSavePaymentMethods} /> )}
            {current === 2 && ( <ReviewEntries user={user} paymentMethod={paymentMethod} /> )}
          </div>
          <div className="mt-10">
            {current > 0 && (
              <button onClick={handleBack} className="mr-2 border border-primary1 px-4 py-2 rounded-md 
              hover:bg-primary1 hover:text-white transition-colors duration-300 ease-in-out">
                Back
              </button>
            )}
            {current < steps.length - 1 && (
              <button onClick={handleNext} className="ml-2 border border-primary1 px-4 py-2 rounded-md 
              hover:bg-primary1 hover:text-white transition-colors duration-300 ease-in-out">
                Next
              </button>
            )}
            {current === steps.length - 1 && (
              <button onClick={() => alert('User and Payment Methods saved!')} className="ml-2 border 
              border-primary1 px-4 py-2 rounded-md 
              text-white bg-primary1
              transition-colors duration-300 ease-in-out">
                Save
              </button>
            )}
            </div>
          </div>
      </div>
    </ConfigProvider>
  );
}
