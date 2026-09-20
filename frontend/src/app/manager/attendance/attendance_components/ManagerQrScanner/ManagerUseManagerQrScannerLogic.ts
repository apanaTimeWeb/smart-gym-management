// DATA FLOW: QR input → Attendance member lookup → scanner state → check-in API/MSW → query refresh → visible history.
// RESPONSIBILITY: Owns Attendance QR scanning, member resolution, check-in mutation, and demo-mode simulation.
'use client';
import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { attendanceApi } from '@/app/manager/attendance/attendance_api/ManagerAttendanceApi';
import { MANAGER_QR_DEMO_ACTIVE_TOKEN, MANAGER_QR_DEMO_EXPIRED_TOKEN, MANAGER_QR_INITIAL_HISTORY, MANAGER_QR_SCAN_DELAY_MS, MANAGER_QR_MOCK_ID_PREFIX } from '@/app/manager/attendance/attendance_components/ManagerQrScanner/ManagerQrScannerConstants';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { showManagerErrorToast } from '@/app/manager/manager_infrastructure/ManagerToastService';
import type { MemberSnapshot } from '@/app/manager/attendance/attendance_types/ManagerAttendanceSnapshotTypes';
import type { Attendance } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';
import type { ManagerQrScanStatus, ManagerQrScanHistoryRecord } from '@/app/manager/attendance/attendance_types/ManagerQrScannerTypes';


/** Runs the QR scanner state machine, resolves scanned members through Attendance APIs, and records check-ins through the same API path as the production Attendance module. */
export function useManagerQrScannerLogic() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<ManagerQrScanStatus>('IDLE');
  const [history, setHistory] = useState<ManagerQrScanHistoryRecord[]>(MANAGER_QR_INITIAL_HISTORY);
  const [currentMember, setCurrentMember] = useState<MemberSnapshot | null>(null);
  const [scanValue, setScanValue] = useState('');
  const [scanCounter, setScanCounter] = useState(10);

  const resolveMember = useCallback(async (rawScanValue: string) => {
    const normalized = rawScanValue.trim();
    if (!normalized) return;
    setScanValue(normalized);
    setStatus('SCANNING');
    try {
      const response = await attendanceApi.fetchAttendanceMembers({ search: normalized });
      const matchedMember = response.data?.members?.find((member) =>
        String(member.id).toLowerCase() === normalized.toLowerCase() || member.name.toLowerCase() === normalized.toLowerCase(),
      );
      if (!matchedMember) {
        throw new Error(response.message || 'No matching member found for this QR value.');
      }
      setCurrentMember(matchedMember);
      setStatus(matchedMember.status === 'ACTIVE' ? 'ACTIVE' : 'EXPIRED');
    } catch (error: unknown) {
      setCurrentMember(null);
      setStatus('IDLE');
      showManagerErrorToast(error, 'manager-qr-resolve-error');
    }
  }, []);

  const handleSimulateScan = useCallback((simulateActive: boolean) => {
    if (!ManagerEnvConfig.demoMode) return;
    const demoToken = simulateActive ? MANAGER_QR_DEMO_ACTIVE_TOKEN : MANAGER_QR_DEMO_EXPIRED_TOKEN;
    setScanValue(demoToken);
    setStatus('SCANNING');
    window.setTimeout(() => { void resolveMember(demoToken); }, MANAGER_QR_SCAN_DELAY_MS);
  }, [resolveMember]);

  const handleCheckIn = useCallback(async () => {
    if (!currentMember || currentMember.status !== 'ACTIVE') return;
    try {
      const response = await attendanceApi.markAttendance({
        memberId: currentMember.id,
        date: new Date().toISOString().slice(0, 10),
        checkIn: new Date().toLocaleTimeString(),
        type: 'MEMBER',
      });
      const record: Attendance | null = response.data ?? null;
      setScanCounter((current) => current + 1);
      setHistory((current) => [
        {
          id: record?.id ?? `${MANAGER_QR_MOCK_ID_PREFIX}${scanCounter + 1}`,
          time: record?.checkIn ?? new Date().toLocaleTimeString(),
          name: record?.member?.name ?? currentMember.name,
        },
        ...current,
      ]);
      await queryClient.invalidateQueries({ queryKey: ['manager', 'attendance'] });
      setStatus('IDLE');
      setCurrentMember(null);
      setScanValue('');
    } catch (error: unknown) {
      showManagerErrorToast(error, 'manager-qr-checkin-error');
    }
  }, [currentMember, queryClient, scanCounter]);

  const resetStatus = useCallback(() => {
    setStatus('IDLE');
    setCurrentMember(null);
    setScanValue('');
  }, []);

  return {
    status,
    history,
    currentMember,
    scanValue,
    setScanValue,
    resolveMember,
    handleSimulateScan,
    handleCheckIn,
    resetStatus,
    demoMode: ManagerEnvConfig.demoMode,
  };
}
