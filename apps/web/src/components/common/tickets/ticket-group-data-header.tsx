import { PriorityIcon } from "~/components/common/tickets/priority-icon";

export const getPriority = (priority: number) => {
  return priority === 0 ? (
    <span>Critical</span>
  ) : priority === 1 ? (
    <span>High</span>
  ) : priority === 2 ? (
    <span>Medium</span>
  ) : (
    <span>Low</span>
  );
};

export function TicketGroupDataHeader({
  count,
  priority,
  ...props
}: {
  count: number;
  priority: number;
  "data-list-key": string;
}) {
  return (
    <div
      className="sticky top-0 z-2 flex h-[39px] items-center gap-2 border-b bg-muted pr-2 pl-8 text-sm"
      {...props}
    >
      <PriorityIcon priority={priority} />
      <span className="text-foreground">{getPriority(priority)}</span>
      <span className="text-muted-foreground">{count}</span>
    </div>
  );
}
