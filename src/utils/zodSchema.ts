import { z } from 'zod';

// Define the user schema
export const userSchema = z.object({
  first_name: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long'),
  last_name: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long'),
  amount: z.string().min(1, 'amount is required').max(5, 'amount is too long'),
  phone: z
    .string()
    .regex(
      /^\+\d{1,3}\d{7,14}$/,
      'Phone number must follow the E.164 format (+CountryCode + NationalNumber)'
    ),
  email: z.string().email('Invalid email format'), // Zod already includes an email format check
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password is too long'), // Add additional password constraints if needed
});
