// RESPONSIBILITY: Handles form validation, modal state, and API submission for sending a WhatsApp message to a Gym owner.
// DATA FLOW: GymWhatsappModal -> useGymWhatsappModal -> useGymsStore

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGymsStore } from '@/app/superadmin/gyms/gyms_store/useGymsStore';

const gymWhatsappSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

type GymWhatsappFormValues = z.infer<typeof gymWhatsappSchema>;

export function useGymWhatsappModal() {
  const isWhatsappModalOpen = useGymsStore(state => state.isWhatsappModalOpen);
  const closeWhatsappModal = useGymsStore(state => state.closeWhatsappModal);
  const selectedGym = useGymsStore(state => state.selectedGym);
  const handleWhatsappOwner = useGymsStore(state => state.handleWhatsappOwner);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GymWhatsappFormValues>({
    resolver: zodResolver(gymWhatsappSchema),
  });

  useEffect(() => {
    if (isWhatsappModalOpen) {
      reset({ subject: '', message: '' });
    }
  }, [isWhatsappModalOpen, reset]);

  const onSubmit = async (data: GymWhatsappFormValues) => {
    if (selectedGym) {
      await handleWhatsappOwner(selectedGym.id, { 
        ...data, 
        phone: selectedGym.phone,
        ownerName: selectedGym.ownerName,
        gymName: selectedGym.name
      });
    }
  };

  return {
    isWhatsappModalOpen,
    closeWhatsappModal,
    selectedGym,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}
