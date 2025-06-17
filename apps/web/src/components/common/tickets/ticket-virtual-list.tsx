/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use no memo";

import type { Row } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import type { Ticket } from "~/components/common/tickets/ticket-list";
import { TICKET_GROUP_ITEM_HEIGHT } from "~/components/common/tickets/ticket-group-virtual-list";
import { TicketListLine } from "~/components/common/tickets/ticket-list-line";

export function TicketVirtualList({
  getScrollElement,
  initialOffset,
  rows,
  scrollMargin,
}: {
  getScrollElement: () => HTMLDivElement | null;
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
        <TicketListLine
          key={virtualRow.key}
          data-list-key={`ITEM_${rows[virtualRow.index]?.id}`}
          data-index={virtualRow.index}
          ref={virtualizer.measureElement}
          row={rows[virtualRow.index]!}
        />
      ))}
      {paddingBottom > 0 ? <div style={{ height: paddingBottom }}></div> : null}
    </div>
  );
}
