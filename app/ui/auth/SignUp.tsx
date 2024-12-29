"use client";
import React from 'react';
import Link from 'next/link';
import { useState } from 'react'; 


const SignUp: React.FC = () => {
  const [emailerror, setEmailError] = useState(false);
  const [phoneerror, setPhoneError] = useState(false);
  const handleSignUp = async (event) => {
    event.preventDefault();
    setEmailError(false);
    setPhoneError(false);
    const response = await fetch('http://localhost:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: event.target.full_name.value,
        email: event.target.email.value,
        phone_number: event.target.phone.value,
        password: event.target.password.value
      }),
    }).then((response) => {
      if (response.ok){
          
      }
      else {
        response.json().then((data) => {
          if (data.email){
            setEmailError(true);
          }
          if (data.phone_number){
            setPhoneError(true);
          }
        })
      }
    }).catch((error) => {
      console.error('Error:', error);
    })
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary4 text-primary1">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/WelloLogo.png" alt="Wello Logo" className="h-16 w-auto" />
        </div>
        {/* Form Header */}
        <h2 className="text-3xl font-bold text-primary1 text-center mb-6 font-sans">Sign Up</h2>
        {/* Sign-Up Form */}
        <form className="space-y-5" onSubmit={handleSignUp}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary1">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              required
              className="mt-1 block w-full px-4 py-2 bg-primary4 border border-primary3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary2"
              placeholder="Your Full Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full px-4 py-2 bg-primary4 border border-primary3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary2"
              placeholder="you@example.com"
            />
            {emailerror && <p className="text-red-500 text-xs mt-1">Email already exists</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-primary1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="mt-1 block w-full px-4 py-2 bg-primary4 border border-primary3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary2"
              placeholder="123-456-7890"
            />
            {phoneerror && <p className="text-red-500 text-xs mt-1">Phone number already exists</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-primary1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 block w-full px-4 py-2 bg-primary4 border border-primary3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary2"
              placeholder="********"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-primary1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm-password"
              required
              className="mt-1 block w-full px-4 py-2 bg-primary4 border border-primary3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary2"
              placeholder="********"
            />
          </div>
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary2 focus:ring-primary2 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-primary1">
              I agree to the{' '}
              <Link href="/terms" className="text-primary2 hover:text-primary1">
                Terms and Conditions
              </Link>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-primary2 hover:bg-primary1 text-white font-bold rounded-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-primary1">
          Already have an account?{' '}
          <Link href="/auth/sign_in" className="font-medium text-primary2 hover:text-primary1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;