import React, { useState } from 'react';
import { User } from '../../interfaces';

interface InformationEntryProps {
  user: Partial<User>;
  handleSubmit: (user: User) => void;
}

const InformationEntry: React.FC<InformationEntryProps> = ({ user, handleSubmit }) => {
  const [formData, setFormData] = useState({
    user_id: user.user_id || '',
    email: user.email || '',
    full_name: user.full_name || '',
    phone_number: user.phone_number || '',
    is_suspended: user.is_suspended || false,
    address: '', 
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const TestSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting User Data:', formData);
    handleSubmit(formData);
  };

  return (
    <div>
      <h1>Information Entry</h1>
      <h2>Let's get started</h2>
      <form onSubmit={TestSubmit} className="space-y-4">
        <div>
          <label htmlFor="full_name">Full Name:</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InformationEntry;
