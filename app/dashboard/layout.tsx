import type { Metadata } from 'next';
import DashboardNavBar from '../ui/dashboard/DashboardNavBar';
import Loading from '../loading';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'The main concolse of the app for controlling the users to interact with the app',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row bg-primary4 text-primary1 h-screen w-screen" >
      <Suspense fallback={<Loading />}>
        <DashboardNavBar />
        {children}
      </Suspense>
    </div>
  );
}