/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use no memo";

import type { Row } from "@tanstack/react-table";
import { useRef } from "react";
import { flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import type { Ticket } from "~/components/common/tickets/ticket-list/ticket-list";
import { TicketVirtualList } from "~/components/common/tickets/ticket-list/ticket-virtual-list";

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
        {virtualItems.map((virtualItem) => {
          const currentRow = rows[virtualItem.index];

          if (!currentRow) return null;

          return (
            <div
              key={virtualItem.key}
              data-group-key={`group_GROUP_${currentRow.id}`}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
            >
              {currentRow.getVisibleCells().map((groupedCell) => {
                return groupedCell.getIsAggregated() ? null : (
                  <div
                    key={groupedCell.id}
                    data-list-key={`GROUP_${groupedCell.column.id}`}
                  >
                    <div className="sticky top-0 z-2 flex h-[39px] items-center gap-2 border-b bg-muted pr-2 pl-8 text-sm">
                      <span>
                        {flexRender(
                          groupedCell.column.columnDef.aggregatedCell,
                          groupedCell.getContext(),
                        )}
                      </span>

                      <span className="text-muted-foreground">
                        {currentRow.subRows.length}
                      </span>
                    </div>
                    <TicketVirtualList
                      getScrollElement={() => parentRef.current}
                      initialOffset={() => virtualizer.scrollOffset ?? 0}
                      scrollMargin={
                        virtualItem.start + TICKET_GROUP_ITEM_HEIGHT
                      }
                      rows={rows[virtualItem.index]?.subRows ?? []}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
        {paddingBottom > 0 ? (
          <div style={{ height: paddingBottom }}></div>
        ) : null}
      </div>
    </div>
  );
}
