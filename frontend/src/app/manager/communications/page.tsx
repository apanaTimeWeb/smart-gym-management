import { Suspense } from 'react';
// RESPONSIBILITY: Framework route boundary for the Manager communications module; renders the route-level shell, loading, error, or 404 state.
import ManagerCommunicationsLoading from '@/app/manager/communications/loading';
import ManagerCommunicationsMain from '@/app/manager/communications/communications_components/ManagerCommunicationsMain/ManagerCommunicationsMain';
export default function CommunicationsPage() { return (
    <Suspense fallback={<ManagerCommunicationsLoading />}>
      <ManagerCommunicationsMain />
    </Suspense>
  ); }
