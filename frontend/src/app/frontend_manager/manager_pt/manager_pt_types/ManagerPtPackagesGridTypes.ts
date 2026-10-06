import type { ManagerPtPackage } from '@/app/frontend_manager/manager_pt/manager_pt_types/ManagerPtTypes';

export interface ManagerPtPackagesGridProps {
  packages: ManagerPtPackage[];
  translate: (key: string) => string;
  locale: string;
  currencyCode: string;
}
