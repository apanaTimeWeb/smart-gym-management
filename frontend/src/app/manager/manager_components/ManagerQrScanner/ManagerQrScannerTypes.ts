// RESPONSIBILITY: Defines TypeScript types for the Manager QR Scanner feature.
export type ManagerQrScanStatus = 'IDLE' | 'SCANNING' | 'ACTIVE' | 'EXPIRED';

export interface ManagerQrScanHistoryRecord {
  id: string;
  time: string;
  name: string;
}
