'use client';
import VerificationMessage from '../../ui/auth/VerificationMessage';
import VerificationLink from '@/app/ui/auth/VerificationLink';
import { useSearchParams } from 'next/navigation';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const otp = searchParams.get('otp');
  const email = searchParams.get('email');
  console.log('token:', otp, 'email:', email);
  if (otp && email) {
    return <VerificationLink token={otp} email={email} />;
  }
  else
    return <VerificationMessage />;
}