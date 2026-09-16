import { Suspense } from 'react';
// RESPONSIBILITY: Framework route boundary for the Manager communications module; renders the route-level shell, loading, error, or 404 state.
import ManagerCommunicationsMain from '@/app/manager/communications/communications_components/ManagerCommunicationsMain/ManagerCommunicationsMain';
export default function CommunicationsPage() { return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <ManagerCommunicationsMain />
    </Suspense>
  ); }
