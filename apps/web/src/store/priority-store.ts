import { HighPriorityIcon } from "~/components/ui/priorities/high-priority-icon";
import { LowPriorityIcon } from "~/components/ui/priorities/low-priority-icon";
import { MediumPriorityIcon } from "~/components/ui/priorities/medium-priority-icon";
import { NoPriorityIcon } from "~/components/ui/priorities/no-priority-icon";
import { UrgentPriorityIcon } from "~/components/ui/priorities/urgent-priority-icon";

export interface Priority {
  id: string;
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  shortcut: string;
  value: number | undefined;
}

export const priorities: Priority[] = [
  {
    id: "no-priority",
    color: "text-gray-500",
    icon: NoPriorityIcon,
    name: "No priority",
    shortcut: "0",
    value: undefined,
  },
  {
    id: "urgent",
    color: "text-orange-500",
    icon: UrgentPriorityIcon,
    name: "Urgent",
    shortcut: "1",
    value: 0,
  },
  {
    id: "high",
    color: "text-gray-500",
    icon: HighPriorityIcon,
    name: "High",
    shortcut: "2",
    value: 1,
  },
  {
    id: "medium",
    color: "text-gray-500",
    icon: MediumPriorityIcon,
    name: "Medium",
    shortcut: "3",
    value: 2,
  },
  {
    id: "low",
    color: "text-gray-500",
    icon: LowPriorityIcon,
    name: "Low",
    shortcut: "4",
    value: 3,
  },
];
