'use server'

import { useSession, signIn, signOut } from "next-auth/react"
import { ResultCode } from "@/utils/ResultCode"
import { getStringFromBuffer } from "@/utils/getStringFromBuffer"
import { z } from 'zod'
import { kv } from '@vercel/kv'
import { getUser } from '../login/actions'
import  AuthError  from 'next-auth'



export async function createUser(
    email: string,
    hashedPassword: string,
    salt: string
) {
    console.log('create user', process.env)
    const existingUser = await getUser(email)
    // console.log(existingUser)

    if(existingUser) {
        return {
            type: 'error',
            resultCode: ResultCode.UserAlreadyExists
        }
    } else {
        const user = {
            id: crypto.randomUUID(),
            email,
            password: hashedPassword,
            salt
        }
        await kv.hmset(`user:${email}`, user)

        

        return {
            type: 'success',
            resultCode: ResultCode.UserCreated
        }
    }
}

interface Result {
    type: string
    resultCode: ResultCode
  }

  export async function signup( 
    formValues: {name: string, email: string, password: string, terms: boolean}
  ) : Promise<Result | undefined> {
    const email = formValues.email
    const password = formValues.password
    const parsedCredentials = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })
    .safeParse({
        email,
        password
    })

    if(parsedCredentials.success) {
        // console.log('sign up credential parsing complete break', form)
        // return
        const salt = crypto.randomUUID()

        const encoder = new TextEncoder()
        const saltedPassword = encoder.encode(password + salt)
        const hashedPasswordBuffer = await crypto.subtle.digest(
            'SHA-256',
            saltedPassword
        )
        const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)

        try {
            console.log('calling create user', email, password)
            const result = await createUser(email, hashedPassword, salt)
            if(result.resultCode ==  ResultCode.UserCreated) {
                await signIn('credentials', {
                    email,
                    password,
                    redirect: false
                })
            }
            console.log(result)
            return result
        } catch (error) {
            if(error instanceof AuthError) {
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
            } else {
                return {
                    type: 'error',
                    resultCode: ResultCode.UnknownError
                }
            }
        }
    } else {
        return {
            type: 'error',
            resultCode: ResultCode.InvalidCredentials
        }
    }
  }