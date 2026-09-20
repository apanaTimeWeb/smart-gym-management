'use client';
// RESPONSIBILITY: Renders the modal for marking new attendance records for members or staff.
import { useManagerAttendanceForm } from '@/app/manager/attendance/attendance_hooks/ManagerUseManagerAttendanceForm';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { Controller } from 'react-hook-form';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';

export default function ManagerAttendanceModal() {
  const { showModal, setShowModal, members, staff, saving, tab, form, handleClose, submit, watchType, watchStatus, todayDate } = useManagerAttendanceForm();
  const { register, control, formState: { errors } } = form;

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4">
      <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-md border border-border">
        <div className="flex justify-between items-center p-5 border-b border-border">
          <h3 className="font-bold text-lg text-primary">Record Attendance</h3>
          <button 
            type="button"
            aria-label="Close attendance form"
            onClick={handleClose} 
            className="min-h-11 min-w-11 flex items-center justify-center text-secondary hover:text-primary hover:bg-primary-subtle p-1 rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-4">
          
          {tab === 'Daily Attendance Report' && (
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">User Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="MEMBER" {...register('type')} className="text-primary focus:ring-primary h-4 w-4" />
                  <span className="text-sm font-medium text-primary">Member</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" value="STAFF" {...register('type')} className="text-primary focus:ring-primary h-4 w-4" />
                  <span className="text-sm font-medium text-primary">Staff</span>
                </label>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">
              {watchType === 'MEMBER' ? 'Select Member' : 'Select Staff'}
            </label>
            {watchType === 'MEMBER' ? (
                <Controller
                  name="memberId"
                  control={control}
                  render={({ field }) => (
                    <ManagerSearchableDropdown
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
                    <ManagerSearchableDropdown
                      options={staff.filter(s => ('role' in s) || ('salary' in s) || !('planId' in s)).map(s => ({ label: `${s.name} - ${((s as unknown) as { role?: string }).role || 'Staff'}`, value: String(s.id) }))}
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
                <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
                  <input type="radio" value="PRESENT" {...register('status')} className="text-primary focus:ring-primary" /> Present
                </label>
                <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
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
                min={watchStatus !== 'LEAVE' ? todayDate : undefined}
                max={watchStatus !== 'LEAVE' ? todayDate : undefined}
                readOnly={watchStatus !== 'LEAVE'}
                {...register('date')}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus-visible:ring-2 ${
                  errors.date ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-primary'
                } bg-input text-primary ${watchStatus !== 'LEAVE' ? 'opacity-80 cursor-not-allowed' : ''}`} 
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
                  } bg-input text-primary`} 
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
                  } bg-input text-primary`} 
                />
                {errors.checkIn && <p className="text-danger text-xs mt-1">{errors.checkIn.message}</p>}
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={handleClose} 
              className="px-4 py-2 border border-border rounded-lg font-medium text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving}
              className="min-w-32 px-4 py-2 rounded-lg font-medium text-on-primary bg-primary flex items-center gap-2 hover:opacity-90 motion-safe:transition-opacity disabled:opacity-70" 
            >
              {saving ? <Loader2 className="w-4 h-4 motion-safe:animate-spin" /> : <><CheckCircle size={18} /> Check In</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
