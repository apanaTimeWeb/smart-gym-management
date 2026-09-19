import { z } from 'zod';
export const gymEditSchema = z.object({
    name: z.string().min(1, 'Gym Name is required'),
    ownerName: z.string().min(1, 'Owner Name is required'),
    adminEmail: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Valid phone number required'),
    plan: z.string().min(1, 'Please select a plan'),
    temporaryPassword: z.string().optional().refine(val => !val || val.length >= 8, {
        message: "Password must be at least 8 characters",
    }),
});
export type GymEditFormValues = z.infer<typeof gymEditSchema>;
export const gymWhatsappSchema = z.object({
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required'),
});
export type GymWhatsappFormValues = z.infer<typeof gymWhatsappSchema>;

export const gymCreateSchema = z.object({
    name: z.string().min(1, 'Gym name is required'),
    ownerName: z.string().min(1, 'Owner name is required'),
    adminEmail: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Valid phone number required'),
    plan: z.string().min(1, 'Plan is required'),
}).passthrough();
export type GymCreateFormValues = z.infer<typeof gymCreateSchema>;

export const gymProvisionSchema = z.object({
    gymName: z.string().min(2, 'Gym name must be at least 2 characters'),
    ownerName: z.string().min(2, 'Owner name is required'),
    adminEmail: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Valid phone number required'),
    plan: z.string().min(1, 'Plan is required'),
    planId: z.string().min(1, 'Plan is required').optional(),
    aadharNumber: z.string().regex(/^\d{12}$/, 'Aadhar number must be exactly 12 digits').optional().or(z.literal('')),
    temporaryPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).passthrough();
export type GymProvisionFormValues = z.infer<typeof gymProvisionSchema>;
