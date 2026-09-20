import toast from 'react-hot-toast';
import { describe, expect, it, vi } from 'vitest';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_infrastructure/ManagerToastService';


vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }));

describe('Manager toast service', () => {
  it('deduplicates backend success messages with a stable id', () => {
    showManagerSuccessToast('Saved by backend', 'manager-test-success');
    expect(toast.success).toHaveBeenCalledWith('Saved by backend', { id: 'manager-test-success' });
  });
  it('deduplicates normalized backend errors with a stable id', () => {
    showManagerErrorToast(new Error('Backend rejected request'), 'manager-test-error');
    expect(toast.error).toHaveBeenCalledWith('Backend rejected request', { id: 'manager-test-error' });
  });
});
