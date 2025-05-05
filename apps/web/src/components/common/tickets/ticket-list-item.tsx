/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use no memo";

import type { Row } from "@tanstack/react-table";
import { Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import type { Ticket } from "~/components/common/tickets/ticket-list";
import { TICKET_GROUP_ITEM_HEIGHT } from "~/components/common/tickets/ticket-list-group";

export function TicketListItem({
  getScrollElement,
  initialOffset,
  rows,
  scrollMargin,
}: {
  getScrollElement: () => HTMLDivElement;
  initialOffset: () => number;
  rows: Row<Ticket>[];
  scrollMargin: number;
}) {
  const virtualizer = useVirtualizer({
    count: rows.length,
    scrollMargin,
    getScrollElement,
    estimateSize: () => TICKET_GROUP_ITEM_HEIGHT,
    overscan: 0,
    initialOffset,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const [paddingTop, paddingBottom] =
    virtualItems.length > 0
      ? [
          Math.max(
            0,
            virtualItems[0]!.start - virtualizer.options.scrollMargin,
          ),
          Math.max(
            0,
            virtualizer.getTotalSize() -
              virtualItems[virtualItems.length - 1]!.end,
          ),
        ]
      : [0, 0];

  return (
    <div
      style={{
        height: virtualizer.getTotalSize(),
      }}
    >
      {paddingTop > 0 ? <div style={{ height: paddingTop }}></div> : null}
      {virtualItems.map((virtualRow) => (
        <Link
          to="/ticket/$ticketId"
          params={{ ticketId: rows[virtualRow.index]!.original.id }}
          key={virtualRow.key}
          data-list-key={`ITEM_${rows[virtualRow.index]!.id}`}
          data-index={virtualRow.index}
          ref={virtualizer.measureElement}
          className="block h-[39px] w-full -outline-offset-3 transition-colors hover:bg-muted/50 focus-visible:outline-1 data-[state=selected]:bg-muted"
        >
          <div className="flex h-full flex-col items-center justify-center p-2">
            <div className="flex w-full flex-[initial] flex-row items-center gap-2 text-sm">
              {rows[virtualRow.index]
                ?.getVisibleCells()
                .map((cell) => (
                  <Fragment key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Fragment>
                ))}
            </div>
          </div>
        </Link>
      ))}
      {paddingBottom > 0 ? <div style={{ height: paddingBottom }}></div> : null}
    </div>
  );
}
