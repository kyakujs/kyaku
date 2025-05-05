"use no memo";

import type { Cell } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

import type { Ticket } from "~/components/common/tickets/ticket-list";

export function TicketListGroupItem({
  cell,
  count,
  ...props
}: {
  cell: Cell<Ticket, unknown>;
  count: number;
  "data-list-key": string;
}) {
  return (
    <div
      className="sticky top-0 z-2 flex h-[39px] items-center gap-2 border-b bg-muted pr-2 pl-8 text-sm"
      {...props}
    >
      {flexRender(cell.column.columnDef.aggregatedCell, cell.getContext())}
      <span className="text-muted-foreground">{count}</span>
    </div>
  );
}
