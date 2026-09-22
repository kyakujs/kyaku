/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use no memo";

import type { Row } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useRef } from "react";

import type { features, Ticket } from "~/components/common/tickets/ticket-list/ticket-list";
import {
  TICKET_ITEM_HEIGHT,
  TicketListLine,
} from "~/components/common/tickets/ticket-list/ticket-list-line";

export function TicketSimpleList({ rows }: { rows: Row<typeof features, Ticket>[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const getScrollElement = useCallback(() => parentRef.current, []);

  const virtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => TICKET_ITEM_HEIGHT,
    getScrollElement: getScrollElement,
    overscan: 25,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const [paddingTop, paddingBottom] =
    virtualItems.length > 0
      ? [
          Math.max(0, virtualItems[0]!.start - virtualizer.options.scrollMargin),
          Math.max(0, virtualizer.getTotalSize() - virtualItems[virtualItems.length - 1]!.end),
        ]
      : [0, 0];

  return (
    <div
      ref={parentRef}
      className="col-span-full grid min-h-0 w-full grid-cols-subgrid overflow-x-hidden overflow-y-auto"
    >
      <div
        className="col-span-full grid min-h-0 w-full grid-cols-subgrid items-start"
        style={{
          height: virtualizer.getTotalSize(),
        }}
      >
        {paddingTop > 0 ? <div style={{ height: paddingTop }}></div> : null}
        {virtualItems.map((virtualItem) => {
          const row = rows[virtualItem.index];
          if (!row) return null;
          console.log("Rendering virtual item:", virtualItem.index, "row ID:", row.id);

          return (
            <TicketListLine
              key={virtualItem.key}
              data-index={virtualItem.index}
              data-list-key={`ITEM_${row.id}`}
              row={row}
            />
          );
        })}
        {paddingBottom > 0 ? <div style={{ height: paddingBottom }}></div> : null}
      </div>
    </div>
  );
}
