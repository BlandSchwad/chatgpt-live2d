import dynamic from "next/dynamic";
import { UserInput } from "@/components/elements/UserInput";
import { LoginForm } from "@/components/LoginForm";

const Live2D = dynamic<{}>(
  () => import("@/components/elements/Live2D").then((module) => module.Live2D),
  { ssr: false }
);

const Live2DBubble = dynamic<{}>(
  () =>
    import("@/components/elements/Live2DBubble").then(
      (module) => module.Live2DBubble
    ),
  { ssr: false }
);

import {Button }from '@mantine/core'
import { signup } from "./actions";
import { getUser } from "../login/actions";
export const SignupPageView = () => {
  return (
    <>
      <main className="flex flex-col p-4">
        {/* <LoginForm type={'register'}/> */}
        <Button onClick={async () =>{ signup({name: "Andrew", email:"blandschwad@gmail.com", password: "testerino", terms: true})}}> Go </Button>
        <Button onClick={async () => {await getUser("blandschwad@gmail.com")}}> Get user </Button>
        <Button onClick={() => {console.log(process.env.NEXTAUTH_URL)}}>addEventListener</Button>

 
        {/* <Live2D />
        <Live2DBubble />
        <UserInput /> */}
      </main>
    </>
  );
};
