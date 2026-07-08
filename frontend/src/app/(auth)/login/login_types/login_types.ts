import { FormEvent } from 'react';

export interface UseLoginFormReturn {
 email: string;
 setEmail: (val: string) => void;
 password: string;
 setPassword: (val: string) => void;
 error: string;
 loading: boolean;
 showPassword: boolean;
 setShowPassword: (val: boolean) => void;
 handleLogin: (e: FormEvent) => Promise<void>;
}
