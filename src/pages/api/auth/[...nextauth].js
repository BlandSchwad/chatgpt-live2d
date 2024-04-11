import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import {getUser} from '../../../pages/login/actions'

export const authOptions = {
    pages: {
        signIn: '/login',
        newUser: '/signup'
      },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        // credentials: {
        //   username: { label: "Username", type: "text", placeholder: "jsmith" },
        //   password: { label: "Password", type: "password" }
        // },
        async authorize({email, password}, req) {
            console.log(email, password)
            const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse({email, password})
          console.log(parsedCredentials)

          if (parsedCredentials.success) {
            console.log('Parsed Credential Success')
            const user = await getUser(email)
            if(!user) return null

            const encoder = new TextEncoder()
            const saltedPassword = encoder.encode(password + user.salt)
            const hashedPasswordBuffer = await crypto.subtle.digest(
                'SHA-256',
                saltedPassword
            )
            const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)

            if(hashedPassword === user.password ) {
                return user
            } else {
                return null
            }
          }
        //   const user = { id: "1", name: "blandschwad", email: "blandschwad@gmail.com" }
    
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
    
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        }
      })
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)