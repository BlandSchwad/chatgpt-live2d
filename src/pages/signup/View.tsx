import dynamic from "next/dynamic";
import { UserInput } from "@/components/elements/UserInput";
import { LoginForm } from "@/components/LoginForm";

// const Live2D = dynamic<{}>(
//   () => import("@/components/elements/Live2D").then((module) => module.Live2D),
//   { ssr: false }
// );

// const Live2DBubble = dynamic<{}>(
//   () =>
//     import("@/components/elements/Live2DBubble").then(
//       (module) => module.Live2DBubble
//     ),
//   { ssr: false }
// );

export const SignupPageView = () => {
  return (
    <>
      <main className="flex flex-col p-4">
        <LoginForm type={'register'}/>
        {/* Signup FORM COMPONENT GOES HERE */}
        {/* <Live2D />
        <Live2DBubble />
        <UserInput /> */}
      </main>
    </>
  );
};

export default SignupPageView