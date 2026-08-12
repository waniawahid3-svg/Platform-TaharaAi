// lib/validation.ts
import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  organisation: z.string().trim().min(1, "Please enter your organisation").max(160),
  workEmail: z.string().trim().toLowerCase().email("Enter a valid work email").max(255),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .regex(/[0-9]/, "Password must include a number")
    .regex(/[^A-Za-z0-9]/, "Password must include a symbol"),
  termsAccepted: z.literal(true, {
    message: "You must agree to the terms",
  }),
});

export const loginSchema = z.object({
  workEmail: z.string().trim().toLowerCase().email("Enter a valid email").max(255),
  password: z.string().min(1, "Enter your password"),
});


// Add these at the bottom of lib/validation.ts (after the existing code)

export const verifyEmailSchema = z.object({
  workEmail: z.string().email(),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const forgotPasswordSchema = z.object({
  workEmail: z.string().email(),
});

export const resetPasswordSchema = z.object({
  workEmail: z.string().email(),
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .regex(/[0-9]/, "Password must include a number")
    .regex(/[^A-Za-z0-9]/, "Password must include a symbol"),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;