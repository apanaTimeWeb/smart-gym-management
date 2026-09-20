import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useManagerGrievanceMutations } from '@/app/manager/grievance/grievance_hooks/ManagerUseManagerGrievanceMutations';

const mutations: unknown[] = [];
vi.mock('@tanstack/react-query', () => ({ useMutation: vi.fn((config: unknown) => { mutations.push(config); return { mutateAsync: vi.fn().mockResolvedValue({ success: true, message: 'ok', data: { id: 'g1' } }), isPending: false }; }), useQueryClient: vi.fn(() => ({ invalidateQueries: vi.fn() })) }));
vi.mock('@/app/manager/manager_infrastructure/ManagerToastService', () => ({ showManagerSuccessToast: vi.fn(), showManagerErrorToast: vi.fn() }));
vi.mock('@/app/manager/grievance/grievance_api/ManagerGrievanceApi', () => ({ ManagerGrievanceApi: { createGrievanceTicket: vi.fn(), resolveGrievanceTicket: vi.fn() } }));

describe('ManagerUseManagerGrievanceMutations', () => { it('registers create and resolve mutations', () => { const { result } = renderHook(() => useManagerGrievanceMutations()); expect(result.current.createGrievanceTicket).toBeDefined(); expect(result.current.resolveGrievanceTicket).toBeDefined(); expect(mutations).toHaveLength(2); }); });
