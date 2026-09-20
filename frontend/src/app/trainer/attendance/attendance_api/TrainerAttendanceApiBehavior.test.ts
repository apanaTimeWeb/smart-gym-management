import { describe, expect, it, vi } from 'vitest';
import { fetchAttendanceRecords, createAttendanceRecord } from '@/app/trainer/attendance/attendance_api/TrainerAttendance_api';
import { MOCK_ATTENDANCE_RECORDS } from '@/app/trainer/attendance/attendance_mocks/fixtures/TrainerAttendanceMockData';
const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('@/lib/api', () => ({ apiFetch }));

describe('Trainer attendance API behavior', () => {
  it('forwards search, page, and date filters to the API and renders returned records', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'OK', data: { attendance: [MOCK_ATTENDANCE_RECORDS[0]], total: 1, page: 2, limit: 10 } });
    const result = await fetchAttendanceRecords({ page: 2, limit: 10, search: 'Rahul', date: '2026-09-14' });
    expect(apiFetch.mock.calls[0]?.[0]).toEqual(expect.stringContaining('page=2'));
    expect(apiFetch.mock.calls[0][0]).toContain('search=Rahul');
    expect(apiFetch.mock.calls[0][0]).toContain('date=2026-09-14');
    expect(result.records[0]?.member?.name).toBe('Rahul Sharma');
  });
  it('propagates the backend mutation message from the create path', async () => {
    apiFetch.mockResolvedValueOnce({ success: true, message: 'Attendance recorded', data: MOCK_ATTENDANCE_RECORDS[0] });
    const result = await createAttendanceRecord({ type: 'MEMBER', memberId: 'm1', date: '2026-09-14' }, 'attendance-create-test-key');
    expect(result.message).toBe('Attendance recorded');
    expect(apiFetch.mock.calls[0]?.[1]?.headers).toMatchObject({ 'Idempotency-Key': 'attendance-create-test-key' });
  });
});
