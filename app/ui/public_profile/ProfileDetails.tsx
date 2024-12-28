// /app/ui/public_profile/ProfileDetails.tsx

'use client';
import React from 'react';

interface UserDetails {
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
}

interface ProfileDetailsProps {
  user: UserDetails;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  return (
    <section className="bg-white p-8 rounded-lg shadow-lg mx-auto max-w-2xl mt-8">
      {/* User's Name */}
      <h1 className="text-4xl font-bold text-center mb-4 text-primary1">
        {user.name}
      </h1>
      <h2 className="text-xl font-semibold mb-8 text-center text-primary1">
        Profile Details
      </h2>
      <div className="space-y-6">
        {/* Email */}
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="text-lg font-medium text-primary1">
            Email:
          </span>
          <span className="text-lg font-semibold text-primary1">
            {user.email}
          </span>
        </div>
        {/* Phone Number */}
        {user.phoneNumber && (
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="text-lg font-medium text-primary1">
              Phone:
            </span>
            <span className="text-lg font-semibold text-primary1">
              {user.phoneNumber}
            </span>
          </div>
        )}
        {/* Address */}
        {user.address && (
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="text-lg font-medium text-primary1">
              Address:
            </span>
            <span className="text-lg font-semibold text-primary1">
              {user.address}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileDetails;