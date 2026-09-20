// RESPONSIBILITY: Defines the strongly typed contracts owned by the Landing module.
import type { ComponentType } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, RefObject } from 'react';
export const LANDING_BMI_STATUSES = {
  UNDERWEIGHT: 'Underweight',
  NORMAL_WEIGHT: 'Normal Weight',
  OVERWEIGHT: 'Overweight',
  OBESE: 'Obese',
} as const;

export type LandingBmiStatus = typeof LANDING_BMI_STATUSES[keyof typeof LANDING_BMI_STATUSES];

export type LandingBmiColorClass =
  | 'bmi-result--underweight'
  | 'bmi-result--normal'
  | 'bmi-result--overweight'
  | 'bmi-result--obese';

export interface LandingBmiResult {
  value: string;
  status: LandingBmiStatus;
  colorClass: LandingBmiColorClass;
}

export type LandingBookingType = 'trial' | 'membership' | 'class';

export interface LandingBookingFormValues {
  name: string;
  email: string;
  phone: string;
  date: string;
  type: LandingBookingType;
}

export interface LandingContactFormValues {
  name: string;
  email: string;
  message: string;
}

export interface LandingBookingApiPayload extends Omit<LandingBookingFormValues, 'date'> {
  date: string;
}

export interface LandingContactApiPayload extends LandingContactFormValues {}

export interface LandingMockBookingRecord extends LandingBookingApiPayload {
  id: string;
}

export interface LandingMockContactRecord extends LandingContactApiPayload {
  id: string;
}

export interface LandingNavbarController {
  menuOpen: boolean;
  scrolled: boolean;
  menuPanelRef: RefObject<HTMLDivElement | null>;
  closeMenu: () => void;
  toggleMenu: () => void;
  handleMenuKeyDown: (event: ReactKeyboardEvent<HTMLDivElement>) => void;
}

export interface LandingServiceConfig {
  id: string;
  title: string;
  description: string;
  icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  iconToneClass: string;
}

export type LandingQueryProviderProps = {
  children: import('react').ReactNode;
};

export type LandingErrorReporter = (payload: {
  route: string;
  module: string;
  digest?: string;
  timestamp: string;
}) => void;

export interface LandingApiRequestErrorOptions {
  errorCode?: string;
  validationErrors?: LandingFieldValidationError[];
}

export interface LandingFieldValidationError {
  field: string;
  message: string;
}

export interface LandingApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: Record<string, unknown>;
  error?: string;
  errorCode?: string;
  statusCode?: number;
  validationErrors?: LandingFieldValidationError[];
}

export class LandingApiRequestError extends Error {
  readonly errorCode?: string;
  readonly validationErrors?: LandingFieldValidationError[];

  constructor(
    message: string,
    options?: LandingApiRequestErrorOptions,
  ) {
    super(message);
    this.name = 'LandingApiRequestError';
    this.errorCode = options?.errorCode;
    this.validationErrors = options?.validationErrors;
  }
}

