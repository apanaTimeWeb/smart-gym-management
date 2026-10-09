import { createElement } from 'react';

import { act, renderHook, screen, fireEvent } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { TrainerInfrastructureConfirmProvider } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/TrainerInfrastructureConfirmProvider';

import { useTrainerInfrastructureConfirm } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/useTrainerInfrastructureConfirm';

import type { ReactNode } from 'react';








vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('useTrainerInfrastructureConfirm', () => {
  it('resolves true when the confirm action is accepted', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => createElement(TrainerInfrastructureConfirmProvider, null, children);
    const { result } = renderHook(() => useTrainerInfrastructureConfirm(), { wrapper });

    let confirmation!: Promise<boolean>;
    await act(async () => {
      confirmation = result.current.confirm({ title: 'Delete member', message: 'Confirm deletion', confirmText: 'Confirm', cancelText: 'Cancel' });
    });

    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    await expect(confirmation).resolves.toBe(true);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('resolves false when the cancel action is accepted', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => createElement(TrainerInfrastructureConfirmProvider, null, children);
    const { result } = renderHook(() => useTrainerInfrastructureConfirm(), { wrapper });

    let confirmation!: Promise<boolean>;
    await act(async () => {
      confirmation = result.current.confirm({ title: 'Discard draft', message: 'Keep changes?', confirmText: 'Leave', cancelText: 'Stay' });
    });

    fireEvent.click(screen.getByRole('button', { name: 'Stay' }));
    await expect(confirmation).resolves.toBe(false);
  });

  it('does not leave an earlier request pending when a second confirmation replaces it', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => createElement(TrainerInfrastructureConfirmProvider, null, children);
    const { result } = renderHook(() => useTrainerInfrastructureConfirm(), { wrapper });
    let first!: Promise<boolean>;
    let second!: Promise<boolean>;

    await act(async () => {
      first = result.current.confirm({ title: 'First action', message: 'First prompt', confirmText: 'Confirm first', cancelText: 'Cancel first' });
    });
    await act(async () => {
      second = result.current.confirm({ title: 'Second action', message: 'Second prompt', confirmText: 'Confirm second', cancelText: 'Cancel second' });
    });

    await expect(first).resolves.toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel second' }));
    await expect(second).resolves.toBe(false);
  });

});
