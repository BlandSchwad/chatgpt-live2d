import dynamic from "next/dynamic";
import { UserInput } from "@/components/elements/UserInput";

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

export const HomePageView = () => {
  return (
    <>
      <main className="h-screen w-screen relative">
        <Live2D debug={'true'}/>
        {/* <Live2DBubble /> */}
        {/* <UserInput /> */}
      </main>
    </>
  );
};
