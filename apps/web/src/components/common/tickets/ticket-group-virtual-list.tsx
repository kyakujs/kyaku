/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use no memo";

import type { Row } from "@tanstack/react-table";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import type { Ticket } from "~/components/common/tickets/ticket-list";
import { TicketListGroupItem } from "~/components/common/tickets/ticket-list-group-item";
import { TicketVirtualList } from "~/components/common/tickets/ticket-virtual-list";

export const TICKET_GROUP_ITEM_HEIGHT = 39;

export function TicketGroupVirtualList({ rows }: { rows: Row<Ticket>[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: (index) =>
      (rows[index]?.subRows.length ?? 0) * TICKET_GROUP_ITEM_HEIGHT +
      TICKET_GROUP_ITEM_HEIGHT,
    getScrollElement: () => parentRef.current,
    overscan: 0,
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
      ref={parentRef}
      className="h-full overflow-x-hidden overflow-y-auto"
      data-view
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {paddingTop > 0 ? <div style={{ height: paddingTop }}></div> : null}
        {virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.key}
            data-group-key={`group_GROUP_${rows[virtualRow.index]?.id}`}
            data-index={virtualRow.index}
            ref={virtualizer.measureElement}
          >
            {rows[virtualRow.index]?.getVisibleCells().map((groupedCell) => {
              return groupedCell.getIsAggregated() ? null : (
                <div
                  key={groupedCell.id}
                  data-group-header-id={groupedCell.column.id}
                >
                  <TicketListGroupItem
                    data-list-key={`GROUP_${virtualRow.index}`}
                    cell={groupedCell}
                    count={rows[virtualRow.index]?.subRows.length ?? 0}
                  />
                  <TicketVirtualList
                    getScrollElement={() => parentRef.current!}
                    initialOffset={() => virtualizer.scrollOffset ?? 0}
                    scrollMargin={virtualRow.start + TICKET_GROUP_ITEM_HEIGHT}
                    rows={rows[virtualRow.index]?.subRows ?? []}
                  />
                </div>
              );
            })}
          </div>
        ))}
        {paddingBottom > 0 ? (
          <div style={{ height: paddingBottom }}></div>
        ) : null}
      </div>
    </div>
  );
}
