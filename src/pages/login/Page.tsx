import { LoginPageView } from "./View";
import type { NextPage } from "next";
// import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const LoginPage: NextPage = () => {
  const session = useSession()
  // const router = useRouter()
  // if(session){ 
  //   router.push('/home')
  // }
  return (
    <>
      <LoginPageView />
    </>
  );
};

export default LoginPage