import type { Metadata } from 'next';
import DashboardNavBar from '../ui/dashboard/DashboardNavBar';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'The main concolse of the app for controlling the users to interact with the app',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row bg-primary4 text-primary1 h-screen w-screen" >
      <DashboardNavBar />
      {children}
    </div>
  );
}