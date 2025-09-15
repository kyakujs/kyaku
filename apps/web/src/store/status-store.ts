import { CircleCheckIcon, CircleIcon, CirclePauseIcon } from "lucide-react";

export interface Status {
  code: string;
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  id: number | undefined;
  name: string;
  value: string;
}

export const statuses: Status[] = [
  {
    code: "0",
    color: "text-blue-500",
    icon: CircleIcon,
    id: 0,
    name: "todo",
    value: "Todo",
  },
  {
    code: "1",
    color: "text-purple-500",
    icon: CirclePauseIcon,
    id: 1,
    name: "snoozed",
    value: "Snoozed",
  },
  {
    code: "2",
    color: "text-green-500",
    icon: CircleCheckIcon,
    id: 2,
    name: "done",
    value: "Done",
  },
];
