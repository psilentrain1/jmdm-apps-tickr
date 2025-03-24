import log from "electron-log/renderer";
import { useStore } from "../hooks/useStore";
import { MdCloseFullscreen, MdMenuOpen, MdMenu } from "react-icons/md";
import { SearchBar } from "./SearchBar";

const headerLog = log.scope("Header");

export function Header() {
  const sidebarOpen = useStore((state) => state.sidebarOpen);
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);
  const tickrMode = useStore((state) => state.tickrMode);
  const setTickrMode = useStore((state) => state.setTickrMode);

  /**
   * Handles the Tickr mode toggle.
   */
  async function handleTickrMode() {
    const mode = await window.ui.setTickrMode();
    if (!tickrMode) {
      setTickrMode(true);
      headerLog.verbose("handleTickrMode", { mode });
    }
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-10 flex h-11 flex-row bg-gray-900 px-4">
      <div className="flex flex-row">
        <div
          className="flex cursor-pointer flex-row items-center justify-center text-3xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <MdMenuOpen /> : <MdMenu />}
        </div>
        <div className="flex cursor-default flex-row items-center justify-center px-4 text-3xl font-bold">
          Tickr
        </div>
      </div>
      <div className="flex flex-grow flex-row justify-center">
        <div className="flex flex-row items-center justify-center">
          <SearchBar />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center text-2xl">
        <div className="cursor-pointer" onClick={() => handleTickrMode()}>
          <MdCloseFullscreen />
        </div>
      </div>
    </header>
  );
}
