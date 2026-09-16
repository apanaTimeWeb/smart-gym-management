'use client';
// RESPONSIBILITY: Owns Plans list server queries, mutations, cache invalidation and destructive confirmations.
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { plansApi } from '@/app/superadmin/plans/superadmin_plans_api/superadmin_plans_api';
import { useSuperadminPlansStore } from '@/app/superadmin/plans/plans_store/useSuperadminPlansStore';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_components/SuperadminFeedback/SuperadminConfirmProvider';
import type { SuperadminPlansListDestructiveActionTarget } from '@/app/superadmin/plans/plans_types/superadmin_plans_ui_types';
export function useSuperadminPlansList() {
 const openEditModal = useSuperadminPlansStore(state => state.openEditModal); const qc=useQueryClient(); const {confirm}=useSuperadminConfirm();
 const q=useQuery({queryKey:['superadmin','plans'],queryFn:()=>plansApi.fetchPlans()});
 const deleteMutation=useMutation({mutationFn:(id:string)=>plansApi.deletePlan(id),onSuccess:r=>{toast.success(r.message);qc.invalidateQueries({queryKey:['superadmin','plans']})},onError:(e:unknown)=>toast.error(e instanceof Error?e.message:'Failed to delete plan')});
 const archiveMutation=useMutation({mutationFn:(id:string)=>plansApi.archivePlan(id),onSuccess:r=>{toast.success(r.message);qc.invalidateQueries({queryKey:['superadmin','plans']})},onError:(e:unknown)=>toast.error(e instanceof Error?e.message:'Failed to archive plan')});
 const confirmPlanDestructiveAction=async(plan: SuperadminPlansListDestructiveActionTarget)=>{const has=(plan.activeTenants??0)>0;const ok=await confirm(has?{title:'Cannot Delete Active Plan',message:`"${plan.name}" has ${plan.activeTenants} active tenants. Archive it instead to hide it from new signups while keeping existing tenants.`,type:'warning',confirmText:'Archive Plan'}:{title:'Delete Plan',message:`Delete "${plan.name}"? This cannot be undone.`,type:'danger',confirmText:'Delete'});if(ok)(has?archiveMutation:deleteMutation).mutate(plan.id);};
 return {plans:q.data?.data??[],isLoading:q.isLoading,isError:q.isError,openEditModal,deleteMutation,archiveMutation,confirmPlanDestructiveAction};
}
