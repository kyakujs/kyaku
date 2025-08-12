"use no memo";

import type { LinkComponentProps } from "@tanstack/react-router";
import type { Row } from "@tanstack/react-table";
import { Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { flexRender } from "@tanstack/react-table";

import type { Ticket } from "~/components/common/tickets/ticket-list/ticket-list";

type TicketListLineProps = {
  row: Row<Ticket>;
} & LinkComponentProps;

export function TicketListLine({ row, ...props }: TicketListLineProps) {
  return (
    <Link
      to="/ticket/$ticketId"
      params={{ ticketId: row.original.id }}
      tabIndex={0}
      className="block h-[39px] w-full -outline-offset-3 transition-colors hover:bg-muted/50 focus:shadow-[0_0_0_1px_var(--color-destructive)_inset] focus-visible:outline-none"
      {...props}
    >
      <div className="flex h-full flex-col items-center justify-center p-2">
        <div className="flex w-full flex-[initial] flex-row items-center gap-2 text-sm">
          {row.getVisibleCells().map((cell) => (
            <Fragment key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Fragment>
          ))}
        </div>
      </div>
    </Link>
  );
}
