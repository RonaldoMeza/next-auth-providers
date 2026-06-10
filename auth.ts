import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { getUserByEmail, checkRateLimit, recordFailedAttempt, resetRateLimit } from "@/lib/users"

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/signIn",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined
        const password = credentials?.password as string | undefined

        if (!email || !password) return null

        const { allowed, remainingMinutes } = checkRateLimit(email)
        if (!allowed) {
          throw new Error(`Demasiados intentos. Intenta de nuevo en ${remainingMinutes} minutos.`)
        }

        const user = getUserByEmail(email)
        if (!user) {
          recordFailedAttempt(email)
          return null
        }

        const isValid = bcrypt.compareSync(password, user.passwordHash)
        if (!isValid) {
          recordFailedAttempt(email)
          return null
        }

        resetRateLimit(email)
        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      const protectedPaths = ["/dashboard", "/profile"]
      if (protectedPaths.some((p) => pathname.startsWith(p))) {
        return !!auth?.user
      }
      return true
    },
  },
})
