import type { IronSessionOptions } from "iron-session"

export interface SessionData {
  isLoggedIn: boolean
  email?: string
}

export const sessionOptions: IronSessionOptions = {
  password: process.env.NEXTAUTH_SECRET || "complex_password_at_least_32_characters_long",
  cookieName: "crm-sunads-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}
