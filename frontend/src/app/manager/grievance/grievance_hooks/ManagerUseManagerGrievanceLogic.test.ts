import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useManagerGrievanceLogic } from '@/app/manager/grievance/grievance_hooks/ManagerUseManagerGrievanceLogic';

const createAsync=vi.fn().mockResolvedValue({}); const resolveAsync=vi.fn().mockResolvedValue({});
vi.mock('@/app/manager/grievance/grievance_hooks/ManagerUseManagerGrievanceQueries', () => ({ useManagerGrievanceTickets: vi.fn(() => ({ data: [{ id:'g1' }], isPending: true, isError: false, error: null, refetch: vi.fn() })) }));
vi.mock('@/app/manager/grievance/grievance_hooks/ManagerUseManagerGrievanceMutations', () => ({ useManagerGrievanceMutations: vi.fn(() => ({ createTicket: { mutateAsync: createAsync, isPending: true }, resolveTicket: { mutateAsync: resolveAsync, isPending: false } })) }));

describe('ManagerUseManagerGrievanceLogic', () => { it('exposes query state and completes create/resolve handlers', async () => { const { result }=renderHook(()=>useManagerGrievanceLogic()); expect(result.current.isPending).toBe(true); await expect(result.current.createTicket({ memberName:'A', category:'OTHER', issue:'Issue' })).resolves.toBe(true); await expect(result.current.resolveTicket('g1','Done')).resolves.toBe(true); expect(createAsync).toHaveBeenCalled(); expect(resolveAsync).toHaveBeenCalledWith({ id:'g1', resolutionNote:'Done' }); }); });
