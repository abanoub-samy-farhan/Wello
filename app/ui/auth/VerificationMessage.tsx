'use client';
import React from 'react';
import { FiMail } from 'react-icons/fi';



const VerificationMessage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary2 px-4">
      <div className="max-w-md bg-primary4 shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-primary2 rounded-full p-4">
            <FiMail className="text-primary4 text-4xl" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-primary1 mb-4">
          Verify Your Email
        </h1>
        <p className="text-primary1 mb-6">
          Thank you for signing up! We've sent a verification link to your email.
          Please check your inbox and click on the link to verify your account.
        </p>
        <p className="text-sm text-primary1">
          Didn't receive the email? Check your spam folder
        </p>
      </div>
    </div>
  );
};

export default VerificationMessage;

