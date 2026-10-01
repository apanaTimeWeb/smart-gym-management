// RESPONSIBILITY: Resolves the Login route server session boundary and delegates interactive rendering to the Auth/Login client feature.
import { cookies } from 'next/headers';

import { redirect } from 'next/navigation';

import AuthMain from '@/app/frontend_auth/auth/auth_components/auth_main/AuthMain';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthRoleRedirectUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthRoleRedirectUtilities';

import { AuthSessionServerUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthSessionServerUtilities';



/**
 * Resolves authenticated users server-side, then renders the interactive Login feature.
 * @description Keeps server-only cookie/session work in the reserved route file and delegates client composition to the canonical AuthMain boundary.
 * @dependencies Next.js cookies/redirect primitives and Auth session/redirect utilities.
 * @edge-case Unknown or unverified roles remain on Login rather than being redirected to an invented route.
 */
export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AuthSessionConstants.COOKIES.ACCESS_TOKEN)?.value;
  if (token) {
    const authenticatedUser = await AuthSessionServerUtilities.resolveUser(token);
    const redirectTarget = authenticatedUser ? AuthRoleRedirectUtilities.getDashboardRoute(authenticatedUser.role) : null;
    if (redirectTarget) redirect(redirectTarget);
  }
  return <AuthMain />;
}
