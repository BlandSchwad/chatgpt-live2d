import dynamic from "next/dynamic";
import { UserInput } from "@/components/elements/UserInput";
import { LoginForm } from "@/components/LoginForm";
import { useSession } from "next-auth/react";
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
// const {data: session} = useSession()

export const LoginPageView = () => {
  return (
    <>
      <main className="h-screen p-4 relative">
        <LoginForm type={'login'}/>
        {/* LOGIN FORM COMPONENT GOES HERE */}
        {/* <Live2D />
        <Live2DBubble />
        <UserInput /> */}
      </main>
    </>
  );
};
