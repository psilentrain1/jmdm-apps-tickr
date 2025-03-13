import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-gray-900 p-2 text-center text-sm">
      &copy;2025 James Drake Tech. All rights reserved.{" "}
      <Link
        className="underline transition-colors duration-300 ease-in-out hover:text-blue-500"
        to="https://github.com/psilentrain1/jmdm-apps-tickr/issues/new"
      >
        Report Issues
      </Link>
    </footer>
  );
}
