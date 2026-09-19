// DATA FLOW: Superadmin UI → useSuperadminAddGymFormSubmit → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: Form → provisioning API → Query invalidation → visible success/error → gyms list.
// RESPONSIBILITY: Owns the Superadmin tenant-provisioning submission workflow. It never simulates backend infrastructure steps or sends credentials before confirmed success.
import { useState } from 'react';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_layout/SuperadminFeedback/SuperadminConfirmProvider';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { gymsApi } from '@/app/superadmin/gyms/gyms_api/SuperadminGymsApi';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import type { OnboardGymFormValues } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsValidationSchemas';
/**
 * Purpose: Owns the Superadmin tenant-provisioning submission workflow. It never simulates backend infrastructure steps or sends credentials before confirmed success.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminAddGymFormSubmit() {
    const router=useRouter(); const queryClient=useQueryClient(); const { confirm } = useSuperadminConfirm(); const [isProvisioning,setIsProvisioning]=useState(false); const [provisioningLogs,setProvisioningLogs]=useState<string[]>([]);
    const onSubmit=async(data:OnboardGymFormValues)=>{
        const confirmed=await confirm({title:'Provision Tenant',message:'This will provision a new tenant database and create the tenant in Superadmin. Continue?',type:'warning',confirmText:'Provision Tenant',cancelText:'Cancel'});
        if(!confirmed) return;
        const idempotencyKey=crypto.randomUUID();
        setIsProvisioning(true); setProvisioningLogs(['Submitting tenant provisioning request...']);
        try{
            const response=await gymsApi.provisionGym({...data,planId:data.plan},idempotencyKey);
            setProvisioningLogs(['Tenant provisioning request accepted.',`Tenant ${response.data?.name ?? data.gymName} is ready.`]);
            await queryClient.invalidateQueries({queryKey:['superadmin','gyms']});
            toast.success(response.message,{id:`superadmin-gym-provisioned-${response.data?.id ?? 'new'}`});
            router.push(GymsUrlConfig.PAGES.MAIN);
        }catch(error:unknown){
            const message=error instanceof Error?error.message:'';
            setProvisioningLogs([`Provisioning failed: ${message || 'Unknown error'}`]);
            toast.error(message,{id:`superadmin-gym-provision-error-${idempotencyKey}`});
        }finally{setIsProvisioning(false)}};
    return {onSubmit,isProvisioning,provisioningLogs};
}
