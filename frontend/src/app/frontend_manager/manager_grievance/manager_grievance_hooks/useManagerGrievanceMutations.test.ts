import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useManagerGrievanceMutations } from '@/app/frontend_manager/manager_grievance/manager_grievance_hooks/useManagerGrievanceMutations';

const mutations: unknown[] = [];
vi.mock('@tanstack/react-query', () => ({ useMutation: vi.fn((config: unknown) => { mutations.push(config); return { mutateAsync: vi.fn().mockResolvedValue({ success: true, message: 'ok', data: { id: 'g1' } }), isPending: false }; }), useQueryClient: vi.fn(() => ({ invalidateQueries: vi.fn() })) }));
vi.mock('@/app/frontend_manager/manager_infrastructure/ManagerToastService', () => ({ showManagerSuccessToast: vi.fn(), showManagerErrorToast: vi.fn() }));
vi.mock('@/app/frontend_manager/manager_grievance/manager_grievance_api/ManagerGrievanceApi', () => ({ ManagerGrievanceApi: { createGrievanceTicket: vi.fn(), resolveGrievanceTicket: vi.fn() } }));

describe('useManagerGrievanceMutations', () => { it('registers create and resolve mutations', () => { const { result } = renderHook(() => useManagerGrievanceMutations()); expect(result.current.createGrievanceTicket).toBeDefined(); expect(result.current.resolveGrievanceTicket).toBeDefined(); expect(mutations).toHaveLength(2); }); });
