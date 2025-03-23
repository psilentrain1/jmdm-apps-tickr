import { useEffect } from "react";
import { useStore } from "../hooks/useStore";
import { MdDashboard, MdListAlt, MdSettings } from "react-icons/md";
import { NavLink } from "react-router";

export function Sidebar() {
  const sidebarOpen = useStore((state) => state.sidebarOpen);

  const openClass =
    "fixed h-full w-48 bg-gray-900 pt-11 pb-4 transition-all duration-300 ease-in-out";
  const closedClass =
    "fixed h-full w-16 bg-gray-900 pt-11 pb-4 transition-all duration-300 ease-in-out";

  return (
    <div className={sidebarOpen ? openClass : closedClass}>
      <Navigation />
    </div>
  );
}

function Navigation() {
  const sidebarOpen = useStore((state) => state.sidebarOpen);

  useEffect(() => {
    const navTitles = document.querySelectorAll(".nav-title");
    if (sidebarOpen) {
      navTitles.forEach((title) => {
        setTimeout(() => {
          title.classList.remove("hidden");
        }, 300);
      });
    } else if (!sidebarOpen) {
      navTitles.forEach((title) => {
        title.classList.add("hidden");
      });
    }
  }, [sidebarOpen]);

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
              <span className="nav-title">Dashboard</span>
            </li>
          )}
        </NavLink>
        <NavLink to="/watchlist">
          {({ isActive }) => (
            <li className={isActive ? liActiveClass : liClass}>
              <span className={iconClass}>
                <MdListAlt />
              </span>
              <span className="nav-title">Watchlist</span>
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
              <span className="nav-title">Settings</span>
            </li>
          )}
        </NavLink>
      </ul>
    </nav>
  );
}
