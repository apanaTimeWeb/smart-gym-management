// RESPONSIBILITY: Handles the state and mock verification logic for the Kiosk-mode QR Scanner.
// DATA FLOW: Simulate Scan Button → useManagerQrScannerLogic (state machine) → ManagerQrScannerModal (view)
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { ManagerQrScanStatus, ManagerQrScanHistoryRecord } from './ManagerQrScannerTypes';
import {
  MANAGER_QR_INITIAL_HISTORY,
  MANAGER_QR_MOCK_ACTIVE_NAME,
  MANAGER_QR_TOAST_CHECKIN_SUCCESS,
  MANAGER_QR_SCAN_DELAY_MS,
  MANAGER_QR_MOCK_ID_PREFIX,
} from './ManagerQrScannerConstants';

/**
 * useManagerQrScannerLogic
 * Manages the state machine for the front-desk Kiosk QR scanner flow.
 * States: IDLE → SCANNING (simulated delay) → ACTIVE | EXPIRED.
 * handleCheckIn appends a new record to the local history log and resets to IDLE.
 * When backend is live, replace the setTimeout simulation with a real API call to POST /manager/attendance.
 */
export function useManagerQrScannerLogic() {
  const [status, setStatus] = useState<ManagerQrScanStatus>('IDLE');
  const [history, setHistory] = useState<ManagerQrScanHistoryRecord[]>(MANAGER_QR_INITIAL_HISTORY);
  // Counter used for deterministic mock IDs — avoids Math.random() magic (Rule 35)
  const [scanCounter, setScanCounter] = useState(10);

  /** Simulates a QR scan with a network delay. simulateActive=true → ACTIVE, false → EXPIRED. */
  const handleSimulateScan = useCallback((simulateActive: boolean) => {
    setStatus('SCANNING');
    setTimeout(() => {
      setStatus(simulateActive ? 'ACTIVE' : 'EXPIRED');
    }, MANAGER_QR_SCAN_DELAY_MS);
  }, []);

  /** Logs the verified check-in to the history panel and resets the scanner to IDLE. */
  const handleCheckIn = useCallback(() => {
    setScanCounter(prev => {
      const nextCount = prev + 1;
      setHistory(prevHistory => [
        {
          id: `${MANAGER_QR_MOCK_ID_PREFIX}${nextCount}`,
          time: new Date().toLocaleTimeString(),
          name: MANAGER_QR_MOCK_ACTIVE_NAME,
        },
        ...prevHistory,
      ]);
      return nextCount;
    });
    // Toast message sourced from constants (Rule 14 — no hardcoded UI strings)
    toast.success(MANAGER_QR_TOAST_CHECKIN_SUCCESS);
    setStatus('IDLE');
  }, []);

  /** Resets the scanner panel back to IDLE without logging a check-in. */
  const resetStatus = useCallback(() => setStatus('IDLE'), []);

  return { status, history, handleSimulateScan, handleCheckIn, resetStatus };
}
