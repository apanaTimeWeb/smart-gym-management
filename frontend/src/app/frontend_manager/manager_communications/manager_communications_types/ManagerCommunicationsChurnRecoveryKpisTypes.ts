// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ChurnKPIData } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';

export interface ManagerCommunicationsChurnRecoveryKPIsProps {
  kpis: ChurnKPIData | undefined;
}
