import { useEffect } from "react";
import { useModel } from "@/hooks/useModel";
import { debounce } from "@/utils/conversions";
import { Menu } from "./Menu";

export interface Live2DProps {
  debug: Boolean
}
export const Live2D = (props: Live2DProps) => {
  const { init, handleResize, model, app } = useModel();
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!model || !app) {
      return;
    }
    const debouncedHandleResize = debounce(handleResize, 100);
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [model, app]);
  return (
    <>
    <div className="flex flex-row">
      {props.debug && model && <Menu model={model}/>}
      <canvas id="canvas" />
      </div>
    </>
  );
};

export default Live2D