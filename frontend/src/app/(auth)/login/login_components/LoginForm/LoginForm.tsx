'use client';

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useLoginContext } from '../../login_context/LoginContext';
import { LoginSharedConstants } from '../../login_constants/LoginSharedConstants';

export default function LoginForm() {
  const { email, setEmail, password, setPassword, error, loading, showPassword, setShowPassword, handleLogin } = useLoginContext();

  return (
    <div className="w-full max-w-[420px] bg-[var(--login-bg-card)] p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-[var(--login-border)]/50">
      <div className="mb-8">
        <h2 className="text-[32px] font-bold text-[var(--login-text-primary)] mb-2">{LoginSharedConstants.TEXT.FORM_TITLE}</h2>
        <p className="text-[var(--login-text-secondary)]">{LoginSharedConstants.TEXT.FORM_SUBTITLE}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-[var(--login-danger-bg)] border border-[var(--login-danger)]/20 text-[var(--login-danger)] text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[var(--login-text-secondary)] mb-1.5">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail size={18} className="text-[var(--login-text-secondary)]" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--login-bg-input)] border border-[var(--login-border)] rounded-xl text-[var(--login-text-primary)] placeholder-[var(--login-text-secondary)] focus:outline-none focus:border-[var(--login-border-focus)] focus:ring-1 focus:ring-[var(--login-border-focus)] transition-all"
              placeholder="admin@gymsmart.com"
              required
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--login-text-secondary)] mb-1.5">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock size={18} className="text-[var(--login-text-secondary)]" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-[var(--login-bg-input)] border border-[var(--login-border)] rounded-xl text-[var(--login-text-primary)] placeholder-[var(--login-text-secondary)] focus:outline-none focus:border-[var(--login-border-focus)] focus:ring-1 focus:ring-[var(--login-border-focus)] transition-all"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--login-text-secondary)] hover:text-[var(--login-text-primary)] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 bg-[var(--login-primary)]"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Log In'
          )}
        </button>
      </form>
    </div>
  );
}
