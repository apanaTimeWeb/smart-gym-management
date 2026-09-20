// RESPONSIBILITY: Server Component entry point for /manager/pt. Rule 8 compliant.
import { Suspense } from 'react';
import ManagerPtLoading from '@/app/manager/pt/loading';
import ManagerPtMain from '@/app/manager/pt/pt_components/ManagerPtMain/ManagerPtMain';
import type { Metadata } from 'next';


export const metadata: Metadata = { title: 'Personal Training | Manager | GymSmart' };

export default function ManagerPtPage() {
  return (
    <Suspense fallback={<ManagerPtLoading />}>
      <ManagerPtMain />
    </Suspense>
  );
}
