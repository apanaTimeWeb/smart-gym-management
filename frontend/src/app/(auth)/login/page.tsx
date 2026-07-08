'use client';

import { useEffect } from 'react';
import './login.css';
import { LoginProvider } from './login_context/LoginContext';
import LoginVisual from './login_components/LoginVisual/LoginVisual';
import LoginHeader from './login_components/LoginHeader/LoginHeader';
import LoginForm from './login_components/LoginForm/LoginForm';
import { LoginSharedConstants } from './login_constants/LoginSharedConstants';

export default function Login() {
  useEffect(() => {
    const userCookie = document.cookie.split(';').find(c => c.trim().startsWith('gymsmart_user='));
    if (userCookie) {
      window.location.replace(LoginSharedConstants.PATHS.DASHBOARD);
    }
  }, []);

  return (
    <LoginProvider>
      <div className="min-h-screen flex bg-[var(--login-bg-page)] font-sans">
        <LoginVisual />
        <div className="w-full lg:w-[40%] flex items-center justify-center p-6 sm:p-12 relative z-10 bg-[var(--login-bg-page)]">
          <LoginHeader />
          <LoginForm />
        </div>
      </div>
    </LoginProvider>
  );
}
