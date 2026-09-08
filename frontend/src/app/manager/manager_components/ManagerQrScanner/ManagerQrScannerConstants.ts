// RESPONSIBILITY: Defines mock data and constants for the Manager QR Scanner feature.
import type { ManagerQrScanHistoryRecord, ManagerQrScanStatus } from './ManagerQrScannerTypes';

export const MANAGER_QR_INITIAL_HISTORY: ManagerQrScanHistoryRecord[] = [];

// Mock member data (replace with real scanned member data when backend is live)
export const MANAGER_QR_MOCK_ACTIVE_NAME = 'Rahul Sharma';
export const MANAGER_QR_MOCK_ACTIVE_ID = 'M-0045';
export const MANAGER_QR_MOCK_PT_INFO = 'PT Session Scheduled Today at 6:00 PM';
export const MANAGER_QR_MOCK_AVATAR_URL = 'https://i.pravatar.cc/300?u=a042581f4e29026704d';

/** Prefix for mock-generated check-in IDs. Avoids Math.random() magic strings (Rule 35). */
export const MANAGER_QR_MOCK_ID_PREFIX = 'M-00';

/** Simulated network delay in ms for the QR scan verification step (Rule 35 — no magic numbers). */
export const MANAGER_QR_SCAN_DELAY_MS = 1000;

/**
 * Toast message shown on successful check-in.
 * Sourced from constants per Rule 14 (no hardcoded UI strings in hooks/components).
 * When backend is live, replace with the `message` field from the API response envelope.
 */
export const MANAGER_QR_TOAST_CHECKIN_SUCCESS = 'Check-in successful! Member verified.';

/** Maps each scan status to its human-readable display label. (Rule 35 — No Magic Strings) */
export const MANAGER_QR_STATUS_LABELS: Record<ManagerQrScanStatus, string> = {
  IDLE: '',
  SCANNING: 'Verifying...',
  ACTIVE: 'MEMBERSHIP ACTIVE',
  EXPIRED: 'MEMBERSHIP EXPIRED',
};
