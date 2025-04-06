'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Login from '../components/Login';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If already authenticated, redirect to home
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return <Login />;
} 