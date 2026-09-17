// DATA FLOW: Superadmin UI → useSuperadminAddGymFormSubmit → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: Form → provisioning API → Query invalidation → visible success/error → gyms list.
// RESPONSIBILITY: Owns the Superadmin tenant-provisioning submission workflow. It never simulates backend infrastructure steps or sends credentials before confirmed success.
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { gymsApi } from '@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import type { OnboardGymFormValues } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsValidationSchemas';
export function useSuperadminAddGymFormSubmit() {
    const router=useRouter(); const queryClient=useQueryClient(); const [isProvisioning,setIsProvisioning]=useState(false); const [provisioningLogs,setProvisioningLogs]=useState<string[]>([]);
    const onSubmit=async(data:OnboardGymFormValues)=>{setIsProvisioning(true);setProvisioningLogs(['Submitting tenant provisioning request...']);try{const response=await gymsApi.provisionGym({...data,planId:data.plan});setProvisioningLogs(['Tenant provisioning request accepted.',`Tenant ${response.data?.name ?? data.gymName} is ready.`]);await queryClient.invalidateQueries({queryKey:['superadmin','gyms']});toast.success(response.message,{id:'superadmin-gym-provisioned'});router.push(GymsUrlConfig.PAGES.MAIN);}catch(error:unknown){setProvisioningLogs([`Provisioning failed: ${error instanceof Error ? error.message : 'Unknown error'}`]);toast.error(error instanceof Error?error.message:'Unable to provision tenant.',{id:'superadmin-gym-provision-error'});}finally{setIsProvisioning(false)}};
    return {onSubmit,isProvisioning,provisioningLogs};
}
