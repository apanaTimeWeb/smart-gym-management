/**
 * RESPONSIBILITY: Next.js route loading boundary that mirrors the Login layout with semantic skeletons instead of a generic spinner.
 * DATA FLOW: Next.js route loading -> LoginLoadingSkeleton presentation.
 */
import LoginLoadingSkeleton from '@/app/auth/login/login_components/LoginLoadingSkeleton/LoginLoadingSkeleton';

export default function Loading() {
  return <LoginLoadingSkeleton />;
}
