import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

/* --- 1. Configurações do NextAuth --- */
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validação SIMULADA
        if (credentials?.email === "test@example.com" && credentials?.password === "password123") {
          return { id: "1", name: "Test User", email: "test@example.com" }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id
      session.user.email = token.email
      session.user.name = token.name
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} as const

/* --- 2. Inicializa o NextAuth --- */
const nextAuth = NextAuth(authOptions)

/*
 *  nextAuth retorna:
 *  {
 *    handlers: { GET, POST },
 *    auth,    // helper server-side
 *    signIn,  // helper client/server
 *    signOut, // helper client/server
 *  }
 */
export const { handlers, auth, signIn, signOut } = nextAuth
export const { GET, POST } = handlers
