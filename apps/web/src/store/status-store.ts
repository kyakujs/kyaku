import { CircleCheckIcon, CircleIcon, CirclePauseIcon } from "lucide-react";

export interface Status {
  code: string;
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  id: number;
  name: string;
  value: string;
}

export const statuses: Status[] = [
  {
    code: "0",
    color: "var(--color-todo)",
    icon: CircleIcon,
    id: 0,
    name: "todo",
    value: "Todo",
  },
  {
    code: "1",
    color: "var(--color-snoozed)",
    icon: CirclePauseIcon,
    id: 1,
    name: "snoozed",
    value: "Snoozed",
  },
  {
    code: "2",
    color: "var(--color-done)",
    icon: CircleCheckIcon,
    id: 2,
    name: "done",
    value: "Done",
  },
];
