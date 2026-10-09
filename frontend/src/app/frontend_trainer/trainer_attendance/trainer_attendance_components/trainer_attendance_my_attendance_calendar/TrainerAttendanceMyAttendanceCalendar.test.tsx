import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import TrainerAttendanceMyAttendanceCalendar from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_components/trainer_attendance_my_attendance_calendar/TrainerAttendanceMyAttendanceCalendar';

import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_types/TrainerAttendanceTypes';






describe('TrainerAttendanceMyAttendanceCalendar', () => {
  it('does not fabricate an attendance record when the API has no record', () => {
    const records: TrainerAttendanceRecord[] = [];
    render(<TrainerAttendanceMyAttendanceCalendar records={records} />);
    expect(screen.getAllByText('Absent').length).toBeGreaterThan(0);
    expect(screen.queryByText('06:00 AM')).not.toBeInTheDocument();
  });
});
