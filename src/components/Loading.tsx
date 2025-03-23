import { BarLoader } from "react-spinners";

export function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <BarLoader color="rgba(243, 244, 246, 1)" />
    </div>
  );
}
