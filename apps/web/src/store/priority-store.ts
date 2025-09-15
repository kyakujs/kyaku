import { HighPriorityIcon } from "~/components/ui/priorities/high-priority-icon";
import { LowPriorityIcon } from "~/components/ui/priorities/low-priority-icon";
import { MediumPriorityIcon } from "~/components/ui/priorities/medium-priority-icon";
import { NoPriorityIcon } from "~/components/ui/priorities/no-priority-icon";
import { UrgentPriorityIcon } from "~/components/ui/priorities/urgent-priority-icon";

export interface Priority {
  code: string;
  color: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  id: number | undefined;
  name: string;
  value: string;
}

export const priorities: Priority[] = [
  {
    code: "0",
    color: "text-gray-500",
    icon: NoPriorityIcon,
    id: undefined,
    name: "no-priority",
    value: "No priority",
  },
  {
    code: "1",
    color: "text-orange-500",
    icon: UrgentPriorityIcon,
    id: 0,
    name: "urgent",
    value: "Urgent",
  },
  {
    code: "2",
    color: "text-gray-500",
    icon: HighPriorityIcon,
    id: 1,
    name: "high",
    value: "High",
  },
  {
    code: "3",
    color: "text-gray-500",
    icon: MediumPriorityIcon,
    id: 2,
    name: "medium",
    value: "Medium",
  },
  {
    code: "4",
    color: "text-gray-500",
    icon: LowPriorityIcon,
    id: 3,
    name: "low",
    value: "Low",
  },
];
