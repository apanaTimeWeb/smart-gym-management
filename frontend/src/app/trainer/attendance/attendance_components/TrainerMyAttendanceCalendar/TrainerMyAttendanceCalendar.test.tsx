import { render, screen } from '@testing-library/react';
import TrainerMyAttendanceCalendar from '@/app/trainer/attendance/attendance_components/TrainerMyAttendanceCalendar/TrainerMyAttendanceCalendar';
import type { AttendanceRecord } from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';

describe('TrainerMyAttendanceCalendar', () => {
  it('does not fabricate an attendance record when the API has no record', () => {
    const records: AttendanceRecord[] = [];
    render(<TrainerMyAttendanceCalendar records={records} />);
    expect(screen.getAllByText('Absent').length).toBeGreaterThan(0);
    expect(screen.queryByText('06:00 AM')).not.toBeInTheDocument();
  });
});
