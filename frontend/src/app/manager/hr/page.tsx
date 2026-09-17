// RESPONSIBILITY: Server route entry for Manager HR; delegates async data ownership to TanStack Query so browser MSW can provide frontend-first data.
import ManagerHrMain from '@/app/manager/hr/hr_components/ManagerHrMain/ManagerHrMain';

export default function HrPage() {
  return <ManagerHrMain />;
}
