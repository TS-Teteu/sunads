import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Esta é uma validação SIMULADA.
        // Em um ambiente de produção, você faria uma consulta ao seu banco de dados
        // para verificar as credenciais do usuário de forma segura.
        if (credentials?.email === "test@example.com" && credentials?.password === "password123") {
          // Retorne um objeto de usuário. O ID é obrigatório.
          return { id: "1", name: "Test User", email: "test@example.com" }
        }
        // Se as credenciais forem inválidas, retorne null
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redireciona para a sua página de login personalizada
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.email = token.email
      session.user.name = token.name
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})
