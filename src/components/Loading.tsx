import { ClipLoader } from "react-spinners";

export function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <ClipLoader size={70} color="rgba(243, 244, 246, 1)" />
    </div>
  );
}
