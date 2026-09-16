import { z } from "zod";

export const TrainerProfileFormSchema = z.object({
  name: z.string().trim().min(1, "Full name is required"),
  phone: z.string().trim().max(30, "Phone number is too long"),
  specialization: z.array(z.string().trim()).max(10, "Select up to 10 specializations"),
});

export const TrainerPasswordFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must contain at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your new password"),
}).refine((value) => value.newPassword === value.confirmPassword, {
  path: ["confirmPassword"],
  message: "New password and confirmation must match",
});

export type TrainerProfileFormValues = z.infer<typeof TrainerProfileFormSchema>;
export type TrainerPasswordFormValues = z.infer<typeof TrainerPasswordFormSchema>;
