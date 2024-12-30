'use client';
import React from 'react';
import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';

interface UserDetails {
  id: string;
  full_name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
}

interface ProfileDetailsProps {
  user: UserDetails;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <section className="bg-primary4 rounded-lg md:ml-20 p-10">
      <h2 className="text-3xl font-bold text-primary1 mb-6">Your Profile</h2>
      <div className="space-y-6">
        {/* Full Name */}
        <div className="flex flex-col">
          <span className="text-primary1 font-medium">Full Name</span>
          <span className="text-primary1 mt-2">{user.full_name}</span>
        </div>
        {/* Email */}
        <div className="flex flex-col">
          <span className="text-primary1 font-medium">Email</span>
          <span className="text-primary1 mt-2">{user.email}</span>
        </div>
        {/* Phone Number */}
        {user.phoneNumber && (
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-primary1 font-medium">Phone Number</span>
            </div>
            <span className="text-primary1 mt-2">{user.phoneNumber}</span>
          </div>
        )}
        {/* Address */}
        {user.address && (
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-primary1 font-medium">Address</span>
              <button
                className="ml-2 text-primary1 hover:text-primary2 focus:outline-none"
                aria-label="Edit Address"
                onClick={() => setIsEditing(!isEditing)}
              >
                <EditOutlined />
              </button>
            </div>
            {isEditing ? (
              <input
                type="text"
                className="bg-white text-primary1 mt-2 px-2 py-1 rounded-md focus:outline-none"
                value={user.address}
                placeholder={user.address}
                onChange={(e) => {
                  user.address = e.target.value;
                }}
              >
              </input>
            ) : <span className="text-primary1 mt-2">{user.address}</span>}
          </div>
        )}
        {/* Copy public profile to clipboard button*/}
        <button
          className="bg-primary2 text-primary1 py-2 px-4 rounded-md hover:bg-primary3 focus:outline-none"
          onClick={() => navigator.clipboard.writeText(`http://localhost:3000/profile/${user.user_id}`)}
        >
          Copy Public Profile
        </button>
      </div>
    </section>
  );
};

export default ProfileDetails;