'use client';
import React, { useState } from 'react';
import { ConfigProvider, Steps } from 'antd';
import InformationEntry from '../ui/newUserComponents/InformationEntry';
import PaymentMethodEntry from '../ui/newUserComponents/PaymentMethodEntry';
import ReviewEntries from '../ui/newUserComponents/ReviewEntries';

const steps = [
  {
    title: 'Information',
    content: <InformationEntry />,
  },
  {
    title: 'Accounts',
    content: <PaymentMethodEntry />,
  },
  {
    title: 'Review and Proceed',
    content: <ReviewEntries />,
  },
];

const items = steps.map((item) => ({ key: item.title, title: item.title }));

export default function NewPage() {
  const [current, setCurrent] = useState(1);
  const [user, setUser] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  
  const handleNext = () => {
    setCurrent(current + 1);
  }

  const handleBack = () => {
    setCurrent(current - 1);
  }

  const handleSaveUser = (user) => {
    setUser(user);
    handleNext();
  }

  const handleSavePaymentMethods = (paymentMethods) => {
    setPaymentMethods(paymentMethods);
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
      <div className="bg-white text-center h-screen w-screen p-16" style={{ color: '#3b1e54' }}>
        <h1 className="text-4xl font-bold" >
          Welcome to Wello
        </h1>
        <h2>Let's get started</h2>
        <Steps current={current} items={items} className="mt-10" />
      </div>
    </ConfigProvider>
  );
}
