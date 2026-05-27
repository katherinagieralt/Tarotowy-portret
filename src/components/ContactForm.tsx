'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema, type ContactFormInput } from '@/schemas/contact';
import { toastService } from '@/lib/toast';
import { TurnstileToken } from './TurnstileToken';

export function ContactForm() {
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
    resolver: zodResolver(ContactFormSchema),
    mode: 'onBlur',
  });

  async function onSubmit(data: ContactFormInput) {
    // Check Turnstile token
    if (!turnstileToken) {
      toastService.error('Weryfikacja nie powiodła się', 'Spróbuj jeszcze raz');
      return;
    }

    setSubmitStatus('loading');
    const loadingToastId = toastService.loading('Wysyłanie wiadomości...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          turnstileToken,
        }),
      });

      const result = await response.json();

      toastService.dismiss(loadingToastId);

      if (!response.ok) {
        setSubmitStatus('error');
        toastService.error(
          'Błąd wysyłania',
          result.error || 'Nie udało się wysłać wiadomości. Spróbuj ponownie.'
        );
        return;
      }

      setSubmitStatus('success');
      toastService.success(
        'Wiadomość wysłana!',
        'Odpowiemy w ciągu 24 godzin.'
      );
      reset();
      setTurnstileToken('');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      toastService.dismiss(loadingToastId);
      toastService.error(
        'Błąd połączenia',
        'Sprawdź swoją sieć i spróbuj ponownie.'
      );
      console.error('Form submission error:', error);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-slate-900 dark:bg-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-800 dark:border-slate-800"
      >
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold text-white dark:text-white mb-2">
            Skontaktuj się z nami
          </h2>
          <p className="text-slate-400 dark:text-slate-400">
            Wypełnij formularz poniżej, a my odpowiemy w ciągu 24 godzin.
          </p>
        </div>

        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-slate-200 dark:text-slate-200 mb-2"
          >
            Imię i Nazwisko
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder="Jan Kowalski"
            disabled={isSubmitting || submitStatus === 'loading'}
            className="w-full px-4 py-3 bg-slate-800 dark:bg-slate-800 border border-slate-700 dark:border-slate-700 rounded-lg text-white dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {errors.name && (
            <p className="text-red-400 dark:text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-200 dark:text-slate-200 mb-2"
          >
            Adres E-mail
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="jan@example.com"
            disabled={isSubmitting || submitStatus === 'loading'}
            className="w-full px-4 py-3 bg-slate-800 dark:bg-slate-800 border border-slate-700 dark:border-slate-700 rounded-lg text-white dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {errors.email && (
            <p className="text-red-400 dark:text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-slate-200 dark:text-slate-200 mb-2"
          >
            Numer Telefonu (opcjonalnie)
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            placeholder="+48 123 456 789"
            disabled={isSubmitting || submitStatus === 'loading'}
            className="w-full px-4 py-3 bg-slate-800 dark:bg-slate-800 border border-slate-700 dark:border-slate-700 rounded-lg text-white dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {errors.phone && (
            <p className="text-red-400 dark:text-red-400 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-slate-200 dark:text-slate-200 mb-2"
          >
            Wiadomość
          </label>
          <textarea
            {...register('message')}
            id="message"
            placeholder="Opisz swoją sprawę..."
            rows={5}
            disabled={isSubmitting || submitStatus === 'loading'}
            className="w-full px-4 py-3 bg-slate-800 dark:bg-slate-800 border border-slate-700 dark:border-slate-700 rounded-lg text-white dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
          {errors.message && (
            <p className="text-red-400 dark:text-red-400 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Cloudflare Turnstile */}
        <div className="flex justify-center">
          <TurnstileToken
            onToken={setTurnstileToken}
            onError={() => {
              toastService.error('Weryfikacja nie powiodła się');
              setTurnstileToken('');
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || submitStatus === 'loading' || !turnstileToken}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-600 dark:to-blue-700 text-white dark:text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 dark:focus:ring-offset-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
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
              Wysyłanie...
            </>
          ) : (
            'Wyślij Wiadomość'
          )}
        </button>

        {/* Privacy Notice */}
        <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
          Twoje dane będą przetwarzane zgodnie z naszą polityką prywatności. Chronione przez Cloudflare Turnstile.
        </p>
      </form>
    </div>
  );
}
