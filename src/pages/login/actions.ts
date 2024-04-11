'use server'

import { signIn } from "next-auth/react"
import { User } from '@/@types/'
import  AuthError  from 'next-auth'
import { z } from 'zod'
import { kv } from '@vercel/kv'
import { ResultCode } from "@/utils/ResultCode"

export async function getUser(email: string) {
    // console.log('getUser', process.env)
    // const user = await kv.hgetall<User>(`user:${email}`)
    // console.log('getuser db hit?', user)
    const blandy  = {
      id: "1",
      email: "blandschwad@gmail.com",
      password: "factories",
      salt: "salty"
    
    }
    console.log(blandy)
    return blandy
}

interface Result {
  type: string
  resultCode: ResultCode
}
//Type out the form later
export async function authenticate(
    formData
): Promise<Result | undefined > {
    try {
        const email = formData.email
        const password = formData.password

        const parsedCredentials = z
      .object({
        email: z.string().email(),
        password: z.string().min(6)
      })
      .safeParse({
        email,
        password
      })

      if(parsedCredentials.success) {
        await signIn('credentials', {
            email,
            password,
            redirect: false
          })

          return {
            type: 'success',
            resultCode: ResultCode.UserLoggedIn
          }
    

      } else {
        return {
          type: 'error',
          resultCode: ResultCode.InvalidCredentials
        }
      }


        
    } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case 'CredentialsSignin':
              return {
                type: 'error',
                resultCode: ResultCode.InvalidCredentials
              }
            default:
              return {
                type: 'error',
                resultCode: ResultCode.UnknownError
              }
          }
        }
      }
}