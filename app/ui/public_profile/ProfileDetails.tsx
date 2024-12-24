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
    <section className="bg-white p-4 sm:p-6 rounded-3xl shadow mb-6">
      {/* User's Name */}
      <h1 className="text-5xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 font-sans text-primary1">
        {user.name}
      </h1>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-sans text-primary1 text-center">
        Profile Details
      </h2>
      <div className="space-y-4 sm:space-y-6">
        {/* Email */}
        <div className="flex flex-wrap items-center text-center sm:text-left">
          <span className="w-full sm:w-auto text-lg font-medium mr-2 text-primary1">
            Email:
          </span>
          <span className="w-full sm:w-auto text-lg font-bold text-primary1">
            {user.email}
          </span>
        </div>
        {/* Phone Number */}
        {user.phoneNumber && (
          <div className="flex flex-wrap items-center text-center sm:text-left">
            <span className="w-full sm:w-auto text-lg font-medium mr-2 text-primary1">
              Phone:
            </span>
            <span className="w-full sm:w-auto text-lg font-bold text-primary1">
              {user.phoneNumber}
            </span>
          </div>
        )}
        {/* Address */}
        {user.address && (
          <div className="flex flex-wrap items-center text-center sm:text-left">
            <span className="w-full sm:w-auto text-lg font-medium mr-2 text-primary1">
              Address:
            </span>
            <span className="w-full sm:w-auto text-lg font-bold text-primary1">
              {user.address}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileDetails;