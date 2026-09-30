// RESPONSIBILITY: Server Component for the public Login route. Resolves the secure session server-side and redirects authenticated users by role.
// DATA FLOW: HTTP-only access cookie -> AuthSessionServerUtils -> AuthUrlConfig role destination OR standalone Login UI.
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';
import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';
import { AuthRoleRedirectUtils } from '@/app/frontend_auth/auth/auth_utils/AuthRoleRedirectUtils';
import { AuthSessionServerUtils } from '@/app/frontend_auth/auth/auth_utils/AuthSessionServerUtils';
import AuthLoginErrorBoundary from '@/app/frontend_auth/auth/login/auth_login_components/AuthLoginErrorBoundary/AuthLoginErrorBoundary';
import AuthLoginForm from '@/app/frontend_auth/auth/login/auth_login_components/AuthLoginForm/AuthLoginForm';
import AuthLoginHeroSection from '@/app/frontend_auth/auth/login/auth_login_components/AuthLoginHeroSection/AuthLoginHeroSection';
import AuthLoginMobileHeader from '@/app/frontend_auth/auth/login/auth_login_components/AuthLoginMobileHeader/AuthLoginMobileHeader';
/**
 * Renders the public Login route after secure session resolution and role-aware redirect handling.
 * @description Remains a Server Component so access/session cookies are evaluated server-side.
 * @dependencies Next.js cookies/redirect primitives, AuthSessionServerUtils, AuthUrlConfig, and zero-business ThemeToggle.
 * @edge-case Unknown or unverified roles remain on the Login page rather than redirecting to an invented destination.
 */
export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AuthSessionConstants.COOKIES.ACCESS_TOKEN)?.value;
  if (token) {
    const authenticatedUser = await AuthSessionServerUtils.resolveUser(token);
    const redirectTarget = authenticatedUser ? AuthRoleRedirectUtils.getDashboardRoute(authenticatedUser.role) : null;
    if (redirectTarget) redirect(redirectTarget);
  }

  return (
    <main className="relative flex min-h-screen bg-page font-sans">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>
      <AuthLoginErrorBoundary>
        <AuthLoginHeroSection />
      </AuthLoginErrorBoundary>
      <AuthLoginErrorBoundary>
        <div className="relative flex w-full items-center justify-center bg-page p-6 pt-24 sm:p-12 lg:w-2/5 lg:pt-12">
          <AuthLoginMobileHeader />
          <AuthLoginForm />
        </div>
      </AuthLoginErrorBoundary>
    </main>
  );
}
