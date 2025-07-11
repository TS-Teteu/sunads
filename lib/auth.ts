"use client"

// Esta é uma implementação de autenticação SIMPLIFICADA para fins de demonstração.
// NÃO USE ISSO EM PRODUÇÃO.
// Em um ambiente real, você usaria um serviço de autenticação seguro (ex: NextAuth.js, Supabase Auth, Auth0).

const USER_TOKEN_KEY = "user_auth_token"

export const login = (email: string, password: string): boolean => {
  // Simula a validação de credenciais
  if (email === "test@example.com" && password === "password123") {
    localStorage.setItem(USER_TOKEN_KEY, "mock-auth-token-123")
    return true
  }
  return false
}

export const logout = (): void => {
  localStorage.removeItem(USER_TOKEN_KEY)
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(USER_TOKEN_KEY)
}
