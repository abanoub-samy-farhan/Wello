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
  const [formData, setFormData] = useState<Partial<PaymentMethod>>(paymentMethod);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmition = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(formData as PaymentMethod);
    }

  return (
    <form
      onSubmit={handleSubmition}
      className="md:w-1/3  mx-auto rounded-lg  space-y-6"
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
          <option value="" disabled>Select Provider</option>
          <option value="PayPal">PayPal</option>
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
          <option value="Vodafone">Vodafone</option>
          <option value="Orange">Orange</option>
        </select>
      </div>

      {/* Type Field */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="type" className="text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type || ''}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        >
          <option value="" disabled>Select Type</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
          <option value="mobile">Mobile</option>
          <option value="online wallet">Online Wallet</option>
        </select>
      </div>

      {/* Currency Field */}
      <div className="flex flex-col space-y-2">
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
          <option value="" disabled>Select Currency</option>
          <option value="USD">USD</option>
          <option value="EGP">EGP</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-primary1 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default AddMethodForm;
