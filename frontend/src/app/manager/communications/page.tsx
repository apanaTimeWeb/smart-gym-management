// RESPONSIBILITY: Framework route boundary for the Manager communications module; renders the route-level shell, loading, error, or 404 state.
import { Suspense } from 'react';
import ManagerCommunicationsMain from '@/app/manager/communications/communications_components/ManagerCommunicationsMain/ManagerCommunicationsMain';
import ManagerCommunicationsLoading from '@/app/manager/communications/loading';

export default function CommunicationsPage() { return (
    <Suspense fallback={<ManagerCommunicationsLoading />}>
      <ManagerCommunicationsMain />
    </Suspense>
  ); }
