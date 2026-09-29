// RESPONSIBILITY: Stores public Contact section content and contact-detail presentation metadata.
import { Mail, MapPin, Phone } from 'lucide-react';
import { PublicLandingUrlConfig } from '@/app/frontend_public/landing/landing_url_config';
import type { ComponentType } from 'react';

export const LANDING_CONTACT_EMAIL = 'hello@gymsmart.com';
export const LANDING_CONTACT_PHONE = '+91 98765 43210';
export const LANDING_CONTACT_ADDRESS = '123 Fitness Avenue, Bandra West, Mumbai 400050';

export const LANDING_CONTACT_DETAILS = [
  { icon: MapPin, titleKey: 'contact.details.location', text: LANDING_CONTACT_ADDRESS, href: undefined },
  { icon: Phone, titleKey: 'contact.details.phone', text: LANDING_CONTACT_PHONE, href: PublicLandingUrlConfig.EXTERNAL.PHONE },
  { icon: Mail, titleKey: 'contact.details.email', text: LANDING_CONTACT_EMAIL, href: PublicLandingUrlConfig.EXTERNAL.EMAIL },
] as const satisfies readonly { icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number; }>; titleKey: string; text: string; href?: string; }[];
