import { LoginPageView } from "./View";
import type { NextPage } from "next";
import { Session } from '@/lib/types'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import { redirect } from 'next/navigation'


export const LoginPage: NextPage = () => {
  const {data: session} = useSession()
  const router = useRouter()
  if(session) {
    console.log(session)
    router.push('/home')
  }
    return (
      <>
        <LoginPageView />
      </>
    );

  
  
};
