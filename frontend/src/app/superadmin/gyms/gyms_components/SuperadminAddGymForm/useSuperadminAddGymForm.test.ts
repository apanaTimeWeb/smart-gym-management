import { resetSuperadminGymsMockState } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsMockHandlers';
import { resetSuperadminGymsMockState as resetV1MockState } from '@/app/superadmin/gyms/gyms_mocks/handlers/SuperadminGymsV1MockHandlers';
import { renderHook, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useSuperadminAddGymForm } from '@/app/superadmin/gyms/gyms_components/SuperadminAddGymForm/useSuperadminAddGymForm';
import { gymsApi } from '@/app/superadmin/gyms/gyms_api/SuperadminGymsApi';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
vi.mock('@/app/superadmin/gyms/gyms_api/SuperadminGymsApi');
vi.mock('@tanstack/react-query', () => ({
    useQueryClient: vi.fn(),
    useQuery: vi.fn(),
    useMutation: vi.fn((options: any) => ({
        mutate: vi.fn(),
        mutateAsync: vi.fn(async (vars, mutOptions) => {
            const result = options.mutationFn ? await options.mutationFn(vars) : undefined;
            if (options.onSuccess) options.onSuccess(result);
            if (mutOptions && mutOptions.onSuccess) mutOptions.onSuccess(result);
            return result;
        }),
        isPending: false
    }))
}));
vi.mock('next/navigation', () => ({
    useRouter: vi.fn()
}));
vi.mock('react-hot-toast');
beforeEach(() => {
  resetSuperadminGymsMockState();
});

beforeEach(() => {
  resetV1MockState();
});

describe('useSuperadminAddGymForm', () => {
    const mockRouter = { push: vi.fn() };
    const mockQueryClient = { invalidateQueries: vi.fn() };
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useRouter).mockReturnValue(mockRouter as never);
        vi.mocked(useQueryClient).mockReturnValue(mockQueryClient as never);
        vi.mocked(useQuery).mockReturnValue({ data: [] } as never);
        vi.stubGlobal('open', vi.fn());
    });
    afterEach(() => {
        vi.unstubAllGlobals();
    });
    it('initializes form with default values', () => {
        const { result } = renderHook(() => useSuperadminAddGymForm());
        expect(result.current.form.getValues('gymName')).toBeUndefined();
    });
    it('submits form successfully', async () => {
        vi.useFakeTimers();
        vi.mocked(gymsApi.provisionGym).mockResolvedValue({ success: true, message: 'Provisioned', data: { id: 'test-gym' } } as never);
        const { result } = renderHook(() => useSuperadminAddGymForm());
        // Fill required fields
        await act(async () => {
            result.current.form.reset({
                gymName: 'Test Gym',
                ownerName: 'Owner',
                adminEmail: 'owner@test.com',
                phone: '9876543210',
                plan: 'plan-1',
                temporaryPassword: 'Password1'
            });
        });
        let submitPromise: Promise<void>;
        await act(async () => {
            submitPromise = result.current.form.handleSubmit(result.current.onSubmit)();
            await vi.runAllTimersAsync();
            await submitPromise;
        });
        expect(gymsApi.provisionGym).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith('Provisioned', expect.any(Object));
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalled();
    });
});
