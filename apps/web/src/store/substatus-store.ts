import {
  CircleCheckIcon,
  CirclePauseIcon,
  ClockFadingIcon,
  FocusIcon,
  ReplyIcon,
  RotateCcwIcon,
  SparkleIcon,
  SquareSlashIcon,
} from "lucide-react";

export const subStatuses = [
  {
    id: "needs-first-response",
    color: "text-blue-500",
    icon: SparkleIcon,
    name: "Needs first response",
    value: 0,
  },
  {
    id: "investigating",
    color: "text-blue-500",
    icon: FocusIcon,
    name: "Investigating",
    value: 1,
  },
  {
    id: "needs-next-response",
    color: "text-blue-500",
    icon: ReplyIcon,
    name: "Needs next response",
    value: 2,
  },
  {
    id: "close-the-loop",
    color: "text-blue-500",
    icon: RotateCcwIcon,
    name: "Close the loop",
    value: 3,
  },
  {
    id: "waiting-for-customer",
    color: "text-purple-500",
    icon: ClockFadingIcon,
    name: "Waiting for customer",
    value: 4,
  },
  {
    id: "paused-for-later",
    color: "text-purple-500",
    icon: CirclePauseIcon,
    name: "Paused for later",
    value: 5,
  },
  {
    id: "ignored",
    color: "text-green-500",
    icon: SquareSlashIcon,
    name: "Ignored",
    value: 6,
  },
  {
    id: "done-manually-set",
    color: "text-green-500",
    icon: CircleCheckIcon,
    name: "Done manually set",
    value: 7,
  },
  {
    id: "done-automatically-set",
    color: "text-green-500",
    icon: CircleCheckIcon,
    name: "Done automatically set",
    value: 8,
  },
];
