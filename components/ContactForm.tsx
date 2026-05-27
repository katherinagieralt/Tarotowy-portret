"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Imię musi mieć co najmniej 2 znaki"),
  email: z.string().email("Podaj poprawny email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Wiadomość musi mieć co najmniej 10 znaków"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      // Tutaj można dodać API endpoint do wysyłania formularza
      // Na razie tylko wyświetlamy komunikat
      toast.success(
        "Dzięki! Twoja wiadomość została wysłana. Odpowiemy w ciągu 24 godzin."
      );
      form.reset();
    } catch (error) {
      toast.error("Coś poszło nie tak. Spróbuj ponownie.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 bg-slate-900 rounded-lg p-8 border border-slate-700"
    >
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Imię i Nazwisko
        </label>
        <input
          type="text"
          {...form.register("name")}
          placeholder="Jan Kowalski"
          className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
        {form.formState.errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Email
        </label>
        <input
          type="email"
          {...form.register("email")}
          placeholder="twoj@email.com"
          className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Telefon (opcjonalnie)
        </label>
        <input
          type="tel"
          {...form.register("phone")}
          placeholder="+48 XXX XXX XXX"
          className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">
          Wiadomość
        </label>
        <textarea
          {...form.register("message")}
          placeholder="Opisz swoją sytuację..."
          rows={5}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />
        {form.formState.errors.message && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-900 font-bold py-3 px-4 rounded transition"
      >
        {submitting ? "Wysyłanie..." : "Wyślij Wiadomość"}
      </button>
    </form>
  );
}
