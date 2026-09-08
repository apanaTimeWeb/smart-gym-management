// RESPONSIBILITY: Defines TypeScript types for the Admin QR Scanner feature.

/** Union type representing the Kiosk scanner state machine states. */
export type AdminQrScanStatus = 'IDLE' | 'SCANNING' | 'ACTIVE' | 'EXPIRED';

/** Shape of a single entry in the recent check-in history panel. */
export interface AdminQrScanHistoryRecord {
  id: string;
  time: string;
  name: string;
}

/** Props for the top-level Kiosk scanner modal component. */
export interface AdminQrScannerModalProps {
  open: boolean;
  onClose: () => void;
}
