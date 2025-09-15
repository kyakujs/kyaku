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
    color: "var(--color-low-priority)",
    icon: NoPriorityIcon,
    id: undefined,
    name: "no-priority",
    value: "No priority",
  },
  {
    code: "1",
    color: "var(--color-high-priority)",
    icon: UrgentPriorityIcon,
    id: 0,
    name: "urgent",
    value: "Urgent",
  },
  {
    code: "2",
    color: "var(--color-low-priority)",
    icon: HighPriorityIcon,
    id: 1,
    name: "high",
    value: "High",
  },
  {
    code: "3",
    color: "var(--color-low-priority)",
    icon: MediumPriorityIcon,
    id: 2,
    name: "medium",
    value: "Medium",
  },
  {
    code: "4",
    color: "var(--color-low-priority)",
    icon: LowPriorityIcon,
    id: 3,
    name: "low",
    value: "Low",
  },
];
