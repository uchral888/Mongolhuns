'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { StudentDashboard } from '@/components/student/student-dashboard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function StudentDashboardPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      redirect('/auth/login');
    }
    
    if ((session.user as any)?.role !== 'student') {
      redirect('/admin/dashboard');
    }
    
    setIsLoading(false);
  }, [session, status]);

  if (isLoading || status === 'loading') {
    return <LoadingSpinner />;
  }

  return <StudentDashboard />;
}