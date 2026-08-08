import type { LinkComponentProps } from "@tanstack/react-router";
import type { Row } from "@tanstack/react-table";
import { Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { flexRender } from "@tanstack/react-table";

import type { Ticket } from "~/components/common/tickets/ticket-list/ticket-list";

export const TICKET_ITEM_HEIGHT = 39;

type TicketListLineProps = {
  row: Row<Ticket>;
} & LinkComponentProps;

export function TicketListLine({ row, ...props }: TicketListLineProps) {
  const visibleCells = row.getVisibleCells();
  return (
    <Link
      to="/ticket/$ticketId"
      params={{ ticketId: row.original.id }}
      tabIndex={0}
      className="relative col-[1/_-1] grid h-[39px] w-full min-w-0 grid-cols-subgrid transition-colors will-change-transform contain-style outline-none hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:shadow-[0_0_0_1px_var(--color-accent)_inset]"
      {...props}
    >
      {visibleCells
        .filter((cell) => cell.column.columnDef.meta?.layout === "start")
        .map((cell) => (
          <Fragment key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Fragment>
        ))}
      <div
        className="flex w-full min-w-0 items-center gap-2"
        data-list-grid-column="title"
      >
        {visibleCells
          .filter((cell) => cell.column.columnDef.meta?.layout === "title")
          .map((cell) => (
            <Fragment key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Fragment>
          ))}
        <div className="contents">
          {visibleCells.filter(
            (cell) => cell.column.columnDef.meta?.layout === "labels",
          ).length ? (
            visibleCells
              .filter((cell) => cell.column.columnDef.meta?.layout === "labels")
              .map((cell) => (
                <Fragment key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Fragment>
              ))
          ) : (
            <div className="flex flex-[initial] grow flex-row"></div>
          )}
          {visibleCells
            .filter(
              (cell) => cell.column.columnDef.meta?.layout === "assignedTo",
            )
            .map((cell) => (
              <Fragment key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Fragment>
            ))}
        </div>
      </div>
      {visibleCells
        .filter((cell) => cell.column.columnDef.meta?.layout === "end")
        .map((cell) => (
          <Fragment key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Fragment>
        ))}
    </Link>
  );
}
