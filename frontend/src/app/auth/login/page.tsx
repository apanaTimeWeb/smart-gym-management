import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginHeroSection from '@/app/auth/login/login_components/LoginHeroSection/LoginHeroSection';
import LoginMobileHeader from '@/app/auth/login/login_components/LoginMobileHeader/LoginMobileHeader';
import LoginForm from '@/app/auth/login/login_components/LoginForm/LoginForm';
import LoginErrorBoundary from '@/app/auth/login/login_components/LoginErrorBoundary/LoginErrorBoundary';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { ThemeToggle } from '@/components/ThemeToggle';
import './login.css';

// RESPONSIBILITY: Server Component that handles initial auth check and renders the login layout.
export default async function Login() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('gymsmart_token');
  
  if (tokenCookie) {
    const userCookie = cookieStore.get('gymsmart_user');
    let role = '';
    try {
      if (userCookie?.value) {
        const user = JSON.parse(decodeURIComponent(userCookie.value));
        role = user?.role || '';
      }
    } catch (e) {}

    if (role === 'SUPERADMIN') {
      redirect(SuperadminUrlConfig.PAGES.DASHBOARD);
    } else {
      redirect(AuthUrlConfig.PAGES.DASHBOARD);
    }
  }

  return (
    <div className="min-h-screen flex bg-page font-sans relative">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <LoginErrorBoundary>
        <LoginHeroSection />
        <div className="w-full lg:w-2/5 flex items-center justify-center p-6 sm:p-12 relative z-10 bg-page">
          <LoginMobileHeader />
          <LoginForm />
        </div>
      </LoginErrorBoundary>
    </div>
  );
}
