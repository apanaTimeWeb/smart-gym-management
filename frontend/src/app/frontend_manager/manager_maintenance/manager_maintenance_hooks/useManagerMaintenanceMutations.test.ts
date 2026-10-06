import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useManagerMaintenanceMutations } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_hooks/useManagerMaintenanceMutations';

const mutations: unknown[]=[];
vi.mock('@tanstack/react-query',()=>({useMutation:vi.fn((config:unknown)=>{mutations.push(config);return{mutateAsync:vi.fn().mockResolvedValue({success:true,message:'ok',data:{id:'m1'}}),isPending:false};}),useQueryClient:vi.fn(()=>({invalidateQueries:vi.fn()}))}));
vi.mock('@/app/frontend_manager/manager_infrastructure/ManagerToastService',()=>({showManagerSuccessToast:vi.fn(),showManagerErrorToast:vi.fn()}));
vi.mock('@/app/frontend_manager/manager_maintenance/manager_maintenance_api/ManagerMaintenanceApi',()=>({ManagerMaintenanceApi:{createMaintenanceTicket:vi.fn(),resolveMaintenanceTicket:vi.fn()}}));

describe('useManagerMaintenanceMutations',()=>{it('registers create and resolve mutations',()=>{const{result}=renderHook(()=>useManagerMaintenanceMutations());expect(result.current.createMaintenanceTicket).toBeDefined();expect(result.current.resolveMaintenanceTicket).toBeDefined();expect(mutations).toHaveLength(2);});});
