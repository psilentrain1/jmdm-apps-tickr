import { MdDashboard, MdListAlt, MdSettings } from "react-icons/md";
import { NavLink } from "react-router";

export function Sidebar() {
  return (
    <div className="fixed h-full w-48 bg-gray-900 pt-11 pb-9">
      <Navigation />
    </div>
  );
}

function Navigation() {
  const liClass =
    "flex flex-row item-center box-border border-l-4 border-transparent px-4 py-3 font-medium text-gray-300 transition-colors duration-200 hover:bg-gray-700 hover:text-blue-300 active:text-blue-500";
  const liActiveClass =
    "flex flex-row item-center box-border border-l-4 border-blue-500 px-4 py-3 font-medium text-gray-300 transition-colors duration-200 hover:bg-gray-700 hover:text-blue-300 active:text-blue-500";
  const iconClass = "flex flex-row item-center justify-center pr-2 text-2xl";
  return (
    <nav className="flex h-full flex-col justify-between">
      <ul className="">
        <NavLink to="/">
          {({ isActive }) => (
            <li className={isActive ? liActiveClass : liClass}>
              <span className={iconClass}>
                <MdDashboard />
              </span>
              Dashboard
            </li>
          )}
        </NavLink>
        <NavLink to="/watchlist">
          {({ isActive }) => (
            <li className={isActive ? liActiveClass : liClass}>
              <span className={iconClass}>
                <MdListAlt />
              </span>
              Watchlist
            </li>
          )}
        </NavLink>
      </ul>
      <ul>
        <NavLink to="/settings">
          {({ isActive }) => (
            <li className={isActive ? liActiveClass : liClass}>
              <span className={iconClass}>
                <MdSettings />
              </span>
              Settings
            </li>
          )}
        </NavLink>
      </ul>
    </nav>
  );
}
