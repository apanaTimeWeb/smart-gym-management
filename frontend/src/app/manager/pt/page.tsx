import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for /manager/pt. Rule 8 compliant.
import type { Metadata } from 'next';
import ManagerPtMain from '@/app/manager/pt/pt_components/ManagerPtMain/ManagerPtMain';

export const metadata: Metadata = { title: 'Personal Training | Manager | GymSmart' };

export default function ManagerPtPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <ManagerPtMain />
    </Suspense>
  );
}
