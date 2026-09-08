// RESPONSIBILITY: Handles the state and mock verification logic for the Kiosk-mode QR Scanner.
// DATA FLOW: Simulate Scan Button → useManagerQrScannerLogic (state machine) → ManagerQrScannerModal (view)
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { ManagerQrScanStatus, ManagerQrScanHistoryRecord } from './ManagerQrScannerTypes';
import { MANAGER_QR_INITIAL_HISTORY, MANAGER_QR_MOCK_ACTIVE_NAME } from './ManagerQrScannerConstants';

/**
 * useManagerQrScannerLogic
 * Manages the state machine for the front-desk Kiosk QR scanner flow.
 * States: IDLE → SCANNING (1s simulated delay) → ACTIVE | EXPIRED.
 * Provides handleCheckIn which appends a new record to the local history log and resets to IDLE.
 * When backend is live, replace the setTimeout simulation with a real API call to POST /manager/attendance.
 */
export function useManagerQrScannerLogic() {
  const [status, setStatus] = useState<ManagerQrScanStatus>('IDLE');
  const [history, setHistory] = useState<ManagerQrScanHistoryRecord[]>(MANAGER_QR_INITIAL_HISTORY);

  const handleSimulateScan = useCallback((simulateActive: boolean) => {
    setStatus('SCANNING');
    setTimeout(() => {
      setStatus(simulateActive ? 'ACTIVE' : 'EXPIRED');
    }, 1000);
  }, []);

  const handleCheckIn = useCallback(() => {
    setHistory(prev => [
      { 
        id: `M-00${Math.floor(Math.random() * 100) + 10}`, 
        time: new Date().toLocaleTimeString(), 
        name: MANAGER_QR_MOCK_ACTIVE_NAME 
      },
      ...prev
    ]);
    
    // Using toast directly here since we don't have a backend message, 
    // but typically this string would come from an API response envelope.
    toast.success('Check-in successful!');
    setStatus('IDLE');
  }, []);

  const resetStatus = useCallback(() => setStatus('IDLE'), []);

  return {
    status,
    history,
    handleSimulateScan,
    handleCheckIn,
    resetStatus
  };
}
