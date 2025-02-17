"use client";
import React from 'react';
import Link from 'next/link';
import {message} from 'antd';


const SignIn: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [emailError, setEmailError] = React.useState('');

  const success = () => {
    messageApi.success('Login Successful');
  };

  const error = () => {
    messageApi.error('Who da hell are you ?');
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      }),
    }).then(async (res) => {
      if (res.ok) {
        success();
        const data = await res.json();
        if (data['user']['is_first_login'])
          window.location.href = '/new';
        else
          window.location.href = '/dashboard';
      } else {
        if (res.status === 403)
          setEmailError('Email or password is wrong');
          error();
    }})

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary4 text-primary1">
      {contextHolder}
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/WelloLogo.png" alt="Wello Logo" className="h-16 w-auto" />
        </div>
        {/* Form Header */}
        <h2 className="text-3xl font-bold text-primary1 text-center mb-6 font-sans">Sign In</h2>
        {/* Sign-In Form */}
        <form className="space-y-5" onSubmit={handleOnSubmit}>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary2 focus:ring-primary2 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-primary1">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/auth/forgot-password" className="font-medium text-primary2 hover:text-primary1">
                Forgot your password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-primary2 hover:bg-primary1 text-white font-bold rounded-lg transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-primary1">
          Don't have an account?{' '}
          <Link href="/auth/sign_up" className="font-medium text-primary2 hover:text-primary1">
            Sign Up
          </Link>
        </p>
        {/* if unauthorized, make error here */}
        <p className="mt-6 text-center text-sm text-red-500">{emailError}</p>
      </div>
    </div>
  );
};

export default SignIn;