import dynamic from "next/dynamic";
import { UserInput } from "@/components/elements/UserInput";
import { Live2DProps } from "@/components/elements/Live2D";
import {Header} from "@/components/elements/Header";
const Live2D = dynamic<Live2DProps>(
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
      <main className="flex flex-col h-screen w-screen relative">
        <Header/>
        <Live2D debug={true} />
        {/* <Live2DBubble /> */}
        {/* <UserInput /> */}
      </main>
    </>
  );
};

export default HomePageView