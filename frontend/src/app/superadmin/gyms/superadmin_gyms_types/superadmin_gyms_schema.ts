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
