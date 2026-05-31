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
  subject: z
    .string()
    .min(1, 'Proszę wybrać temat wiadomości'),

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

export const ContactFormSchemaEn = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name cannot exceed 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email cannot exceed 255 characters'),
  subject: z
    .string()
    .min(1, 'Please select a subject'),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(5000, 'Message cannot exceed 5000 characters'),
  sourceUrl: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;
