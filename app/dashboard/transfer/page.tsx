// /app/dashboard/transfer/page.tsx
'use client';
import TransferForm from '../../ui/transfer/TransferForm';
import { useSearchParams } from 'next/navigation';

const TransferPage = () => {
  
  const searchParams = useSearchParams();
  const user_id = searchParams.get('user_id');
  const action = searchParams.get('action');
  return (
    <div className="min-h-screen w-screen md:ml-20 p-10 bg-primary4 pt-16">
      <TransferForm user_id={user_id} transfer_type={action as 'Send' | 'Request' | null}/>
    </div>
  );
};

export default TransferPage;