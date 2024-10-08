// app/instructor/page.js (Instructor Verification)
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function InstructorVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const msg = searchParams?.get('msg') || '';
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (msg === 'Login Successful') {
      router.push('/instructor/dashboard');
    }
  }, [msg, router]);

  const handleLogin = () => {
    setLoading(true);
    window.location.href = '/api/google';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">Instructor Verification</h1>
        <div className="mt-8">
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium 
              ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} 
              transition-colors`}
          >
            {loading ? 'Redirecting to Google...' : 'Login with Google'}
          </button>
        </div>
      </div>
    </div>
  );
}