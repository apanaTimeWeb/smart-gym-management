// RESPONSIBILITY: Defines non-business UI constants for the Manager QR Scanner state machine.
import type { ManagerQrScanHistoryRecord, ManagerQrScanStatus } from '@/app/manager/attendance/attendance_types/ManagerQrScannerTypes';

export const MANAGER_QR_INITIAL_HISTORY: ManagerQrScanHistoryRecord[] = [];
export const MANAGER_QR_MOCK_ID_PREFIX = 'M-00';
export const MANAGER_QR_SCAN_DELAY_MS = 1000;

/** Maps scanner states to their UI labels. */
export const MANAGER_QR_STATUS_LABELS: Record<ManagerQrScanStatus, string> = {
  IDLE: '',
  SCANNING: 'Verifying...',
  ACTIVE: 'MEMBERSHIP ACTIVE',
  EXPIRED: 'MEMBERSHIP EXPIRED',
};

export const MANAGER_QR_DEMO_ACTIVE_TOKEN = 'demo-active';
export const MANAGER_QR_DEMO_EXPIRED_TOKEN = 'demo-expired';
