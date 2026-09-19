import { resetSuperadminBackupsMockState } from '@/app/superadmin/backups/backups_mocks/handlers/SuperadminBackupsMockHandlers';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SuperadminBackupsScheduleModal from '@/app/superadmin/backups/backups_components/SuperadminBackupsScheduleModal';
import { useSuperadminBackupsSchedule } from '@/app/superadmin/backups/backups_utils/useSuperadminBackupsSchedule';
import toast from 'react-hot-toast';

vi.mock('@/app/superadmin/backups/backups_utils/useSuperadminBackupsSchedule', () => ({ useSuperadminBackupsSchedule: vi.fn() }));
vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));

const mockedUseSchedule = vi.mocked(useSuperadminBackupsSchedule);
const mockedToast = vi.mocked(toast);

beforeEach(() => {
  resetSuperadminBackupsMockState();
});

describe('SuperadminBackupsScheduleModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads the authoritative schedule and saves through the mutation contract', async () => {
    const saveSchedule = vi.fn().mockResolvedValue({
      success: true,
      message: 'Backup schedule updated',
      data: { cronExpression: '0 3 * * *', retentionDays: 45, updatedAt: '2026-09-18T03:00:00Z' },
    });
    mockedUseSchedule.mockReturnValue({
      schedule: { cronExpression: '0 2 * * *', retentionDays: 30, updatedAt: '2026-09-18T02:00:00Z' },
      isPending: false,
      isError: false,
      queryError: null,
      saveSchedule,
      isSaving: false,
      saveError: null,
    });
    const onClose = vi.fn();
    render(<SuperadminBackupsScheduleModal isOpen onClose={onClose} />);

    const cron = screen.getByLabelText('Cron Expression');
    const retention = screen.getByLabelText('Retention Period (Days)');
    fireEvent.change(cron, { target: { value: '0 3 * * *' } });
    fireEvent.change(retention, { target: { value: '45' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save Schedule' }));

    await waitFor(() => expect(saveSchedule).toHaveBeenCalledWith({ cronExpression: '0 3 * * *', retentionDays: 45 }));
    expect(mockedToast.success).toHaveBeenCalledWith('Backup schedule updated', { id: 'superadmin-backups-schedule-save' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('blocks invalid retention values before invoking the mutation', async () => {
    const saveSchedule = vi.fn();
    mockedUseSchedule.mockReturnValue({
      schedule: { cronExpression: '0 2 * * *', retentionDays: 30, updatedAt: '2026-09-18T02:00:00Z' },
      isPending: false,
      isError: false,
      queryError: null,
      saveSchedule,
      isSaving: false,
      saveError: null,
    });
    render(<SuperadminBackupsScheduleModal isOpen onClose={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Retention Period (Days)'), { target: { value: '0' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save Schedule' }));

    await waitFor(() => expect(screen.getByText(/at least/i)).toBeInTheDocument());
    expect(saveSchedule).not.toHaveBeenCalled();
  });
});
