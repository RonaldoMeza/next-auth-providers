import bcrypt from "bcryptjs"

export interface StoredUser {
  id: string
  name: string
  email: string
  passwordHash: string
}

interface RateLimitEntry {
  failedAttempts: number
  lockedUntil: Date | null
}

const users = new Map<string, StoredUser>()
const rateLimitStore = new Map<string, RateLimitEntry>()

const MAX_ATTEMPTS = 3
const LOCK_DURATION_MS = 15 * 60 * 1000

export function createUser(name: string, email: string, password: string): StoredUser {
  const existing = users.get(email)
  if (existing) throw new Error("El correo ya está registrado")

  const passwordHash = bcrypt.hashSync(password, 10)
  const user: StoredUser = {
    id: `user_${Date.now()}`,
    name,
    email,
    passwordHash,
  }
  users.set(email, user)
  return user
}

export function getUserByEmail(email: string): StoredUser | undefined {
  return users.get(email)
}

export function checkRateLimit(email: string): { allowed: boolean; remainingMinutes?: number } {
  const entry = rateLimitStore.get(email)
  if (!entry) return { allowed: true }

  if (entry.lockedUntil && entry.lockedUntil > new Date()) {
    const remainingMs = entry.lockedUntil.getTime() - Date.now()
    return { allowed: false, remainingMinutes: Math.ceil(remainingMs / 60000) }
  }

  if (entry.lockedUntil && entry.lockedUntil <= new Date()) {
    rateLimitStore.delete(email)
    return { allowed: true }
  }

  return { allowed: true }
}

export function recordFailedAttempt(email: string): void {
  const entry = rateLimitStore.get(email) || { failedAttempts: 0, lockedUntil: null }
  entry.failedAttempts++
  if (entry.failedAttempts >= MAX_ATTEMPTS) {
    entry.lockedUntil = new Date(Date.now() + LOCK_DURATION_MS)
  }
  rateLimitStore.set(email, entry)
}

export function resetRateLimit(email: string): void {
  rateLimitStore.delete(email)
}
