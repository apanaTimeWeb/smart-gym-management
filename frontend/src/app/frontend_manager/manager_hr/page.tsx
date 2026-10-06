// RESPONSIBILITY: Server route entry for Manager HR; delegates async data ownership to TanStack Query so browser MSW can provide frontend-first data.
import ManagerHrMain from '@/app/frontend_manager/manager_hr/manager_hr_components/manager_hr_main/ManagerHrMain';

/** @description Route-level HrPage for the Manager frontend module. */
export default function HrPage() {
  return <ManagerHrMain />;
}
