"use client";

import { useEffect } from 'react';
import { useAttendanceContext } from '@/app/erp/attendance/attendance_context/AttendanceContext';
import { X, CheckCircle } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AttendanceSchema, type AttendanceFormValues, EMPTY_ATTENDANCE_FORM } from '@/app/erp/attendance/attendance_utils/AttendanceSharedConstants';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';

export default function AttendanceModal() {
  const { 
    showModal, setShowModal,
    members, staff, saving, markAttendance
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

  useEffect(() => {
    if (showModal) {
      reset(EMPTY_ATTENDANCE_FORM);
    }
  }, [showModal, reset]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-card rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-border">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h3 className="font-bold text-lg text-foreground">Record Attendance</h3>
          <button 
            type="button"
            onClick={() => setShowModal(false)} 
            className="text-secondary hover:text-foreground hover:bg-primary-subtle p-1 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit(markAttendance as any)} className="p-5 space-y-4">
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input 
                type="radio" 
                value="MEMBER" 
                {...register('type')}
                className="text-primary focus:ring-primary" 
              />
              Member
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input 
                type="radio" 
                value="STAFF" 
                {...register('type')}
                className="text-primary focus:ring-primary" 
              />
              Staff
            </label>
          </div>

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
                    options={members.map(m => ({ label: `${m.name} (${m.phone})`, value: String(m.id) }))}
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
                    options={staff.map(s => ({ label: `${s.name} - ${s.role}`, value: String(s.id) }))}
                    value={field.value || ''}
                    onChange={field.onChange}
                    placeholder="Search Staff..."
                    containerStyle={{ zIndex: 60 }}
                  />
                )}
              />
            )}
            {errors.memberId && watchType === 'MEMBER' && <p className="text-destructive text-xs mt-1">{errors.memberId.message}</p>}
            {errors.staffId && watchType === 'STAFF' && <p className="text-destructive text-xs mt-1">{errors.staffId.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Date</label>
              <input 
                type="date" 
                {...register('date')}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.date ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-warning'
                } bg-input text-foreground`} 
              />
              {errors.date && <p className="text-destructive text-xs mt-1">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Check In Time</label>
              <input 
                type="time" 
                {...register('checkIn')}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.checkIn ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-warning'
                } bg-input text-foreground`} 
              />
              {errors.checkIn && <p className="text-destructive text-xs mt-1">{errors.checkIn.message}</p>}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setShowModal(false)} 
              className="px-4 py-2 border border-border rounded-lg font-medium text-secondary hover:text-foreground hover:bg-primary-subtle transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving}
              className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70" 
              style={{ background: 'var(--attendance-highlight)' }}
            >
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><CheckCircle size={15} /> Check In</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
