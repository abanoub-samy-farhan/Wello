'use client';
import { useEffect } from 'react';

interface VerifyProps {
  token: string;
  email: string;
}

const VerificationLink: React.FC<VerifyProps> = ({token, email}) =>{
    useEffect(() => {
      const response = fetch('http://localhost:8000/api/auth/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, email }),
      }).then((res) => {
        if (res.ok) {
          window.location.href = '/auth/sign_in';
        } else {
          console.log('Email verification failed');
        }
      });
    }, []);
    return (<></>)
  }
  
export default VerificationLink;