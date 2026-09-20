'use client';
// RESPONSIBILITY: Owns newsletter email validation and deterministic mail-client handoff for the Landing footer.
// DATA FLOW: Email input → local validation → mailto URL → browser mail client.
import { useMemo, useState, type FormEvent } from 'react';
import { LandingNewsletterSchema } from '@/app/landing/landing_schemas/LandingNewsletterSchema';
import { LANDING_CONTACT_EMAIL, LANDING_NEWSLETTER_SUBJECT } from '@/app/landing/landing_utils/LandingSharedConstants';

/** Builds the real email handoff used when no newsletter backend endpoint is provided by the module contract. */
export function useLandingNewsletter() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const mailtoHref = useMemo(() => {
    if (!email) return `mailto:${LANDING_CONTACT_EMAIL}?subject=${encodeURIComponent(LANDING_NEWSLETTER_SUBJECT)}`;
    return `mailto:${LANDING_CONTACT_EMAIL}?subject=${encodeURIComponent(LANDING_NEWSLETTER_SUBJECT)}&body=${encodeURIComponent(`Please subscribe this email address: ${email}`)}`;
  }, [email]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = LandingNewsletterSchema.safeParse({ email });
    if (!result.success) {
      setErrorMessage(result.error.issues[0]?.message ?? 'Please enter a valid email address.');
      return;
    }
    setErrorMessage('');
    window.location.href = mailtoHref;
  };

  return { email, setEmail, errorMessage, submit, mailtoHref };
}
