import dynamic from "next/dynamic";
import { UserInput } from "@/components/elements/UserInput";
import { LoginForm } from "@/components/LoginForm";

// const Live2D = dynamic<{}>(
//   () => import("@/components/elements/Live2D").then((module) => module.Live2D),
//   { ssr: false }
// );



export const LoginPageView = () => {
  return (
    <>
      <main className="h-screen w-screen relative">
        <LoginForm type={'login'}/>
        {/* LOGIN FORM COMPONENT GOES HERE */}
        {/* <Live2D />
        <Live2DBubble />
        <UserInput /> */}
      </main>
    </>
  );
};

export default LoginPageView