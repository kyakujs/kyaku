import { CircleCheckIcon, CircleIcon, CirclePauseIcon } from "lucide-react";

export const statuses = [
  {
    id: "todo",
    color: "text-blue-500",
    icon: CircleIcon,
    name: "Todo",
    value: 0,
  },
  {
    id: "snoozed",
    color: "text-purple-500",
    icon: CirclePauseIcon,
    name: "Snoozed",
    value: 1,
  },
  {
    id: "done",
    color: "text-green-500",
    icon: CircleCheckIcon,
    name: "Done",
    value: 2,
  },
];
