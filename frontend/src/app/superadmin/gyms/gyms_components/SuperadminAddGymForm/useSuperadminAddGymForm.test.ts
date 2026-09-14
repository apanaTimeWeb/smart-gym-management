import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useSuperadminAddGymForm } from '@/app/superadmin/gyms/gyms_components/SuperadminAddGymForm/useSuperadminAddGymForm';
import { gymsApi } from '@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

vi.mock('@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api');
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn(),
  useQuery: vi.fn()
}));
vi.mock('next/navigation', () => ({
  useRouter: vi.fn()
}));
vi.mock('react-hot-toast');

describe('useSuperadminAddGymForm', () => {
  const mockRouter = { push: vi.fn() };
  const mockQueryClient = { invalidateQueries: vi.fn() };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(mockRouter as never);
    vi.mocked(useQueryClient).mockReturnValue(mockQueryClient as never);
    vi.mocked(useQuery).mockReturnValue({ data: [] } as never);
  });

  it('initializes form with default values', () => {
    const { result } = renderHook(() => useSuperadminAddGymForm());
    expect(result.current.form.getValues('gymName')).toBe('');
  });

  it('submits form successfully', async () => {
    vi.mocked(gymsApi.provisionGym).mockResolvedValue({ success: true, message: 'Provisioned', data: { id: 'test-gym' } } as never);
    const { result } = renderHook(() => useSuperadminAddGymForm());
    
    // Fill required fields
    result.current.form.reset({
      gymName: 'Test Gym',
      ownerName: 'Owner',
      adminEmail: 'owner@test.com',
      phone: '9876543210',
      subdomain: 'test-gym',
      planId: 'plan-1',
      password: 'Password1',
      confirmPassword: 'Password1'
    });

    await result.current.form.handleSubmit(result.current.onSubmit)();
    
    expect(gymsApi.provisionGym).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Provisioned', expect.anything());
    expect(mockQueryClient.invalidateQueries).toHaveBeenCalled();
  });
});
