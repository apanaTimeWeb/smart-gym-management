// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ChurnKPIData } from '@/app/manager/communications/communications_types/ManagerCommunications_types';

export interface ManagerChurnRecoveryKPIsProps {
  kpis: ChurnKPIData | undefined;
}
