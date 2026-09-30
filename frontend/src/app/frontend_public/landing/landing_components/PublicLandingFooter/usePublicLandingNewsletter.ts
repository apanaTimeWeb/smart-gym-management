// RESPONSIBILITY: Validates newsletter email input and opens the user's mail client because no newsletter API contract is supplied.
'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { PublicLandingNewsletterSchema } from '@/app/frontend_public/landing/landing_schemas/PublicLandingNewsletterSchema';
import { PublicLandingUrlConfig } from '@/app/frontend_public/landing/landing_url_config';

/** Owns newsletter validation and mail-client URL creation.
 * @dependencies PublicLanding Zod newsletter schema, URL config, and next-intl.
 * @edge-case Invalid email retains the input and returns a translation key; no fake subscription success is generated.
 */
export function usePublicLandingNewsletter() {
  const t = useTranslations('LANDING');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const mailtoHref = useMemo(
    () => `${PublicLandingUrlConfig.EXTERNAL.EMAIL}?subject=${encodeURIComponent(t('footer.newsletter.subject'))}&body=${encodeURIComponent(t('footer.newsletter.mailtoBody', { email }))}`,
    [email, t],
  );
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = PublicLandingNewsletterSchema.safeParse({ email });
    if (!result.success) { setErrorMessage(result.error.issues[0]?.message ?? 'validation.email'); return; }
    setErrorMessage('');
    window.location.assign(mailtoHref);
  };
  return { email, setEmail, errorMessage, handleSubmit, mailtoHref };
}
