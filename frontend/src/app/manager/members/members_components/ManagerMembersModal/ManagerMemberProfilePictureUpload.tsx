// RESPONSIBILITY: Renders the profile picture upload placeholder in the Add Member form.
// Used by ManagerMembersModal. Extracted to keep the modal under the 300-line ceiling (Rule 1).
'use client';

import { Camera } from 'lucide-react';

/**
 * ManagerMemberProfilePictureUpload
 * Displays a circular file-upload zone for capturing a member's face photo.
 * This photo is later used for QR Code face verification during kiosk check-in.
 * No state — input is uncontrolled; a real implementation would use react-hook-form's `register`.
 */
export default function ManagerMemberProfilePictureUpload() {
  return (
    <div className="flex flex-col items-center justify-center mb-6 pb-6 border-b border-border">
      <div className="w-24 h-24 rounded-full bg-input border-2 border-dashed border-border flex flex-col items-center justify-center text-secondary mb-3 relative overflow-hidden group cursor-pointer hover:border-primary motion-safe:transition-colors">
        <Camera size={24} className="mb-1 group-hover:text-primary motion-safe:transition-colors" />
        <span className="text-xs font-medium group-hover:text-primary motion-safe:transition-colors">Upload</span>
        <input
          type="file"
          aria-label="Upload member profile picture for face verification"
          className="absolute inset-0 opacity-0 cursor-pointer"
          accept="image/jpeg,image/png,image/webp"
        />
      </div>
      <p className="text-xs text-secondary text-center max-w-xs">
        Upload a clear face photo. Used for QR Code face verification at front desk check-in.
      </p>
    </div>
  );
}
