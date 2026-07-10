import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import '@/app/(auth)/login/login.css';
import LoginVisual from '@/app/(auth)/login/login_components/LoginVisual/LoginVisual';
import LoginHeader from '@/app/(auth)/login/login_components/LoginHeader/LoginHeader';
import LoginForm from '@/app/(auth)/login/login_components/LoginForm/LoginForm';
import { LoginSharedConstants } from '@/app/(auth)/login/login_constants/LoginSharedConstants';
import { ThemeToggle } from '@/components/ThemeToggle';

export default async function Login() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('gymsmart_token');
  
  if (tokenCookie) {
    redirect(LoginSharedConstants.PATHS.DASHBOARD);
  }

  return (
    <div className="min-h-screen flex bg-[var(--login-bg-page)] font-sans relative">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      <LoginVisual />
      <div className="w-full lg:w-[40%] flex items-center justify-center p-6 sm:p-12 relative z-10 bg-[var(--login-bg-page)]">
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  );
}
