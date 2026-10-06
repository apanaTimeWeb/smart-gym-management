// RESPONSIBILITY: Renders the manager_communications route boundary (CommunicationsPage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerCommunicationsLoading from '@/app/frontend_manager/manager_communications/loading';
import ManagerCommunicationsMain from '@/app/frontend_manager/manager_communications/manager_communications_components/manager_communications_main/ManagerCommunicationsMain';

/** @description Route-level CommunicationsPage for the Manager frontend module. */
export default function CommunicationsPage() { return (
    <Suspense fallback={<ManagerCommunicationsLoading />}>
      <ManagerCommunicationsMain />
    </Suspense>
  ); }
