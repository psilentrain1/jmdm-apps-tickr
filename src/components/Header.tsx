import { MdMenuOpen } from "react-icons/md";

export function Header() {
  return (
    <header className="flex h-11 flex-row border-1 border-pink-500 px-4">
      <div className="flex flex-row">
        <div className="border-1 border-orange-500">
          <MdMenuOpen />
        </div>
        <div className="border-1 border-green-500">Tickr</div>
      </div>
      <div className="flex flex-grow flex-row justify-center border-1 border-purple-500">
        Search goes here
      </div>
    </header>
  );
}
