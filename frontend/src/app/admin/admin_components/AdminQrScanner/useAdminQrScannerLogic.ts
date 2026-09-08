// RESPONSIBILITY: Handles the state and mock verification logic for the Kiosk-mode QR Scanner.
// DATA FLOW: Simulate Scan Button → useAdminQrScannerLogic (state machine) → AdminQrScannerModal (view)
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { AdminQrScanStatus, AdminQrScanHistoryRecord } from './AdminQrScannerTypes';
import {
  ADMIN_QR_INITIAL_HISTORY,
  ADMIN_QR_MOCK_ACTIVE_NAME,
  ADMIN_QR_TOAST_CHECKIN_SUCCESS,
  ADMIN_QR_SCAN_DELAY_MS,
  ADMIN_QR_MOCK_ID_PREFIX,
} from './AdminQrScannerConstants';

/**
 * useAdminQrScannerLogic
 * Manages the state machine for the front-desk Kiosk QR scanner flow.
 * States: IDLE → SCANNING (simulated delay) → ACTIVE | EXPIRED.
 * handleCheckIn appends a new record to the local history log and resets to IDLE.
 * When backend is live, replace the setTimeout simulation with a real API call to POST /admin/attendance.
 */
export function useAdminQrScannerLogic() {
  const [status, setStatus] = useState<AdminQrScanStatus>('IDLE');
  const [history, setHistory] = useState<AdminQrScanHistoryRecord[]>(ADMIN_QR_INITIAL_HISTORY);
  // Counter used for deterministic mock IDs — avoids Math.random() magic (Rule 35)
  const [scanCounter, setScanCounter] = useState(10);

  /** Simulates a QR scan with a network delay. simulateActive=true → ACTIVE, false → EXPIRED. */
  const handleSimulateScan = useCallback((simulateActive: boolean) => {
    setStatus('SCANNING');
    setTimeout(() => {
      setStatus(simulateActive ? 'ACTIVE' : 'EXPIRED');
    }, ADMIN_QR_SCAN_DELAY_MS);
  }, []);

  /** Logs the verified check-in to the history panel and resets the scanner to IDLE. */
  const handleCheckIn = useCallback(() => {
    setScanCounter(prev => {
      const nextCount = prev + 1;
      setHistory(prevHistory => [
        {
          id: `${ADMIN_QR_MOCK_ID_PREFIX}${nextCount}`,
          time: new Date().toLocaleTimeString(),
          name: ADMIN_QR_MOCK_ACTIVE_NAME,
        },
        ...prevHistory,
      ]);
      return nextCount;
    });
    // Toast message sourced from constants (Rule 14 — no hardcoded UI strings)
    toast.success(ADMIN_QR_TOAST_CHECKIN_SUCCESS);
    setStatus('IDLE');
  }, []);

  /** Resets the scanner panel back to IDLE without logging a check-in. */
  const resetStatus = useCallback(() => setStatus('IDLE'), []);

  return { status, history, handleSimulateScan, handleCheckIn, resetStatus };
}
