// lib/otp.ts
// Generate and store OTP codes in the database.

import { pool } from './db';

export function generateOTP(): string {
  // 6-digit code, no leading zeros issue since we pad
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function storeOTP(
  userId: number,
  code: string,
  purpose: 'verify' | 'reset'
): Promise<void> {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  await pool.query(
    `UPDATE users 
     SET otp_code = ?, otp_expires_at = ?, otp_purpose = ? 
     WHERE id = ?`,
    [code, expiresAt, purpose, userId]
  );
}

export async function verifyOTP(
  userId: number,
  code: string,
  purpose: 'verify' | 'reset'
): Promise<boolean> {
  const [rows] = await pool.query<any[]>(
    `SELECT otp_code, otp_expires_at, otp_purpose 
     FROM users WHERE id = ? LIMIT 1`,
    [userId]
  );

  const user = rows[0];
  if (!user) return false;
  if (user.otp_purpose !== purpose) return false;
  if (user.otp_code !== code) return false;

  const now = new Date();
  const expires = new Date(user.otp_expires_at);
  if (now > expires) return false; // expired

  return true;
}

export async function clearOTP(userId: number): Promise<void> {
  await pool.query(
    `UPDATE users SET otp_code = NULL, otp_expires_at = NULL, otp_purpose = NULL WHERE id = ?`,
    [userId]
  );
}