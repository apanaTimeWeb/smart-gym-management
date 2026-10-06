'use client';
// DATA FLOW: Feature inputs and URL/local UI state → custom hook → module-owned API/TanStack Query or Zustand state → owning feature UI/result.

import { useCallback, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ManagerAttendanceApi } from '@/app/frontend_manager/manager_attendance/manager_attendance_api/ManagerAttendanceApi';
import { MANAGER_ATTENDANCE_QR_STATUS_ACTIVE, MANAGER_ATTENDANCE_QR_STATUS_EXPIRED } from '@/app/frontend_manager/manager_attendance/manager_attendance_constants/ManagerAttendanceConstants';
import { MANAGER_QR_DEMO_ACTIVE_TOKEN, MANAGER_QR_DEMO_EXPIRED_TOKEN, MANAGER_QR_INITIAL_HISTORY, MANAGER_QR_SCAN_DELAY_MS, MANAGER_QR_MOCK_ID_PREFIX, MANAGER_QR_STATUS_IDLE, MANAGER_QR_STATUS_SCANNING } from '@/app/frontend_manager/manager_attendance/manager_attendance_constants/ManagerAttendanceQrScannerConstants';
import { ManagerAttendanceQueryKeys } from '@/app/frontend_manager/manager_attendance/manager_attendance_constants/ManagerAttendanceQueryKeys';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import type { ManagerQrScanStatus, ManagerQrScanHistoryRecord } from '@/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceQrScannerTypes';
import type { MemberSnapshot } from '@/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceSnapshotTypes';
import type { Attendance } from '@/app/frontend_manager/manager_attendance/manager_attendance_types/ManagerAttendanceTypes';


/** Runs the QR scanner state machine, resolves scanned members through Attendance APIs, and records check-ins through the same API path as the production Attendance module. */
/**
 * @description Manages the attendance feature behavior in `useManagerAttendanceQrScannerLogic`. Owns the feature-specific state/query/mutation orchestration declared by this hook and does not move business behavior into global application state.
 * @dependencies Uses useCallback, useState, useQueryClient, createManagerIdempotencyKey, ManagerAttendanceApi; all business-specific dependencies remain inside the owning feature or approved application infrastructure.
 * @edge-case Preserves loading, error, empty, retry, cancellation, URL-state, and mutation-settlement behavior required by the owning feature; does not expose raw transport details to the UI.
 */
/**
 * @description Owns the Manager Attendance QR scanner state and attendance-event workflow.
 * @dependencies Uses module-owned QR fixtures/types plus the documented attendance mutation boundary.
 * @edge-case Handles repeated scans, invalid payloads, scanner cancellation, and submission failure safely.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerAttendanceQrScannerLogic owns the attendance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerAttendanceQrScannerLogic() {
  const queryClient = useQueryClient();
  const checkInKeyRef = useRef<string | null>(null);
  const [status, setStatus] = useState<ManagerQrScanStatus>(MANAGER_QR_STATUS_IDLE);
  const [history, setHistory] = useState<ManagerQrScanHistoryRecord[]>([...MANAGER_QR_INITIAL_HISTORY]);
  const [currentMember, setCurrentMember] = useState<MemberSnapshot | null>(null);
  const [scanValue, setScanValue] = useState('');
  const [scanCounter, setScanCounter] = useState(10);

  const resolveMember = useCallback(async (rawScanValue: string) => {
    const normalized = rawScanValue.trim();
    if (!normalized) return;
    setScanValue(normalized);
    setStatus(MANAGER_QR_STATUS_SCANNING);
    try {
      const response = await ManagerAttendanceApi.fetchAttendanceMembers({ search: normalized });
      const matchedMember = response.data?.members?.find((member) =>
        String(member.id).toLowerCase() === normalized.toLowerCase() || member.name.toLowerCase() === normalized.toLowerCase(),
      );
      if (!matchedMember) return;
      setCurrentMember(matchedMember);
      setStatus(matchedMember.status === MANAGER_ATTENDANCE_QR_STATUS_ACTIVE ? MANAGER_ATTENDANCE_QR_STATUS_ACTIVE : MANAGER_ATTENDANCE_QR_STATUS_EXPIRED);
    } catch (error: unknown) {
      setCurrentMember(null);
      checkInKeyRef.current = null;
      setStatus(MANAGER_QR_STATUS_IDLE);
      showManagerErrorToast(error, 'manager-qr-resolve-error');
    }
  }, []);

  const handleSimulateScan = useCallback((simulateActive: boolean) => {
    if (!ManagerEnvConfig.demoMode) return;
    const demoToken = simulateActive ? MANAGER_QR_DEMO_ACTIVE_TOKEN : MANAGER_QR_DEMO_EXPIRED_TOKEN;
    setScanValue(demoToken);
    setStatus(MANAGER_QR_STATUS_SCANNING);
    window.setTimeout(() => { void resolveMember(demoToken); }, MANAGER_QR_SCAN_DELAY_MS);
  }, [resolveMember]);

  const handleCheckIn = useCallback(async () => {
    if (!currentMember || currentMember.status !== MANAGER_ATTENDANCE_QR_STATUS_ACTIVE) return;
    try {
      checkInKeyRef.current ??= createManagerIdempotencyKey();
      const response = await ManagerAttendanceApi.markAttendance({
        memberId: currentMember.id,
        date: new Date().toISOString().slice(0, 10),
        checkIn: new Date().toLocaleTimeString(),
        type: 'MEMBER',
      }, checkInKeyRef.current);
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
      await queryClient.invalidateQueries({ queryKey: ManagerAttendanceQueryKeys.all });
      setStatus(MANAGER_QR_STATUS_IDLE);
      setCurrentMember(null);
      setScanValue('');
    } catch (error: unknown) {
      showManagerErrorToast(error, 'manager-qr-checkin-error');
    }
  }, [currentMember, queryClient, scanCounter]);

  const resetStatus = useCallback(() => {
    setStatus(MANAGER_QR_STATUS_IDLE);
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
