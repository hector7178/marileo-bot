import conn from "./db.js";
import User from '../models/user'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: '...'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        await conn()

        const userFound = await User.findOne({
          username: credentials?.username
        })

        if (!userFound) {
          return null
        }
        const mach = credentials.password === userFound.password
        if (!mach) {
          return null
        }
        return userFound
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt ({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session ({ session, token }) {
      session.user = token.user

      return session
    }
  }

}
