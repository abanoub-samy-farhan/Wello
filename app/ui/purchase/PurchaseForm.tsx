'use client';
import React, { useState } from 'react';
import { MakePurchase } from '@/app/utils/fetches';
import {message } from 'antd';

const PurchaseForm: React.FC = () => {
  const [company, setCompany] = useState('Noon');
  const [itemId, setItemId] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Purchase Successful!',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Purchase Failed. Please try again.',
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sent = await MakePurchase(company, itemId);
    if (sent) {
      success();
    }
    else {
      error();
    }
    console.log({ company, itemId });
  };

  const companies = ['Noon', 'Amazon', 'Jumia'];

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg md:ml-20 p-10">
      {contextHolder}
      <h2 className="text-2xl font-semibold text-center mb-6 text-primary1">
        Make a Purchase
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Selection */}
        <div>
          <label className="block text-primary1 font-medium mb-2">
            Select Company
          </label>
          <select
            className="w-full px-4 py-2 border border-primary3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary2"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            {companies.map((comp) => (
              <option key={comp} value={comp}>
                {comp}
              </option>
            ))}
          </select>
        </div>

        {/* Item ID Input */}
        <div>
          <label className="block text-primary1 font-medium mb-2">
            Item ID
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-primary3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary2"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary1 to-primary2 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:from-primary2 hover:to-primary3 transition-all"
        >
          Submit Purchase
        </button>
      </form>
    </div>
  );
};

export default PurchaseForm;