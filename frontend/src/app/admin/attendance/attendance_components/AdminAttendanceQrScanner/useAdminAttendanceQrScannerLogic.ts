"use client";

// RESPONSIBILITY: Handles the state and mock verification logic for the Kiosk-mode QR Scanner.
// DATA FLOW: Simulate Scan Button → useAdminAttendanceQrScannerLogic (state machine) → AdminAttendanceQrScannerModal (view)
import { useState, useCallback } from 'react';
import { adminToast } from '@/app/admin/admin_layout/AdminFeedback/AdminToastService';
import type { AdminAttendanceQrScanStatus, AdminAttendanceQrScanHistoryRecord } from '@/app/admin/attendance/attendance_components/AdminAttendanceQrScanner/AdminAttendanceQrScannerTypes';
import {
  ADMIN_ATTENDANCE_QR_INITIAL_HISTORY,
  ADMIN_ATTENDANCE_QR_MOCK_ACTIVE_NAME,
  ADMIN_ATTENDANCE_QR_TOAST_CHECKIN_SUCCESS,
  ADMIN_ATTENDANCE_QR_SCAN_DELAY_MS,
  ADMIN_ATTENDANCE_QR_MOCK_ID_PREFIX,
} from '@/app/admin/attendance/attendance_components/AdminAttendanceQrScanner/AdminAttendanceQrScannerConstants';

/**
 * useAdminAttendanceQrScannerLogic
 * Manages the state machine for the front-desk Kiosk QR scanner flow.
 * States: IDLE → SCANNING (simulated delay) → ACTIVE | EXPIRED.
 * handleCheckIn appends a new record to the local history log and resets to IDLE.
 * When backend is live, replace the setTimeout simulation with a real API call to POST /admin/attendance.
 */
export function useAdminAttendanceQrScannerLogic() {
  const [status, setStatus] = useState<AdminAttendanceQrScanStatus>('IDLE');
  const [history, setHistory] = useState<AdminAttendanceQrScanHistoryRecord[]>(ADMIN_ATTENDANCE_QR_INITIAL_HISTORY);
  // Counter used for deterministic mock IDs — avoids Math.random() magic (Rule 35)
  const [scanCounter, setScanCounter] = useState(10);

  /** Simulates a QR scan with a network delay. simulateActive=true → ACTIVE, false → EXPIRED. */
  const handleSimulateScan = useCallback((simulateActive: boolean) => {
    setStatus('SCANNING');
    setTimeout(() => {
      setStatus(simulateActive ? 'ACTIVE' : 'EXPIRED');
    }, ADMIN_ATTENDANCE_QR_SCAN_DELAY_MS);
  }, []);

  /** Logs the verified check-in to the history panel and resets the scanner to IDLE. */
  const handleCheckIn = useCallback(() => {
    setScanCounter(prev => {
      const nextCount = prev + 1;
      setHistory(prevHistory => [
        {
          id: `${ADMIN_ATTENDANCE_QR_MOCK_ID_PREFIX}${nextCount}`,
          time: new Date().toLocaleTimeString(),
          name: ADMIN_ATTENDANCE_QR_MOCK_ACTIVE_NAME,
        },
        ...prevHistory,
      ]);
      return nextCount;
    });
    // Toast message sourced from constants (Rule 14 — no hardcoded UI strings)
    adminToast.success(ADMIN_ATTENDANCE_QR_TOAST_CHECKIN_SUCCESS, 'admin-success-5aced26f');
    setStatus('IDLE');
  }, []);

  /** Resets the scanner panel back to IDLE without logging a check-in. */
  const resetStatus = useCallback(() => setStatus('IDLE'), []);

  return { status, history, handleSimulateScan, handleCheckIn, resetStatus };
}
