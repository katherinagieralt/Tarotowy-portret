'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema, ContactFormSchemaEn, type ContactFormInput } from '@/schemas/contact';
import { toastService } from '@/lib/toast';
import { TurnstileToken } from './TurnstileToken';

export function ContactForm({ isEnglish = false }: { isEnglish?: boolean }) {
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(isEnglish ? ContactFormSchemaEn : ContactFormSchema),
    mode: 'onBlur',
  });

  async function onSubmit(data: ContactFormInput) {
    // Check Turnstile token
    if (!turnstileToken) {
      toastService.error(isEnglish ? 'Verification failed' : 'Weryfikacja nie powiodła się', isEnglish ? 'Try again' : 'Spróbuj jeszcze raz');
      return;
    }

    setSubmitStatus('loading');
    const loadingToastId = toastService.loading(isEnglish ? 'Sending message...' : 'Wysyłanie wiadomości...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          turnstileToken,
          isEnglish,
        }),
      });

      const result = await response.json();

      toastService.dismiss(loadingToastId);

      if (!response.ok) {
        setSubmitStatus('error');
        toastService.error(
          isEnglish ? 'Sending error' : 'Błąd wysyłania',
          result.error || (isEnglish ? 'Failed to send message. Try again.' : 'Nie udało się wysłać wiadomości. Spróbuj ponownie.')
        );
        return;
      }

      setSubmitStatus('success');
      toastService.success(
        isEnglish ? 'Message sent!' : 'Wiadomość wysłana!',
        isEnglish ? 'We will reply within 24 hours.' : 'Odpowiemy w ciągu 24 godzin.'
      );
      reset();
      setTurnstileToken('');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      toastService.dismiss(loadingToastId);
      toastService.error(
        isEnglish ? 'Connection error' : 'Błąd połączenia',
        isEnglish ? 'Check your network and try again.' : 'Sprawdź swoją sieć i spróbuj ponownie.'
      );
      console.error('Form submission error:', error);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white/60 dark:bg-[#130F24]/40 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-xl border border-black/5 dark:border-white/10 transition-colors duration-500"
      >
        {/* Nagłówek znajduje się teraz na poziomie strony (page.tsx) */}

        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase px-1 mb-2 transition-colors"
          >
            {isEnglish ? 'Full Name' : 'Imię i Nazwisko'}
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder={isEnglish ? 'John Doe' : 'Jan Kowalski'}
            disabled={isSubmitting || submitStatus === 'loading'}
            className="w-full px-5 py-4 bg-white/50 dark:bg-white/[0.03] border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-white/[0.08] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {errors.name && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1 px-2">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase px-1 mb-2 transition-colors"
          >
            {isEnglish ? 'Email Address' : 'Adres E-mail'}
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder={isEnglish ? 'john@example.com' : 'jan@example.com'}
            disabled={isSubmitting || submitStatus === 'loading'}
            className="w-full px-5 py-4 bg-white/50 dark:bg-white/[0.03] border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-white/[0.08] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {errors.email && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1 px-2">{errors.email.message}</p>
          )}
        </div>

        {/* Subject Dropdown Field */}
        <div>
          <label
            htmlFor="subject"
            className="block text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase px-1 mb-2 transition-colors"
          >
            {isEnglish ? 'Subject' : 'Temat Wiadomości'}
          </label>
          <div className="relative">
            <select
              {...register('subject')}
              id="subject"
              disabled={isSubmitting || submitStatus === 'loading'}
              className="w-full px-5 py-4 appearance-none bg-white/50 dark:bg-white/[0.03] border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:bg-white dark:focus:bg-white/[0.08] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" disabled className="text-slate-400">{isEnglish ? 'Select the main reason for contact...' : 'Wybierz główny powód kontaktu...'}</option>
              <option value={isEnglish ? 'Email with the report didn\'t arrive' : 'Mail z raportem nie doszedł'}>{isEnglish ? 'Email with the report didn\'t arrive' : 'Mail z raportem nie doszedł'}</option>
              <option value={isEnglish ? 'Wrong date of birth in the order' : 'Zła data urodzenia w zamówieniu'}>{isEnglish ? 'Wrong date of birth in the order' : 'Zła data urodzenia w zamówieniu'}</option>
              <option value={isEnglish ? 'Swapped dates in the partnership portrait' : 'Zamienione daty w portrecie partnerskim'}>{isEnglish ? 'Swapped dates in the partnership portrait' : 'Zamienione daty w portrecie partnerskim'}</option>
              <option value={isEnglish ? 'Problem with PDF file (e.g., won\'t open)' : 'Problem z plikiem PDF (np. nie otwiera się)'}>{isEnglish ? 'Problem with PDF file (e.g., won\'t open)' : 'Problem z plikiem PDF (np. nie otwiera się)'}</option>
              <option value={isEnglish ? 'Payment problem' : 'Problem z płatnością'}>{isEnglish ? 'Payment problem' : 'Problem z płatnością'}</option>
              <option value={isEnglish ? 'Other / General inquiry' : 'Inne / Zapytanie ogólne'}>{isEnglish ? 'Other / General inquiry' : 'Inne / Zapytanie ogólne'}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          {errors.subject && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1 px-2">{errors.subject.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase px-1 mb-2 transition-colors"
          >
            {isEnglish ? 'Message' : 'Wiadomość'}
          </label>
          <textarea
            {...register('message')}
            id="message"
            placeholder={isEnglish ? 'Describe your issue...' : 'Opisz swoją sprawę...'}
            rows={5}
            disabled={isSubmitting || submitStatus === 'loading'}
            className="w-full px-5 py-4 bg-white/50 dark:bg-white/[0.03] border border-black/10 dark:border-white/20 hover:border-black/20 dark:hover:border-white/30 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-white/[0.08] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
          {errors.message && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1 px-2">{errors.message.message}</p>
          )}
        </div>

        {/* Cloudflare Turnstile */}
        <div className="flex justify-center">
          <TurnstileToken
            onToken={setTurnstileToken}
            onError={() => {
              toastService.error(isEnglish ? 'Verification failed' : 'Weryfikacja nie powiodła się');
              setTurnstileToken('');
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || submitStatus === 'loading' || !turnstileToken}
          className="w-full relative overflow-hidden bg-[#2A241F] dark:bg-[#E8E4D9] text-[#F9F6EE] dark:text-[#0A0710] font-semibold tracking-wide py-4 px-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed group shadow-lg dark:shadow-[0_0_40px_rgba(232,228,217,0.1)] hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50 flex items-center justify-center gap-2"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent group-hover:animate-shimmer" aria-hidden="true"></div>
          <span className="relative flex items-center gap-2">
            {submitStatus === 'loading' ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {isEnglish ? 'Sending...' : 'Wysyłanie...'}
            </>
          ) : (
            isEnglish ? 'Send Message' : 'Wyślij Wiadomość'
          )}
          </span>
        </button>

        {/* Privacy Notice */}
        <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
          {isEnglish 
            ? 'Your data will be processed according to our privacy policy. Protected by Cloudflare Turnstile.' 
            : 'Twoje dane będą przetwarzane zgodnie z naszą polityką prywatności. Chronione przez Cloudflare Turnstile.'}
        </p>
      </form>
    </div>
  );
}
