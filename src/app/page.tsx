'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { DashboardMain } from '@/features/dashboard/components/DashboardMain';

export default function HomePage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // تا زمانی که در کلاینت mount نشده، یک لودینگ ساده یا null بده تا Hydration Error نخوری
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <DashboardMain />;
}