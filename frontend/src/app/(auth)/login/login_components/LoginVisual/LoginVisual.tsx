import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { LoginSharedConstants } from '../../login_constants/LoginSharedConstants';

export default function LoginVisual() {
 return (
 <div className="hidden lg:flex lg:w-[60%] relative bg-black overflow-hidden flex-col justify-between p-12">
 <div className="absolute inset-0" style={{
 backgroundImage: `url('${LoginSharedConstants.ASSETS.HERO_IMAGE}')`,
 backgroundSize: 'cover',
 backgroundPosition: 'center',
 opacity: 0.4
 }} />
 <div className="absolute inset-0 bg-gradient-to-r from-[var(--login-bg-page)]/90 to-transparent" />

 <div className="relative z-10 flex items-center gap-3">
 <Image src={LoginSharedConstants.ASSETS.LOGO} alt={LoginSharedConstants.TEXT.BRAND} width={48} height={48} className="rounded-xl shadow-lg" />
 <div>
 <h1 className="text-2xl font-black text-[var(--login-text-primary)] leading-tight">{LoginSharedConstants.TEXT.BRAND}</h1>
 <p className="text-xs font-medium text-[var(--login-primary)] uppercase tracking-widest">{LoginSharedConstants.TEXT.BRAND_TAGLINE}</p>
 </div>
 </div>

 <div className="relative z-10 mb-20 max-w-lg">
 <h2 className="text-5xl font-black text-[var(--login-text-primary)] mb-6 leading-tight">
 {LoginSharedConstants.TEXT.TITLE}<br/>
 <span className="text-[var(--login-primary)]">{LoginSharedConstants.TEXT.SUBTITLE}</span>
 </h2>
 <div className="flex items-center gap-3 text-[var(--login-success)] bg-[var(--login-success-bg)] border border-[var(--login-success)]/20 px-4 py-2 rounded-full w-max">
 <CheckCircle2 size={16} />
 <span className="text-sm font-semibold">{LoginSharedConstants.TEXT.SECURE_BADGE}</span>
 </div>
 </div>
 </div>
 );
}
