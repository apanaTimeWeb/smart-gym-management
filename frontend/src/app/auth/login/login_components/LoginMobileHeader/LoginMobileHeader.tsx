/**
 * RESPONSIBILITY: Renders the mobile-only Login brand header without owning authentication or navigation logic.
 * DATA FLOW: LoginSharedConstants -> static presentation.
 */
import Image from 'next/image';
import { LoginSharedConstants } from '@/app/auth/login/login_constants/LoginSharedConstants';

export default function LoginMobileHeader() {
  return (
    <div className="absolute left-6 top-6 flex items-center gap-3 lg:hidden">
      <div className="h-10 w-10 overflow-hidden rounded-md border border-border bg-card">
        <Image src={LoginSharedConstants.ASSETS.LOGO} alt={LoginSharedConstants.TEXT.BRAND} width={40} height={40} className="h-full w-full object-cover" />
      </div>
      <h2 className="text-xl font-bold text-primary">{LoginSharedConstants.TEXT.BRAND}</h2>
    </div>
  );
}
