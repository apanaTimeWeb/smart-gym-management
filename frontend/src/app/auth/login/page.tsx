/**
 * RESPONSIBILITY: Server Component for Login route. Reads the secure session cookies and performs role-aware server-side redirects before rendering the public login UI.
 * DATA FLOW: HTTP-only session token + user cookie -> validated role -> AuthUrlConfig dashboard route OR standalone Login UI.
 */
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { AuthSessionConstants } from '@/app/auth/auth_constants/AuthSessionConstants';
import { AuthRoleConstants } from '@/app/auth/auth_constants/AuthRoleConstants';
import { AuthSessionServerUtils } from '@/app/auth/auth_utils/AuthSessionServerUtils';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';
import LoginErrorBoundary from '@/app/auth/login/login_components/LoginErrorBoundary/LoginErrorBoundary';
import LoginForm from '@/app/auth/login/login_components/LoginForm/LoginForm';
import LoginHeroSection from '@/app/auth/login/login_components/LoginHeroSection/LoginHeroSection';
import LoginMobileHeader from '@/app/auth/login/login_components/LoginMobileHeader/LoginMobileHeader';

function getRoleRedirect(role: string): string | null {
  switch (role.toUpperCase()) {
    case AuthRoleConstants.SUPERADMIN: return AuthUrlConfig.PAGES.SUPERADMIN_DASHBOARD;
    case AuthRoleConstants.ADMIN: return AuthUrlConfig.PAGES.ADMIN_DASHBOARD;
    case AuthRoleConstants.MANAGER: return AuthUrlConfig.PAGES.MANAGER_DASHBOARD;
    case AuthRoleConstants.TRAINER: return AuthUrlConfig.PAGES.TRAINER_DASHBOARD;
    default: return null;
  }
}

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AuthSessionConstants.COOKIES.ACCESS_TOKEN)?.value;
  const userCookie = cookieStore.get(AuthSessionConstants.COOKIES.USER)?.value;

  if (token) {
    const authenticatedUser = await AuthSessionServerUtils.resolveUser(token, userCookie);
    const redirectTarget = authenticatedUser ? getRoleRedirect(authenticatedUser.role) : null;
    if (redirectTarget) redirect(redirectTarget);
  }

  return (
    <main className="relative flex min-h-screen bg-page font-sans">
      <div className="absolute right-4 top-4 z-30 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>
      <LoginErrorBoundary>
        <LoginHeroSection />
        <div className="relative flex w-full items-center justify-center bg-page p-6 pt-24 sm:p-12 lg:w-2/5 lg:pt-12">
          <LoginMobileHeader />
          <LoginForm />
        </div>
      </LoginErrorBoundary>
    </main>
  );
}
