import {
  ChevronDown,
  ChevronUpIcon,
  CircleAlertIcon,
  EqualIcon,
} from "lucide-react";

export const PriorityIcon = ({ priority }: { priority: number }) => {
  return priority === 0 ? (
    <span className="text-gray-400">
      <CircleAlertIcon className="size-4" />
    </span>
  ) : priority === 1 ? (
    <span className="text-gray-400">
      <ChevronUpIcon className="size-4" />
    </span>
  ) : priority === 2 ? (
    <span className="text-gray-400">
      <EqualIcon className="size-4" />
    </span>
  ) : (
    <span className="text-gray-400">
      <ChevronDown className="size-4" />
    </span>
  );
};
