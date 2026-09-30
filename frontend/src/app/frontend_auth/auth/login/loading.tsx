/**
 * RESPONSIBILITY: Next.js route loading boundary that mirrors the Login layout with semantic skeletons instead of a generic spinner.
 * DATA FLOW: Next.js route loading -> AuthLoginLoadingSkeleton presentation.
 */
import AuthLoginLoadingSkeleton from '@/app/frontend_auth/auth/login/auth_login_components/AuthLoginLoadingSkeleton/AuthLoginLoadingSkeleton';

export default function Loading() {
  return <AuthLoginLoadingSkeleton />;
}
