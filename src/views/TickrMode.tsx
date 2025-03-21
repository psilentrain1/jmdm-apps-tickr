import { useStore } from "../hooks/useStore";
import { MdOpenInFull } from "react-icons/md";

export function TickrMode() {
  const setTickrMode = useStore((state) => state.setTickrMode);
  function handleExitTickrMode() {
    setTickrMode(false);
  }
  return (
    <div className="flex h-full flex-row items-center bg-gray-900 px-4 text-gray-100">
      <div>
        <div className="flex flex-row items-center justify-center px-4 text-3xl font-bold">
          Tickr
        </div>
      </div>
      <div className="flex-grow">{/* Scrolling ticker here */}</div>
      <div>
        <div
          className="cursor-pointer text-2xl"
          onClick={() => handleExitTickrMode()}
        >
          <MdOpenInFull />
        </div>
      </div>
    </div>
  );
}
