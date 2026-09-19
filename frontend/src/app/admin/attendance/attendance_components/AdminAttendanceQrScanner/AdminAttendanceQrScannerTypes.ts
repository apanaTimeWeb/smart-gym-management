// RESPONSIBILITY: Defines TypeScript types for the Admin QR Scanner feature.

/** Union type representing the Kiosk scanner state machine states. */
export type AdminAttendanceQrScanStatus = 'IDLE' | 'SCANNING' | 'ACTIVE' | 'EXPIRED';

/** Shape of a single entry in the recent check-in history panel. */
export interface AdminAttendanceQrScanHistoryRecord {
  id: string;
  time: string;
  name: string;
}

/** Props for the top-level Kiosk scanner modal component. */
export interface AdminAttendanceQrScannerModalProps {
  open: boolean;
  onClose: () => void;
}
