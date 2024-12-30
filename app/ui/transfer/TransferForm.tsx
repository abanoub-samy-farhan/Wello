// /app/ui/transfer/TransferForm.tsx

'use client';
import React, { useState } from 'react';
import { MoneyTransfer } from '@/app/utils/fetches';
import { message } from 'antd';

const TransferForm: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState(0);
  const [transferType, setTransferType] = useState<'Send' | 'Request'>('Send');

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Money transfer successfully completed',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'An error occurred while transferring money, please try again later',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const sent = await MoneyTransfer(userId, transferType, amount);
    console.log(sent);
    if (sent) {
      success();
    } else {
      error();
    }

    console.log({ userId, amount, transferType });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg md:ml-20 p-10">
      {contextHolder}
      <h2 className="text-2xl font-semibold text-center mb-6 text-primary1">
        {transferType} Money
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transfer Type Selection */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-md font-semibold focus:outline-none ${
              transferType === 'Send'
                ? 'bg-primary1 text-white'
                : 'bg-primary4 text-primary1'
            }`}
            onClick={() => setTransferType('Send')}
          >
            Send Money
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md font-semibold focus:outline-none ${
              transferType === 'Request'
                ? 'bg-primary1 text-white'
                : 'bg-primary4 text-primary1'
            }`}
            onClick={() => setTransferType('Request')}
          >
            Request Money
          </button>
        </div>

        {/* User ID Input */}
        <div>
          <label className="block text-primary1 font-medium mb-2">
            Recipient User ID
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-primary3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary2"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-primary1 font-medium mb-2">
            Amount
          </label>
          <input
            type="number"
            min="0"
            step="1"
            className="w-full px-4 py-2 border border-primary3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary1 to-primary2 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:from-primary2 hover:to-primary3 transition-all"
        >
          Confirm {transferType}
        </button>
      </form>
    </div>
  );
};

export default TransferForm;