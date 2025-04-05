'use client';

import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { LanguageProvider } from './LanguageContext';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </AuthProvider>
  );
} 