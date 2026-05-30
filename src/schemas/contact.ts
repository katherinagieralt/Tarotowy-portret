import { z } from 'zod';

// Zod schema for Lead validation
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Imię musi mieć co najmniej 2 znaki')
    .max(100, 'Imię nie może przekraczać 100 znaków'),
  email: z
    .string()
    .email('Podaj prawidłowy adres e-mail')
    .max(255, 'E-mail nie może przekraczać 255 znaków'),

  message: z
    .string()
    .min(10, 'Wiadomość musi mieć co najmniej 10 znaków')
    .max(5000, 'Wiadomość nie może przekraczać 5000 znaków'),
  sourceUrl: z
    .string()
    .url('Podaj prawidłowy URL')
    .optional()
    .or(z.literal('')),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;
