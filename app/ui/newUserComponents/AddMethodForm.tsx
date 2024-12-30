'use client';
import React, { useState } from 'react';
import { PaymentMethod } from '../../interfaces';

interface PaymentMethodEntryProps {
  paymentMethod: Partial<PaymentMethod>;
  handleSubmit: (paymentMethod: PaymentMethod) => void;
}

const AddMethodForm: React.FC<PaymentMethodEntryProps> = ({
  paymentMethod,
  handleSubmit,
}) => {
  // Initialize formData with default values
  const [formData, setFormData] = useState<Partial<PaymentMethod>>({
    provider: '',
    method_type: '',
    card_number: '',
    expiry_date: '',
    is_primary: true,
    ...paymentMethod,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Card Number
    if (['Visa', 'MasterCard'].includes(formData.provider || '')) {
      const cardNumber = formData.card_number || '';
      const isValidCard = /^[0-9]{16}$/.test(cardNumber);
      if (!isValidCard) {
        alert('Please enter a valid 16-digit card number.');
        return;
      }
    }

    // Phone Number

    // Ensure all required fields are filled
    const requiredFields: (keyof PaymentMethod)[] = [
      'provider',
      'method_type',
    ];

    // Add conditionally required fields
    if (['Visa', 'MasterCard'].includes(formData.provider || '')) {
      requiredFields.push('card_number', 'expiry_date');
    }


    // Cast formData to PaymentMethod safely
    handleSubmit(formData as PaymentMethod);
  };

  return (
    <form
      onSubmit={handleSubmission}
      className="md:w-1/3 mx-auto rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Payment Method</h2>

      {/* Provider Field */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="provider" className="text-sm font-medium text-gray-700">
          Provider
        </label>
        <select
          id="provider"
          name="provider"
          value={formData.provider || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option value="" disabled>
            Select Provider
          </option>
          <option value="PayPal">PayPal</option>
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
          <option value="Vodafone">Vodafone</option>
          <option value="Orange">Orange</option>
        </select>
      </div>

      {/* Conditional Fields for Visa or MasterCard */}
      {['Visa', 'MasterCard'].includes(formData.provider || '') && (
        <>
          {/* Card Number Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="card_number" className="text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="card_number"
              name="card_number"
              value={formData.card_number || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              pattern="[0-9]{16}"
              title="Enter a 16-digit card number"
            />
          </div>

          {/* Expiry Date Field */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="expires_at" className="text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              id="expiry_date"
              name="expiry_date"
              value={formData.expiry_date || ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </>
      )}


      {/* Type Field */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="type" className="text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          id="method_type"
          name="method_type"
          value={formData.method_type || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option value="" disabled>
            Select Type
          </option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
          <option value="mobile">Mobile</option>
          <option value="online wallet">Online Wallet</option>
        </select>
      </div>

      {/* Currency Field */}
      {/* <div className="flex flex-col space-y-2">
        <label htmlFor="currency" className="text-sm font-medium text-gray-700">
          Currency
        </label>
        <select
          id="currency"
          name="currency"
          value={formData.currency || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option value="" disabled>
            Select Currency
          </option>
          <option value="USD">USD</option>
          <option value="EGP">EGP</option>
        </select>
      </div> */}

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-primary1 text-white px-4 py-2 rounded hover:bg-primary2 transition-colors duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default AddMethodForm;
