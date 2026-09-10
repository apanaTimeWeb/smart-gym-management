// RESPONSIBILITY: Shared API methods for the Trainer module (Rule 63).
import { apiFetch } from '@/lib/api';
import { MembersUrlConfig } from '@/app/trainer/members/members_url_config';
import { WorkoutUrlConfig } from '@/app/trainer/workout/workout_url_config';
import { AttendanceUrlConfig } from '@/app/trainer/attendance/attendance_url_config';

export const trainerSharedApi = {
  fetchMembersBasic: async (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch(`${MembersUrlConfig.BACKEND_API.BASE}${query}`);
  },
  fetchExercises: async (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch(`${WorkoutUrlConfig.BACKEND_API.EXERCISES_BASE}${query}`);
  },
  fetchMemberAttendance: async (params: Record<string, string>) => {
    const query = '?' + new URLSearchParams(params).toString();
    return apiFetch(`${AttendanceUrlConfig.BACKEND_API.BASE}${query}`);
  },
};

