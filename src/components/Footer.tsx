import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="border-1 border-red-500 p-2 text-center text-sm">
      &copy;2025 James Drake Tech. All rights reserved.{" "}
      <Link
        className="underline"
        to="https://github.com/psilentrain1/jmdm-apps-tickr/issues/new"
      >
        Report Issues
      </Link>
    </footer>
  );
}
