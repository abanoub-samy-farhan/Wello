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
    address: user.address || '', 
  });
  console.log(formData);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmition = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(formData);
  }

  

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold">Enter Your Information</h1>
      </div>
      <form onSubmit={handleSubmition} className="space-y-4 md:w-1/2 
      justify-center items-center ">
        <div className="flex flex-col justify-start items-start">
          <label htmlFor="full_name">Full Name:</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="border border-primary1 p-2 rounded w-full"
            required
          />
        </div>
        <div className='flex flex-col justify-start items-start'>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-primary1 p-2 rounded w-full"
            required
          />
        </div>
        <div className='flex flex-col justify-start items-start'>
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="tel"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="border border-primary1 p-2 rounded w-full"
            required
          />
        </div>
        <button type="submit" className="bg-primary1 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InformationEntry;
