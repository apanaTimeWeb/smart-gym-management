import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useManagerMaintenanceTickets } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_hooks/useManagerMaintenanceQueries';

const queryConfigs: unknown[]=[];
vi.mock('@tanstack/react-query',()=>({useQuery:vi.fn((config:unknown)=>{queryConfigs.push(config);return{data:[],isPending:false,isError:false,error:null,refetch:vi.fn()};})}));
vi.mock('@/app/frontend_manager/manager_maintenance/manager_maintenance_api/ManagerMaintenanceApi',()=>({ManagerMaintenanceApi:{fetchMaintenanceIssues:vi.fn()}}));

describe('useManagerMaintenanceQueries',()=>{it('registers the owning maintenance list query',()=>{const {result}=renderHook(()=>useManagerMaintenanceTickets());expect(result.current.data).toEqual([]);expect((queryConfigs[0] as {queryKey:readonly string[]}).queryKey).toEqual(['manager','maintenance','list']);});});
