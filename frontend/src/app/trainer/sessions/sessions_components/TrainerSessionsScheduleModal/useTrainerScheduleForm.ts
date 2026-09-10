import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { CreateSessionDto } from '@/app/trainer/sessions/sessions_api/TrainerSessionsApi';

const sessionSchema = z.object({
  type: z.enum(['PT', 'Group']),
  memberId: z.string().optional().or(z.literal('')),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  duration: z.string().min(1, 'Duration is required'),
}).refine(data => data.type === 'Group' || (data.type === 'PT' && data.memberId && data.memberId.length > 0), {
  message: 'Member is required for Personal Training',
  path: ['memberId'],
});

type SessionFormValues = z.infer<typeof sessionSchema>;

export const useTrainerScheduleForm = (onSubmit: (dto: CreateSessionDto) => Promise<void>) => {
  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      type: 'PT',
      memberId: '',
      date: '',
      time: '',
      duration: '60m',
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit({
      type: data.type as 'PT' | 'Group',
      memberId: data.memberId || '',
      date: data.date,
      time: data.time,
      duration: data.duration,
    });
    form.reset();
  });

  return { form, handleSubmit };
};
