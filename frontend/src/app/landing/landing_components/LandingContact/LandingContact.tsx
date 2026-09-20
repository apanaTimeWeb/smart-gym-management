'use client';
// RESPONSIBILITY: Renders contact information and the contact form; submission logic lives in useLandingContactForm.
import { CheckCircle, LoaderCircle } from 'lucide-react';
import { useLandingContactForm } from '@/app/landing/landing_components/LandingContact/useLandingContactForm';
import { LANDING_CONTACT_DETAILS } from '@/app/landing/landing_utils/LandingSharedConstants';

export default function LandingContact() {
  const { form, submit, retry, startNewMessage, isSubmitting, isSuccess, errorMessage, successMessage } = useLandingContactForm();

  return (
    <section id="contact" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning-bg border border-border rounded-full px-4 py-2 mb-5">Get in Touch</div>
          <h2 className="text-4xl sm:text-5xl font-black text-primary mb-4">Contact <span className="text-primary">Us</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">We&apos;re here to help you!</h3>
            <p className="text-secondary mb-8">Have questions about our memberships, facilities, or personal training? Fill out the form or reach out directly.</p>
            <div className="space-y-6 mb-8">
              {LANDING_CONTACT_DETAILS.map(({ icon: Icon, title, text, href }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-warning-bg flex items-center justify-center flex-shrink-0"><Icon className="text-warning" size={18} strokeWidth={2} /></div>
                  <div>
                    <h4 className="font-bold text-primary text-lg">{title}</h4>
                    {href ? (
                      <a href={href} className="text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page rounded">{text}</a>
                    ) : (
                      <p className="text-secondary">{text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 md:p-10 shadow-card">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-10 text-center motion-safe:animate-in fade-in zoom-in motion-safe:duration-slow">
                <div className="w-16 h-16 rounded-full bg-success-bg flex items-center justify-center mb-5"><CheckCircle className="text-success" size={32} strokeWidth={2} /></div>
                <h3 className="text-xl font-bold text-primary mb-2">Message Sent!</h3>
                <p className="text-secondary">{successMessage}</p>
                <button type="button" onClick={startNewMessage} className="mt-6 min-h-11 px-6 py-3 rounded-xl border border-border text-primary hover:bg-primary-subtle motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">Send another message</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="landing-contact-name" className="text-xs font-medium text-secondary block mb-2">Your Name <span className="text-danger" aria-hidden="true">*</span></label>
                  <input id="landing-contact-name" type="text" autoComplete="name" {...form.register('name')} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={Boolean(form.formState.errors.name)} aria-describedby={form.formState.errors.name ? 'landing-contact-name-error' : undefined} />
                  {form.formState.errors.name && <p id="landing-contact-name-error" role="alert" className="mt-2 text-xs text-danger">{form.formState.errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="landing-contact-email" className="text-xs font-medium text-secondary block mb-2">Email Address <span className="text-danger" aria-hidden="true">*</span></label>
                  <input id="landing-contact-email" type="email" autoComplete="email" {...form.register('email')} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={Boolean(form.formState.errors.email)} aria-describedby={form.formState.errors.email ? 'landing-contact-email-error' : undefined} />
                  {form.formState.errors.email && <p id="landing-contact-email-error" role="alert" className="mt-2 text-xs text-danger">{form.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="landing-contact-message" className="text-xs font-medium text-secondary block mb-2">Message <span className="text-danger" aria-hidden="true">*</span></label>
                  <textarea id="landing-contact-message" rows={4} {...form.register('message')} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page resize-none" aria-invalid={Boolean(form.formState.errors.message)} aria-describedby={form.formState.errors.message ? 'landing-contact-message-error' : undefined} />
                  {form.formState.errors.message && <p id="landing-contact-message-error" role="alert" className="mt-2 text-xs text-danger">{form.formState.errors.message.message}</p>}
                </div>

                {errorMessage && (
                  <div role="alert" className="rounded-xl border border-border bg-danger-bg px-4 py-3 text-sm text-danger">
                    <p className="font-semibold">Message could not be sent.</p>
                    <p className="mt-1">{errorMessage}</p>
                    <button type="button" onClick={retry} className="mt-3 min-h-11 px-4 py-2 rounded-lg border border-border text-danger hover:bg-card motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">Try again</button>
                  </div>
                )}

                <button type="submit" disabled={isSubmitting} className="w-full min-h-12 py-3.5 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:cursor-not-allowed disabled:bg-primary-subtle disabled:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                  <span className="inline-flex w-40 items-center justify-center gap-2">{isSubmitting ? <><LoaderCircle size={18} strokeWidth={2} className="motion-safe:animate-spin motion-reduce:animate-none" />Sending…</> : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
