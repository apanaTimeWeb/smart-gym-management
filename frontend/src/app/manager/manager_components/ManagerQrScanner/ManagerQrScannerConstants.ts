// RESPONSIBILITY: Defines mock data and constants for the Manager QR Scanner feature.
import type { ManagerQrScanHistoryRecord, ManagerQrScanStatus } from './ManagerQrScannerTypes';

export const MANAGER_QR_INITIAL_HISTORY: ManagerQrScanHistoryRecord[] = [];

// Mock member data (replace with real scanned member data when backend is live)
export const MANAGER_QR_MOCK_ACTIVE_NAME = 'Rahul Sharma';
export const MANAGER_QR_MOCK_ACTIVE_ID = 'M-0045';
export const MANAGER_QR_MOCK_PT_INFO = 'PT Session Scheduled Today at 6:00 PM';
export const MANAGER_QR_MOCK_AVATAR_URL = 'https://i.pravatar.cc/300?u=a042581f4e29026704d';

/** Maps each scan status to its human-readable display label. (Rule 35 — No Magic Strings) */
export const MANAGER_QR_STATUS_LABELS: Record<ManagerQrScanStatus, string> = {
  IDLE: '',
  SCANNING: 'Verifying...',
  ACTIVE: 'MEMBERSHIP ACTIVE',
  EXPIRED: 'MEMBERSHIP EXPIRED',
};
