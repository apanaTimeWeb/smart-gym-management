import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import './login.css';
import LoginVisual from './login_components/LoginVisual/LoginVisual';
import LoginHeader from './login_components/LoginHeader/LoginHeader';
import LoginForm from './login_components/LoginForm/LoginForm';
import { LoginSharedConstants } from './login_constants/LoginSharedConstants';

export default async function Login() {
 const cookieStore = await cookies();
 const userCookie = cookieStore.get('gymsmart_user');
 
 if (userCookie) {
 redirect(LoginSharedConstants.PATHS.DASHBOARD);
 }

 return (
 <div className="min-h-screen flex bg-[var(--login-bg-page)] font-sans">
 <LoginVisual />
 <div className="w-full lg:w-[40%] flex items-center justify-center p-6 sm:p-12 relative z-10 bg-[var(--login-bg-page)]">
 <LoginHeader />
 <LoginForm />
 </div>
 </div>
 );
}
