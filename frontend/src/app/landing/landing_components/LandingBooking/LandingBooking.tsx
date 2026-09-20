'use client';
// RESPONSIBILITY: Renders the booking form and its success/error states; form logic lives in useLandingBookingForm.
import { ArrowRight, CheckCircle, LoaderCircle } from 'lucide-react';
import { LandingUrlConfig } from '@/app/landing/landing_url_config';
import { LANDING_BOOKING_OPTIONS, LANDING_PHONE_COUNTRY_CODE } from '@/app/landing/landing_utils/LandingSharedConstants';
import { getLandingTodayDateInputValue } from '@/app/landing/landing_utils/LandingDateUtils';
import { useLandingBookingForm } from '@/app/landing/landing_components/LandingBooking/useLandingBookingForm';

const BOOKING_TYPE_HELP_ID = 'landing-booking-type-help';

export default function LandingBooking() {
  const { form, submit, retry, startNewBooking, isSubmitting, isSuccess, errorMessage, successMessage } = useLandingBookingForm();
  const today = getLandingTodayDateInputValue();

  return (
    <section id="booking" className="py-24 px-4 bg-page">
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning-bg border border-border rounded-full px-4 py-2 mb-5">Quick Action</div>
          <h2 className="text-4xl sm:text-5xl font-black text-primary mb-4">Online <span className="text-primary">Booking</span></h2>
          <p className="text-secondary max-w-xl mx-auto">Book your trial, buy membership, or reserve a slot online in seconds.</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-card relative overflow-hidden">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center motion-safe:animate-in fade-in zoom-in motion-safe:duration-slow">
              <div className="w-20 h-20 bg-success-bg rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-success" size={40} strokeWidth={2} />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-2">Booking Confirmed!</h3>
              <p className="text-secondary max-w-xl">{successMessage}</p>
              <button type="button" onClick={startNewBooking} className="mt-6 min-h-11 px-6 py-3 rounded-xl font-semibold border border-border text-primary hover:bg-primary-subtle motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                Book another slot
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={submit} noValidate>
              <fieldset>
                <legend className="sr-only">Booking type</legend>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2" aria-describedby={BOOKING_TYPE_HELP_ID}>
                  {LANDING_BOOKING_OPTIONS.map(({ value, icon: Icon, label }) => (
                    <label key={value} className="cursor-pointer">
                      <input type="radio" value={value} {...form.register('type')} className="peer sr-only" />
                      <span className="min-h-11 bg-card border border-border rounded-xl p-4 text-center flex flex-col items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-page peer-checked:border-focus peer-checked:bg-warning-bg motion-safe:transition-all motion-safe:duration-base">
                        <Icon className="mx-auto mb-2 text-warning" size={18} strokeWidth={2} />
                        <span className="font-semibold text-primary">{label}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <p id={BOOKING_TYPE_HELP_ID} className="text-xs text-secondary">Choose the type of booking you want to request.</p>
              </fieldset>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="landing-booking-name" className="text-xs font-medium text-secondary block mb-2">Full Name <span className="text-danger" aria-hidden="true">*</span></label>
                  <input id="landing-booking-name" type="text" autoComplete="name" {...form.register('name')} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={Boolean(form.formState.errors.name)} aria-describedby={form.formState.errors.name ? 'landing-booking-name-error' : undefined} />
                  {form.formState.errors.name && <p id="landing-booking-name-error" role="alert" className="mt-2 text-xs text-danger">{form.formState.errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="landing-booking-email" className="text-xs font-medium text-secondary block mb-2">Email Address <span className="text-danger" aria-hidden="true">*</span></label>
                  <input id="landing-booking-email" type="email" autoComplete="email" {...form.register('email')} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={Boolean(form.formState.errors.email)} aria-describedby={form.formState.errors.email ? 'landing-booking-email-error' : undefined} />
                  {form.formState.errors.email && <p id="landing-booking-email-error" role="alert" className="mt-2 text-xs text-danger">{form.formState.errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="landing-booking-phone" className="text-xs font-medium text-secondary block mb-2">Phone / WhatsApp <span className="text-danger" aria-hidden="true">*</span></label>
                  <div className="flex bg-input border border-border rounded-xl focus-within:border-focus focus-within:ring-2 focus-within:ring-primary overflow-hidden">
                    <span className="flex items-center justify-center px-4 bg-surface-highlight text-secondary border-r border-border text-sm font-medium">{LANDING_PHONE_COUNTRY_CODE}</span>
                    <input id="landing-booking-phone" type="tel" inputMode="numeric" autoComplete="tel" maxLength={10} {...form.register('phone')} placeholder="9876543210" className="w-full px-4 py-3 bg-transparent text-primary placeholder:text-secondary focus-visible:outline-none" aria-invalid={Boolean(form.formState.errors.phone)} aria-describedby={form.formState.errors.phone ? 'landing-booking-phone-error' : undefined} />
                  </div>
                  {form.formState.errors.phone && <p id="landing-booking-phone-error" role="alert" className="mt-2 text-xs text-danger">{form.formState.errors.phone.message}</p>}
                </div>
                <div>
                  <label htmlFor="landing-booking-date" className="text-xs font-medium text-secondary block mb-2">Preferred Date <span className="text-danger" aria-hidden="true">*</span></label>
                  <input id="landing-booking-date" type="date" min={today} {...form.register('date')} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-invalid={Boolean(form.formState.errors.date)} aria-describedby={form.formState.errors.date ? 'landing-booking-date-error' : undefined} />
                  {form.formState.errors.date && <p id="landing-booking-date-error" role="alert" className="mt-2 text-xs text-danger">{form.formState.errors.date.message}</p>}
                </div>
              </div>

              {errorMessage && (
                <div role="alert" className="rounded-xl border border-border bg-danger-bg px-4 py-3 text-sm text-danger">
                  <p className="font-semibold">Booking could not be submitted.</p>
                  <p className="mt-1">{errorMessage}</p>
                  <button type="button" onClick={retry} className="mt-3 min-h-11 px-4 py-2 rounded-lg border border-border text-danger hover:bg-card motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">
                    Try again
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-12 py-4 rounded-xl font-bold bg-primary text-on-primary text-lg hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:cursor-not-allowed disabled:bg-primary-subtle disabled:text-primary mt-4 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                <span className="inline-flex w-44 items-center justify-center gap-2">
                  {isSubmitting ? <><LoaderCircle size={18} strokeWidth={2} className="motion-safe:animate-spin motion-reduce:animate-none" /><span>Processing…</span></> : <><span>Proceed to Book</span><ArrowRight size={18} strokeWidth={2} /></>}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
