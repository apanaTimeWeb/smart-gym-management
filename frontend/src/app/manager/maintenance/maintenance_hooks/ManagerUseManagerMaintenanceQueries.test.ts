import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useManagerMaintenanceTickets } from '@/app/manager/maintenance/maintenance_hooks/ManagerUseManagerMaintenanceQueries';

const queryConfigs: unknown[]=[];
vi.mock('@tanstack/react-query',()=>({useQuery:vi.fn((config:unknown)=>{queryConfigs.push(config);return{data:[],isPending:false,isError:false,error:null,refetch:vi.fn()};})}));
vi.mock('@/app/manager/maintenance/maintenance_api/ManagerMaintenanceApi',()=>({ManagerMaintenanceApi:{fetchMaintenanceIssues:vi.fn()}}));

describe('ManagerUseManagerMaintenanceQueries',()=>{it('registers the owning maintenance list query',()=>{const {result}=renderHook(()=>useManagerMaintenanceTickets());expect(result.current.data).toEqual([]);expect((queryConfigs[0] as {queryKey:readonly string[]}).queryKey).toEqual(['manager','maintenance','list']);});});
