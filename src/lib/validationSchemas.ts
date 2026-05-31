import { z } from "zod";

export const CalculateRequestSchema = z.object({
  reportType: z.enum(["INDIVIDUAL", "PARTNERSHIP"]),
  name1: z.string().optional(),
  date1: z.string().or(z.date()).pipe(z.coerce.date()),
  name2: z.string().optional(),
  date2: z.string().or(z.date()).pipe(z.coerce.date()).optional(),
  locale: z.string().optional(),
});

export const CheckoutRequestSchema = z.object({
  email: z.string().email().optional(),
  reportType: z.enum(["INDIVIDUAL", "PARTNERSHIP"]),
  name1: z.string().optional(),
  date1: z.string().or(z.date()).pipe(z.coerce.date()),
  name2: z.string().optional(),
  date2: z.string().or(z.date()).pipe(z.coerce.date()).optional(),
  locale: z.string().optional(),
  currency: z.string().optional(),
});

export type CalculateRequest = z.infer<typeof CalculateRequestSchema>;
export type CheckoutRequest = z.infer<typeof CheckoutRequestSchema>;
