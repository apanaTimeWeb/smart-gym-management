// RESPONSIBILITY: Renders the modal for marking new attendance records for members or staff.
'use client';

import { useEffect } from 'react';
import { useAttendanceContext } from '@/app/manager/attendance/attendance_context/ManagerAttendanceContext';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AttendanceSchema, type AttendanceFormValues, EMPTY_ATTENDANCE_FORM } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

export default function AttendanceModal() {
  const { 
    showModal, setShowModal,
    members, staff, saving, markAttendance,
    tab
  } = useAttendanceContext();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors }
  } = useForm<AttendanceFormValues>({
    resolver: zodResolver(AttendanceSchema),
    defaultValues: EMPTY_ATTENDANCE_FORM
  });

  const watchType = watch('type');
  const watchStatus = watch('status');
  
  const d = new Date();
  const todayDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    if (showModal) {
      reset({
        ...EMPTY_ATTENDANCE_FORM,
        type: tab === 'Staff' ? 'STAFF' : 'MEMBER'
      });
    }
  }, [showModal, reset, tab]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-md border border-border">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h3 className="font-bold text-lg text-foreground">Record Attendance</h3>
          <button 
            type="button"
            onClick={() => setShowModal(false)} 
            className="text-secondary hover:text-foreground hover:bg-primary/10 p-1 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit(markAttendance)} className="p-5 space-y-4">
          {/* Type is now automatically inferred from the active tab */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              {watchType === 'MEMBER' ? 'Select Member' : 'Select Staff'}
            </label>
            {watchType === 'MEMBER' ? (
                <Controller
                  name="memberId"
                  control={control}
                  render={({ field }) => (
                    <SearchableDropdown
                      options={members.filter(m => !('role' in m) && !('salary' in m)).map(m => ({ label: `${m.name} (${m.phone})`, value: String(m.id) }))}
                      value={field.value || ''}
                      onChange={field.onChange}
                      placeholder="Search Member..."
                      containerStyle={{ zIndex: 60 }}
                    />
                  )}
                />
            ) : (
                <Controller
                  name="staffId"
                  control={control}
                  render={({ field }) => (
                    <SearchableDropdown
                      options={staff.filter(s => ('role' in s) || ('salary' in s) || !('planId' in s)).map(s => ({ label: `${s.name} - ${(s as any).role || 'Staff'}`, value: String(s.id) }))}
                      value={field.value || ''}
                      onChange={field.onChange}
                      placeholder="Search Staff..."
                      containerStyle={{ zIndex: 60 }}
                    />
                  )}
                />
            )}
            {errors.memberId && watchType === 'MEMBER' && <p className="text-danger text-xs mt-1">{errors.memberId.message}</p>}
            {errors.staffId && watchType === 'STAFF' && <p className="text-danger text-xs mt-1">{errors.staffId.message}</p>}
          </div>

          {watchType === 'STAFF' && (
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Status</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="radio" value="PRESENT" {...register('status')} className="text-primary focus:ring-primary" /> Present
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="radio" value="LEAVE" {...register('status')} className="text-primary focus:ring-primary" /> Leave
                </label>
              </div>
              {errors.status && <p className="text-danger text-xs mt-1">{errors.status.message}</p>}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                {watchStatus === 'LEAVE' ? 'Start Date' : 'Date'}
              </label>
              <input 
                type="date" 
                max={watchStatus !== 'LEAVE' ? todayDate : undefined}
                {...register('date')}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus-visible:ring-2 ${
                  errors.date ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                } bg-input text-foreground`} 
              />
              {errors.date && <p className="text-danger text-xs mt-1">{errors.date.message}</p>}
            </div>
            {watchStatus === 'LEAVE' && (
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">End Date (Optional)</label>
                <input 
                  type="date" 
                  {...register('endDate')}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus-visible:ring-2 ${
                    errors.endDate ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  } bg-input text-foreground`} 
                />
                {errors.endDate && <p className="text-danger text-xs mt-1">{errors.endDate.message}</p>}
              </div>
            )}
            {watchStatus === 'PRESENT' && (
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Check In Time</label>
                <input 
                  type="time" 
                  {...register('checkIn')}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus-visible:ring-2 ${
                    errors.checkIn ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                  } bg-input text-foreground`} 
                />
                {errors.checkIn && <p className="text-danger text-xs mt-1">{errors.checkIn.message}</p>}
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setShowModal(false)} 
              className="px-4 py-2 border border-border rounded-lg font-medium text-secondary hover:text-foreground hover:bg-primary/10 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving}
              className="px-4 py-2 rounded-lg font-medium text-white bg-primary flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70" 
            >
              {saving ? <Loader2 className="w-4 h-4 motion-safe:animate-spin" /> : <><CheckCircle size={15} /> Check In</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
