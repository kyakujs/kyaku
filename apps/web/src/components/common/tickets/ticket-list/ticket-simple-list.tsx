/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use no memo";

import type { Row } from "@tanstack/react-table";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import type { Ticket } from "~/components/common/tickets/ticket-list/ticket-list";
import { TICKET_GROUP_ITEM_HEIGHT } from "~/components/common/tickets/ticket-list/ticket-group-list";
import { TicketListLine } from "~/components/common/tickets/ticket-list/ticket-list-line";

export function TicketSimpleList({ rows }: { rows: Row<Ticket>[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => TICKET_GROUP_ITEM_HEIGHT,
    getScrollElement: () => parentRef.current,
    overscan: 25,
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
    <div ref={parentRef} className="h-full overflow-x-hidden overflow-y-auto">
      <div
        style={{
          height: virtualizer.getTotalSize(),
        }}
      >
        {paddingTop > 0 ? <div style={{ height: paddingTop }}></div> : null}
        {virtualItems.map((virtualItem) => (
          <TicketListLine
            key={virtualItem.key}
            data-list-key={`ITEM_${rows[virtualItem.index]?.id}`}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            row={rows[virtualItem.index]!}
          />
        ))}
        {paddingBottom > 0 ? (
          <div style={{ height: paddingBottom }}></div>
        ) : null}
      </div>
    </div>
  );
}
