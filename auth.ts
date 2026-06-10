import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/signIn",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
