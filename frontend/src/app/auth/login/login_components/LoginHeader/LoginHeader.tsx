// RESPONSIBILITY: Renders the mobile header for the login page, containing the logo and brand name.
import Image from 'next/image';
import { LoginSharedConstants } from '@/app/auth/login/login_constants/LoginSharedConstants';

export default function LoginHeader() {
 return (
 <div className="lg:hidden absolute top-8 left-8 flex items-center gap-3">
 <Image src={LoginSharedConstants.ASSETS.LOGO} alt={LoginSharedConstants.TEXT.BRAND} width={40} height={40} className="rounded-xl" />
 <h1 className="text-xl font-black text-primary">{LoginSharedConstants.TEXT.BRAND}</h1>
 </div>
 );
}
