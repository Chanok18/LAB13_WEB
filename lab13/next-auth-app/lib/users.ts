export type UserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  failedAttempts: number;
  lockedUntil: number | null;
};

declare global {
  var lab13Users: Map<string, UserRecord> | undefined;
}

export const users =
  globalThis.lab13Users ?? (globalThis.lab13Users = new Map<string, UserRecord>());
