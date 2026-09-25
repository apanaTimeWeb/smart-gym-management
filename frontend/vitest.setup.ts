import '@testing-library/jest-dom';
import { vi } from 'vitest';
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({
  useConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) })
}));
