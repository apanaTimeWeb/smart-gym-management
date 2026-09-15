// RESPONSIBILITY: Handles form validation, modal state, and API submission for editing a Gym.
// DATA FLOW: SuperadminGymEditModal -> useSuperadminGymEditModal -> API

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore';
import { gymsApi } from '@/app/superadmin/gyms/superadmin_gyms_api/superadmin_gyms_api';
import { plansApi } from '@/app/superadmin/plans/superadmin_plans_api/superadmin_plans_api';
import { gymEditSchema, type GymEditFormValues } from '@/app/superadmin/gyms/superadmin_gyms_types/superadmin_gyms_schema';

export function useSuperadminGymEditModal() {
  const isEditModalOpen = useSuperadminGymsStore(state => state.isEditModalOpen);
  const closeEditModal = useSuperadminGymsStore(state => state.closeEditModal);
  const selectedGym = useSuperadminGymsStore(state => state.selectedGym);
  
  const queryClient = useQueryClient();

  const { data: fetchRes, isLoading: loadingPlans } = useQuery({
    queryKey: ['superadmin', 'plans'],
    queryFn: () => plansApi.fetchPlans(),
  });
  
  const plans = fetchRes?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<GymEditFormValues>({
    resolver: zodResolver(gymEditSchema),
  });

  // RESPONSIBILITY: Handle side-effects for useSuperadminGymEditModal
  // EXPLANATION: Synchronize component state with external dependencies.
  useEffect(() => {
    if (selectedGym && isEditModalOpen) {
      reset({
        name: selectedGym.name,
        ownerName: selectedGym.ownerName,
        adminEmail: selectedGym.adminEmail,
        phone: selectedGym.phone,
        plan: selectedGym.plan,
        temporaryPassword: '',
      });
    }
  }, [selectedGym, isEditModalOpen, reset]);

  const editMutation = useMutation({
    mutationFn: (data: GymEditFormValues) => gymsApi.updateGym(selectedGym!.id, data),
    onSuccess: (res) => {
      toast.success(res.message || 'Gym details updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'gyms'] });
      closeEditModal();
    },
    onError: (err: unknown) => {
      toast.error((err as Error).message || 'Failed to update gym details.');
    }
  });

  const onSubmit = async (data: GymEditFormValues) => {
    if (selectedGym) {
      editMutation.mutate(data);
    }
  };

  return {
    isEditModalOpen,
    closeEditModal,
    selectedGym,
    plans,
    loadingPlans,
    register,
    handleSubmit,
    onSubmit,
    control,
    errors,
    isDirty,
    isSubmitting: isSubmitting || editMutation.isPending,
  };
}
