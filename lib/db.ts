// lib/db.ts
// Creates ONE shared MySQL connection pool for the whole app.
// A "pool" keeps a small set of open connections and hands them out as needed,
// instead of opening a brand-new connection on every request (which is slow
// and will crash under load). Every API route imports `pool` from here.

import mysql from "mysql2/promise";

// In development, Next.js reloads your code constantly. Without this guard,
// each reload would open a NEW pool and you'd leak connections until MySQL
// refuses more. We stash the pool on `globalThis` so it survives reloads.
const globalForDb = globalThis as unknown as {
  pool: mysql.Pool | undefined;
};

export const pool =
  globalForDb.pool ??
  mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // Aiven requires an encrypted (SSL) connection.
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;
