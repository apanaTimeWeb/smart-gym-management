// RESPONSIBILITY: Renders the static Login security footer copy without containing business behavior.
'use client';

import type { AuthLoginFormFooterProps } from '@/app/frontend_auth/auth/login/auth_login_types/AuthLoginTypes';



/**
 * Renders the static Login security/footer message beneath the credential panel.
 * @description Presentation-only text; it does not own authentication state, navigation, or validation.
 * @dependencies AuthLoginFormFooterProps and the active Login translation supplied by the parent view.
 * @edge-case The component remains visible during validation failures because it is independent of mutation state.
 */
export default function AuthLoginFormFooter({ label }: AuthLoginFormFooterProps) {
  return <p className="text-center text-xs text-secondary">{label}</p>;
}
