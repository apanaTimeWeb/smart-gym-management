// RESPONSIBILITY: Runtime API schemas for the Manager PT module.
import { z } from 'zod';

const ptPaymentStatusSchema = z.enum(['PAID', 'PARTIAL', 'PENDING']);
const ptSessionStatusSchema = z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED', 'MISSED']);

export const ptPackageSchema = z.object({ id: z.string(), name: z.string(), sessionCount: z.number(), durationDays: z.number(), price: z.number(), description: z.string() });
export const ptAssignmentSchema = z.object({ id: z.string(), memberId: z.string(), memberName: z.string(), trainerId: z.string(), trainerName: z.string(), packageId: z.string(), packageName: z.string(), totalSessions: z.number(), completedSessions: z.number(), startDate: z.string(), endDate: z.string(), sessionsRemaining: z.number(), nextSessionDate: z.string().optional(), paymentStatus: ptPaymentStatusSchema, amountPaid: z.number(), totalAmount: z.number() });
export const ptTrainerWorkloadSchema = z.object({ trainerId: z.string(), trainerName: z.string(), activeClients: z.number(), totalSessionsConducted: z.number(), rating: z.number(), status: z.enum(['Available', 'Fully Booked']) });
export const ptDashboardKpisSchema = z.object({ totalActiveAssignments: z.number(), sessionsScheduledToday: z.number(), packagesExpiringSoon: z.number(), monthlyPtRevenue: z.number() });
export const ptAssignmentsSessionResponseSchema = z.array(z.object({ id: z.string(), assignmentId: z.string(), sessionDate: z.string(), status: ptSessionStatusSchema }));
