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

export interface SubStatus {
  code: string;
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  id: number;
  name: string;
  value: string;
}

export const subStatuses: SubStatus[] = [
  {
    code: "0",
    color: "var(--color-todo)",
    icon: SparkleIcon,
    id: 0,
    name: "needs-first-response",
    value: "Needs first response",
  },
  {
    code: "1",
    color: "var(--color-todo)",
    icon: FocusIcon,
    id: 1,
    name: "investigating",
    value: "Investigating",
  },
  {
    code: "2",
    color: "var(--color-todo)",
    icon: ReplyIcon,
    id: 2,
    name: "needs-next-response",
    value: "Needs next response",
  },
  {
    code: "3",
    color: "var(--color-todo)",
    icon: RotateCcwIcon,
    id: 3,
    name: "close-the-loop",
    value: "Close the loop",
  },
  {
    code: "4",
    color: "var(--color-snoozed)",
    icon: ClockFadingIcon,
    id: 4,
    name: "waiting-for-customer",
    value: "Waiting for customer",
  },
  {
    code: "5",
    color: "var(--color-snoozed)",
    icon: CirclePauseIcon,
    id: 5,
    name: "paused-for-later",
    value: "Paused for later",
  },
  {
    code: "6",
    color: "var(--color-done)",
    icon: SquareSlashIcon,
    id: 6,
    name: "ignored",
    value: "Ignored",
  },
  {
    code: "7",
    color: "var(--color-done)",
    icon: CircleCheckIcon,
    id: 7,
    name: "done-manually-set",
    value: "Done manually set",
  },
  {
    code: "8",
    color: "var(--color-done)",
    icon: CircleCheckIcon,
    id: 8,
    name: "done-automatically-set",
    value: "Done automatically set",
  },
];
