// RESPONSIBILITY: Entry component for the HR module. Wraps the UI in the hook-based state facade and handles page layout.
'use client';
import { ManagerHrContent } from '@/app/manager/hr/hr_components/ManagerHrMain/ManagerHrContent/ManagerHrContent';
import type { HrInitialData } from '@/app/manager/hr/hr_types/ManagerHrTypes';


export default function ManagerHrMain({ initialData }: { initialData?: HrInitialData | null }) {
  return <ManagerHrContent />;
}
