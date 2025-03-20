import { PriorityIcon } from "~/components/common/tickets/priority-icon";
import { PriorityLabel } from "~/components/common/tickets/priority-label";

export function TicketGroupHeader({
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
      <span className="text-foreground">
        <PriorityLabel priority={priority} />
      </span>
      <span className="text-muted-foreground">{count}</span>
    </div>
  );
}
