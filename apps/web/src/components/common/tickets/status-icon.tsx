import { CircleCheckIcon, CircleIcon, CirclePauseIcon } from "lucide-react";

export const StatusIcon = ({ status }: { status: number }) => {
  return status === 0 ? (
    <span className="text-blue-500">
      <CircleIcon className="size-4" />
    </span>
  ) : status === 1 ? (
    <span className="text-purple-500">
      <CirclePauseIcon className="size-4" />
    </span>
  ) : (
    <span className="text-green-500">
      <CircleCheckIcon className="size-4" />
    </span>
  );
};
