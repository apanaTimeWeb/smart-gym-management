"use client";
// RESPONSIBILITY: Owns the Admin shell trigger for the Attendance QR scanner while keeping scanner state and UI inside the Attendance feature.
import { useState } from 'react';
import { QrCode } from 'lucide-react';
import AdminAttendanceQrScannerModal from '@/app/admin/attendance/attendance_components/AdminAttendanceQrScanner/AdminAttendanceQrScannerModal';

export default function AdminAttendanceQrScannerTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open attendance QR scanner"
        className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg border border-border bg-input text-secondary hover:bg-surface-hover hover:text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <QrCode size={18} aria-hidden="true" />
      </button>
      <AdminAttendanceQrScannerModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
