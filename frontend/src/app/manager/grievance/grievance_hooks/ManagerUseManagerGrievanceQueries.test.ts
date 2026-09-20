import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as moduleUnderTest from '@/app/manager/grievance/grievance_hooks/ManagerUseManagerGrievanceQueries';

const queryConfigs: unknown[] = [];
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn((config: unknown) => { queryConfigs.push(config); return { data: [], isPending: false, isError: false, error: null, refetch: vi.fn() }; }) }));
vi.mock('@/app/manager/grievance/grievance_api/ManagerGrievanceApi', () => ({ ManagerGrievanceApi: { fetchGrievanceTickets: vi.fn() } }));
describe('ManagerUseManagerGrievanceQueries', () => { it('registers the owning list query', () => { const { result } = renderHook(() => moduleUnderTest.useManagerGrievanceTickets()); expect(result.current.data).toEqual([]); expect(queryConfigs).toHaveLength(1); expect((queryConfigs[0] as { queryKey: readonly string[] }).queryKey).toEqual(['manager','grievance','list']); }); });
