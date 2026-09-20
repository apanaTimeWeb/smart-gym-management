// RESPONSIBILITY: Stores Landing-owned static UI configuration and marketing content; no server records belong here.
import {
  Award,
  Calendar,
  Camera,
  CreditCard,
  Globe,
  Hash,
  CheckCircle,
  Clock,
  Dumbbell,
  Heart,
  Mail,
  MapPin,
  Phone,
  Play,
  Shield,
  Ticket,
  Users,
  Zap as Lightning,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type { LandingBookingType, LandingServiceConfig } from '@/app/landing/landing_types/landing_types';
import { LandingUrlConfig } from '@/app/landing/landing_url_config';

export const LANDING_PHONE_COUNTRY_CODE = '+91';
export const LANDING_CONTACT_EMAIL = 'hello@gymsmart.com';
export const LANDING_CONTACT_PHONE = '+91 98765 43210';
export const LANDING_CONTACT_ADDRESS = '123 Fitness Avenue, Bandra West, Mumbai 400050';

export const LANDING_NAVIGATION_LINKS = [
  { label: 'About', href: LandingUrlConfig.ANCHORS.ABOUT },
  { label: 'Plans', href: LandingUrlConfig.ANCHORS.PLANS },
  { label: 'Trainers', href: LandingUrlConfig.ANCHORS.TRAINERS },
  { label: 'Services', href: LandingUrlConfig.ANCHORS.SERVICES },
  { label: 'Schedule', href: LandingUrlConfig.ANCHORS.SCHEDULE },
  { label: 'Booking', href: LandingUrlConfig.ANCHORS.BOOKING },
  { label: 'Gallery', href: LandingUrlConfig.ANCHORS.GALLERY },
] as const;

export const LANDING_MOBILE_NAVIGATION_LINKS = [
  ...LANDING_NAVIGATION_LINKS,
  { label: 'Contact', href: LandingUrlConfig.ANCHORS.CONTACT },
] as const;

export const LANDING_MAX_RATING = 5;

export const LANDING_STATS = [
  { value: '5000+', label: 'Happy Members' },
  { value: '10+', label: 'Expert Trainers' },
  { value: '24/7', label: 'Always Open' },
  { value: '15+', label: 'Years Experience' },
] as const;

export const LANDING_SERVICES: readonly LandingServiceConfig[] = [
  { id: 'bodybuilding', title: 'Bodybuilding', description: 'State-of-the-art equipment for strength & muscle building with expert guidance', icon: Dumbbell, iconToneClass: 'landing-service-icon--primary' },
  { id: 'weight-loss', title: 'Weight Loss', description: 'Effective fat loss programs combining cardio, diet, and strength training', icon: Play, iconToneClass: 'landing-service-icon--danger' },
  { id: 'weight-gain', title: 'Weight Gain', description: 'Specialized programs and nutrition for healthy weight and muscle mass gain', icon: Award, iconToneClass: 'landing-service-icon--purple' },
  { id: 'cardio', title: 'Cardio', description: 'Modern treadmills, cycles and ellipticals for endurance training', icon: Heart, iconToneClass: 'landing-service-icon--success' },
  { id: 'crossfit', title: 'Crossfit', description: 'High-intensity functional training for maximum calorie burn and performance', icon: Lightning, iconToneClass: 'landing-service-icon--warning' },
  { id: 'yoga', title: 'Yoga', description: 'Improve flexibility, mental focus, and core strength in peaceful sessions', icon: Users, iconToneClass: 'landing-service-icon--info' },
  { id: 'zumba', title: 'Zumba', description: 'Fun and energetic dance fitness classes to burn calories with joy', icon: Users, iconToneClass: 'landing-service-icon--danger' },
  { id: 'personal-training', title: 'Personal Training', description: 'One-on-one certified trainer sessions with custom diet & workout plans', icon: Shield, iconToneClass: 'landing-service-icon--primary' },
  { id: 'diet-plan', title: 'Diet Plan', description: '5M+ food database with custom meal plans designed for your fitness goals', icon: CheckCircle, iconToneClass: 'landing-service-icon--success' },
];

export const LANDING_TRAINERS = [
  { name: 'Rajesh Kumar', role: 'Head Trainer & Nutritionist', experience: '12 yrs', specialization: 'Bodybuilding, Strength', certification: 'ACE Certified', initials: 'RK', avatarClass: 'landing-trainer-avatar--primary' },
  { name: 'Pooja Sharma', role: 'Yoga & Wellness Coach', experience: '8 yrs', specialization: 'Yoga, Mindfulness', certification: 'RYT 500', initials: 'PS', avatarClass: 'landing-trainer-avatar--danger' },
  { name: 'Arjun Mehta', role: 'CrossFit Specialist', experience: '6 yrs', specialization: 'HIIT, CrossFit', certification: 'CrossFit L2', initials: 'AM', avatarClass: 'landing-trainer-avatar--info' },
  { name: 'Sunita Rao', role: 'Cardio & Zumba Expert', experience: '9 yrs', specialization: 'Cardio, Dance Fitness', certification: 'Zumba Pro', initials: 'SR', avatarClass: 'landing-trainer-avatar--success' },
] as const;

export const LANDING_ABOUT_STATS = [
  { label: 'Happy Members', value: '5000+', icon: Users, iconToneClass: 'bg-primary-subtle text-primary' },
  { label: 'Expert Trainers', value: '10+', icon: Award, iconToneClass: 'bg-info-bg text-info' },
  { label: 'Hours Open', value: '24/7', icon: Clock, iconToneClass: 'bg-success-bg text-success' },
  { label: 'Transformations', value: '2000+', icon: Heart, iconToneClass: 'bg-warning-bg text-warning' },
] as const;

export const LANDING_ABOUT_FEATURES = [
  '10+ Certified Trainers',
  '24/7 Open',
  '5M+ Food Database',
  'Ladies Only Sections',
  'Steam & Locker Rooms',
  'Free Diet Consultation',
] as const;

export const LANDING_TRANSFORMATIONS = [
  { name: 'Rahul Sharma', type: 'Fat Loss', before: '98 kg', after: '72 kg', duration: '6 months', initials: 'RS', review: 'Lost 26kg! GymSmart trainers are the best. Life changing experience!' },
  { name: 'Priya Patel', type: 'Muscle Gain', before: '48 kg', after: '58 kg', duration: '4 months', initials: 'PP', review: 'Gained lean muscle, feel so confident now. Best gym in the city!' },
  { name: 'Amit Verma', type: 'Body Transformation', before: '110 kg', after: '78 kg', duration: '8 months', initials: 'AV', review: 'From XL to M size! The diet plans and training were perfectly tailored.' },
] as const;

export const LANDING_TESTIMONIALS = [
  { name: 'Sneha Mehta', rating: 5, text: 'GymSmart has completely transformed my lifestyle. The trainers are professional and the facilities are world-class. 100% recommended!', member: 'Premium Member – 2 years', initials: 'SM' },
  { name: 'Vijay Singh', rating: 5, text: 'Best gym in Mumbai! The 24/7 access is super convenient for my work schedule. Diet plans actually work!', member: 'Gold Member – 1 year', initials: 'VS' },
  { name: 'Anita Gupta', rating: 5, text: 'Lost 15kg in 4 months with the personalized program. The team is super supportive and motivating!', member: 'Annual Member – 3 years', initials: 'AG' },
  { name: 'Rohit Yadav', rating: 5, text: 'Amazing equipment, clean facilities, and expert trainers. The GymSmart app makes tracking progress so easy!', member: 'Premium Member – 18 months', initials: 'RY' },
] as const;

export const LANDING_PLANS = [
  { name: '1 Month', priceInr: 1500, oldPriceInr: 2000, duration: '1 month', features: ['General Gym Access', 'Locker facility', 'Cardio equipment'], badge: null, featured: false, includeEmiNote: false },
  { name: '3 Months', priceInr: 4000, oldPriceInr: 4500, duration: '3 months', features: ['Everything in 1 Month', 'Basic Diet Guidance', 'Group Classes'], badge: 'Popular', featured: true, includeEmiNote: false },
  { name: '6 Months', priceInr: 7500, oldPriceInr: 9000, duration: '6 months', features: ['Everything in 3 Months', '1 PT Session/month', 'Body comp analysis'], badge: null, featured: false, includeEmiNote: false },
  { name: '12 Months', priceInr: 12000, oldPriceInr: 18000, duration: 'Annual', features: ['Everything in 6 Months', '2 months FREE', 'Advanced Meal Planning'], badge: 'Best Value', featured: true, includeEmiNote: true },
  { name: 'Personal Training', priceInr: 8000, oldPriceInr: 10000, duration: '/month', features: ['1-on-1 Dedicated Trainer', 'Custom Daily Diet', 'Priority Access'], badge: null, featured: false, includeEmiNote: false },
] as const;

export const LANDING_SCHEDULE_DAYS = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
] as const;

export const LANDING_SCHEDULE = [
  { time: '06:00 AM - 08:00 AM', monday: 'Cardio (Sunita)', tuesday: 'CrossFit (Arjun)', wednesday: 'Yoga (Pooja)', thursday: 'Strength (Rajesh)', friday: 'Zumba (Sunita)', saturday: 'CrossFit (Arjun)', sunday: 'Rest' },
  { time: '08:00 AM - 10:00 AM', monday: 'Strength (Rajesh)', tuesday: 'Yoga (Pooja)', wednesday: 'Cardio (Sunita)', thursday: 'CrossFit (Arjun)', friday: 'Strength (Rajesh)', saturday: 'Yoga (Pooja)', sunday: 'Open Gym' },
  { time: '06:00 PM - 08:00 PM', monday: 'Zumba (Sunita)', tuesday: 'Strength (Rajesh)', wednesday: 'CrossFit (Arjun)', thursday: 'Yoga (Pooja)', friday: 'Cardio (Sunita)', saturday: 'Zumba (Sunita)', sunday: 'Open Gym' },
  { time: '08:00 PM - 10:00 PM', monday: 'CrossFit (Arjun)', tuesday: 'Cardio (Sunita)', wednesday: 'Strength (Rajesh)', thursday: 'Zumba (Sunita)', friday: 'Yoga (Pooja)', saturday: 'Rest', sunday: 'Closed' },
] as const;

export const LANDING_GALLERY_ITEMS = [
  { src: '/gym_gallery_cardio.png', alt: 'Cardio Section', label: 'Advanced Cardio' },
  { src: '/gym_gallery_weights.png', alt: 'Free Weights', label: 'Free Weights Area' },
  { src: '/gym_gallery_studio.png', alt: 'Yoga & Group Studio', label: 'Yoga & Group Studio' },
] as const;

export const LANDING_BOOKING_OPTIONS = [
  { value: 'trial', icon: Ticket, label: 'Book Trial' },
  { value: 'membership', icon: CreditCard, label: 'Buy Membership' },
  { value: 'class', icon: Calendar, label: 'Reserve Class Slot' },
] as const satisfies readonly { value: LandingBookingType; label: string; icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }> }[];

export const LANDING_CONTACT_DETAILS = [
  { icon: MapPin, title: 'Location', text: LANDING_CONTACT_ADDRESS, href: undefined },
  { icon: Phone, title: 'Phone', text: LANDING_CONTACT_PHONE, href: `tel:${LANDING_CONTACT_PHONE.replaceAll(' ', '')}` },
  { icon: Mail, title: 'Email', text: LANDING_CONTACT_EMAIL, href: `mailto:${LANDING_CONTACT_EMAIL}` },
] as const;

export const LANDING_SOCIAL_LINKS = [
  { label: 'Facebook', href: LandingUrlConfig.EXTERNAL.FACEBOOK, icon: Globe, className: 'landing-social-facebook' },
  { label: 'Instagram', href: LandingUrlConfig.EXTERNAL.INSTAGRAM, icon: Camera, className: 'landing-social-instagram' },
  { label: 'X', href: LandingUrlConfig.EXTERNAL.X, icon: Hash, className: 'landing-social-x' },
  { label: 'YouTube', href: LandingUrlConfig.EXTERNAL.YOUTUBE, icon: Play, className: 'landing-social-youtube' },
] as const;

export const LANDING_FOOTER_QUICK_LINKS = [
  { label: 'About Us', href: LandingUrlConfig.ANCHORS.ABOUT },
  { label: 'Membership Plans', href: LandingUrlConfig.ANCHORS.PLANS },
  { label: 'Trainers', href: LandingUrlConfig.ANCHORS.TRAINERS },
  { label: 'Classes Schedule', href: LandingUrlConfig.ANCHORS.SCHEDULE },
  { label: 'Gallery', href: LandingUrlConfig.ANCHORS.GALLERY },
  { label: 'Contact Us', href: LandingUrlConfig.ANCHORS.CONTACT },
] as const;

export const LANDING_FOOTER_PROGRAM_LINKS = LANDING_SERVICES.map((service) => ({
  label: service.title,
  href: `#service-${service.id}`,
}));

export const LANDING_NEWSLETTER_SUBJECT = 'GymSmart Newsletter Subscription Request';

export const EMPTY_LANDING_BOOKING_FORM = {
  name: '',
  email: '',
  phone: '',
  date: '',
  type: 'trial' as LandingBookingType,
};

export const EMPTY_LANDING_CONTACT_FORM = {
  name: '',
  email: '',
  message: '',
};
