export type SuperadminSystemSlaStatus = 'MET' | 'BREACHED' | 'WARNING';

export interface SuperadminTenantSla {
  id: string;
  name: string;
  targetSla: number;
  actualUptime: number;
  downtimeIncidents: number;
  downtimeMinutes: number;
  status: SuperadminSystemSlaStatus;
}
