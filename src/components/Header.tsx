import { MdMenuOpen } from "react-icons/md";
import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <header className="flex h-11 flex-row bg-gray-900 px-4">
      <div className="flex flex-row">
        <div className="flex flex-row items-center justify-center text-3xl">
          <MdMenuOpen />
        </div>
        <div className="flex flex-row items-center justify-center px-4 text-3xl font-bold">
          Tickr
        </div>
      </div>
      <div className="flex flex-grow flex-row justify-center">
        <div className="border-1 border-purple-500">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
