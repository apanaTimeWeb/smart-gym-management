// RESPONSIBILITY: Renders the login form and orchestrates submission. Receives state from useLoginForm hook.
'use client';

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useLoginForm } from '@/app/auth/login/login_components/LoginForm/useLoginForm';
import { LoginSharedConstants } from '@/app/auth/login/login_constants/LoginSharedConstants';

export default function LoginForm() {
  const { form, status, showPassword, setShowPassword, onSubmit } = useLoginForm();
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <div className="w-full max-w-md bg-card p-8 sm:p-10 rounded-2xl shadow-lg border border-border/50">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">{LoginSharedConstants.TEXT.FORM_TITLE}</h2>
        <p className="text-secondary">{LoginSharedConstants.TEXT.FORM_SUBTITLE}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail size={18} className="text-secondary" />
            </div>
            <input
              type="email"
              {...register('email')}
              className={`w-full pl-10 pr-4 py-3 bg-input border ${errors.email ? 'border-danger' : 'border-border'} rounded-xl text-primary placeholder-secondary focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus transition-all`}
              placeholder="admin@gymsmart.com"
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-danger mt-1.5">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary mb-1.5">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock size={18} className="text-secondary" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className={`w-full pl-10 pr-10 py-3 bg-input border ${errors.password ? 'border-danger' : 'border-border'} rounded-xl text-primary placeholder-secondary focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus transition-all`}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-secondary hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-danger mt-1.5">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 bg-primary"
        >
          {status === 'loading' ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Log In'
          )}
        </button>
      </form>
    </div>
  );
}
