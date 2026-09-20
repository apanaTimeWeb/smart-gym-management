// DATA FLOW: Superadmin UI → useSuperadminGymWhatsappModal → Superadmin module API/state → consuming component
'use client';
import { useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
// RESPONSIBILITY: Handles form validation, modal state, and API submission for sending a WhatsApp message to a Gym owner.
// DATA FLOW: SuperadminGymWhatsappModal -> useSuperadminGymWhatsappModal -> API
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSuperadminGymsStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymsStore';
import { gymsApi } from '@/app/superadmin/gyms/gyms_api/SuperadminGymsApi';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';
import { gymWhatsappSchema, type GymWhatsappFormValues } from '@/app/superadmin/gyms/gyms_types/SuperadminGymsSchema';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import { formatSuperadminGymWhatsappReceiptDate } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymWhatsappReceiptUtils';
/**
 * Purpose: Handles form validation, modal state, and API submission for sending a WhatsApp message to a Gym owner.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminGymWhatsappModal() {
    const isWhatsappModalOpen = useSuperadminGymsStore(state => state.isWhatsappModalOpen);
    const closeWhatsappModal = useSuperadminGymsStore(state => state.closeWhatsappModal);
    const selectedGym = useSuperadminGymsStore(state => state.selectedGym);
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty }, } = useForm<GymWhatsappFormValues>({
        resolver: zodResolver(gymWhatsappSchema),
    });
    // RESPONSIBILITY: Handle side-effects for useSuperadminGymWhatsappModal
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize local/UI state with the listed external dependencies.
    useEffect(() => {
        if (isWhatsappModalOpen) {
            reset({ subject: '', message: '' });
        }
    }, [isWhatsappModalOpen, reset]);
    useUnsavedChangesGuard(isDirty && isWhatsappModalOpen && !isSubmitting, 'You have an unsent WhatsApp message. Discard?');
    const whatsappMutation = useMutation({
        mutationFn: (data: GymWhatsappFormValues & {
            phone: string;
            ownerName: string;
            gymName: string;
        }) => gymsApi.emailGymOwner(selectedGym!.id, data as unknown as Parameters<typeof gymsApi.emailGymOwner>[1]), // Still calling API for record keeping if necessary, or just skip
        onSuccess: (res, data) => {
            if (data.phone) {
                const cleanPhone = String(data.phone).replace(/\D/g, '');
                const dateStr = formatSuperadminGymWhatsappReceiptDate();
                const waText = WhatsAppFormatter.formatReceipt({
                    title: 'Smart Gym 360',
                    subtitle: String(data.subject),
                    date: dateStr,
                    customerInfo: {
                        Owner: String(data.ownerName || 'Gym Owner'),
                        Gym: String(data.gymName || 'Gym')
                    },
                    sections: [
                        {
                            title: 'Message',
                            items: {
                                'Content': String(data.message)
                            }
                        }
                    ],
                    footer: 'Powered by Smart Gym 360'
                });
                window.open(GymsUrlConfig.EXTERNAL.WHATSAPP_CLICK_TO_CHAT(cleanPhone, waText), '_blank', 'noopener,noreferrer');
            }
            toast.success(res.message, { id: 'superadmin-toast-e6e0b4a6e8' });
            closeWhatsappModal();
        },
        onError: (err: unknown) => {
            toast.error((err as Error).message, { id: 'failed-to-send-whatsapp' });
        }
    });
    const onSubmit = async (data: GymWhatsappFormValues) => {
        if (selectedGym) {
            whatsappMutation.mutate({
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
        isSubmitting: isSubmitting || whatsappMutation.isPending,
        isDirty,
    };
}