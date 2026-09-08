// RESPONSIBILITY: Defines TypeScript types for the Manager QR Scanner feature.

/** Union type representing the Kiosk scanner state machine states. */
export type ManagerQrScanStatus = 'IDLE' | 'SCANNING' | 'ACTIVE' | 'EXPIRED';

/** Shape of a single entry in the recent check-in history panel. */
export interface ManagerQrScanHistoryRecord {
  id: string;
  time: string;
  name: string;
}

/** Props for the top-level Kiosk scanner modal component. */
export interface ManagerQrScannerModalProps {
  open: boolean;
  onClose: () => void;
}
