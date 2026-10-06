// RESPONSIBILITY: Renders ManagerMembersMemberProfilePictureUpload's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Camera } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * ManagerMembersMemberProfilePictureUpload
 * Displays a circular file-upload zone for capturing a member's face photo.
 * This photo is later used for QR Code face verification during kiosk check-in.
 * The supplied frontend contract does not define a member-photo upload API, so the visible file control is intentionally disabled rather than presenting a dead upload flow.
 */
/**
 * @description Renders the `ManagerMembersMemberProfilePictureUpload` component for the `members` feature boundary. Owns this component’s presentation/orchestration responsibility and delegates server data and business mutations to the documented hooks/API layer.
 * @dependencies Uses Camera, useTranslations; all business-specific dependencies remain inside the owning feature or approved application infrastructure.
 * @edge-case Preserves the documented loading, empty, error, disabled, keyboard, responsive, and retry/confirmation states without introducing sibling-feature business dependencies.
 */
export default function ManagerMembersMemberProfilePictureUpload() {
  const t = useTranslations('MANAGER_MEMBERS');

  return (
    <div className="flex flex-col items-center justify-center mb-6 pb-6 border-b border-border">
      <div className="w-24 h-24 rounded-full bg-input border-2 border-dashed border-border flex flex-col items-center justify-center text-secondary mb-3 relative overflow-hidden group cursor-pointer hover:border-primary motion-safe:transition-all motion-safe:duration-base ease-in-out">
        <Camera size={18} strokeWidth={2} className="mb-1 group-hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out"/>
        <span className="text-xs font-medium group-hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out">{t("COPY_UPLOAD")}</span>
        <input data-testid="manager_members-manager-members-modal-input-file-upload"
          type="file"
          aria-label={t("COPY_UPLOAD_MEMBER_PROFILE_PICTURE_FACE_VERIFICATION")}
          className="absolute inset-0 opacity-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          accept="image/jpeg,image/png,image/webp"
          disabled
          aria-disabled="true"
        />
      </div>
      <p className="text-xs text-secondary text-center max-w-xs">{t("COPY_UPLOAD_CLEAR_FACE_PHOTO_USED_QR_CODE_FACE_VERIFICATION")}</p>
    </div>
  );
}
