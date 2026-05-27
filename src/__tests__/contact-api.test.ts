/**
 * Test Contact Form API Route
 *
 * Run tests:
 * npx vitest run src/__tests__/contact-api.test.ts
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ContactFormSchema } from '@/schemas/contact';

describe('Contact Form Validation', () => {
  describe('Valid Inputs', () => {
    it('accepts valid contact data', () => {
      const validData = {
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        phone: '+48 123 456 789',
        message: 'To jest test wiadomości kontaktowej',
        sourceUrl: 'https://example.com/landing',
      };

      const result = ContactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('accepts data without optional fields', () => {
      const validData = {
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        message: 'To jest test wiadomości kontaktowej',
      };

      const result = ContactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('Invalid Inputs', () => {
    it('rejects empty name', () => {
      const invalidData = {
        name: '',
        email: 'jan@example.com',
        message: 'Message',
      };

      const result = ContactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects invalid email', () => {
      const invalidData = {
        name: 'Jan Kowalski',
        email: 'not-an-email',
        message: 'Message',
      };

      const result = ContactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects short message', () => {
      const invalidData = {
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        message: 'short',
      };

      const result = ContactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('rejects invalid phone format', () => {
      const invalidData = {
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        phone: 'not-a-phone',
        message: 'This is a message',
      };

      const result = ContactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Field Constraints', () => {
    it('enforces max length on name', () => {
      const longName = 'a'.repeat(101);
      const invalidData = {
        name: longName,
        email: 'jan@example.com',
        message: 'Message',
      };

      const result = ContactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('enforces max length on message', () => {
      const longMessage = 'a'.repeat(5001);
      const invalidData = {
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        message: longMessage,
      };

      const result = ContactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
