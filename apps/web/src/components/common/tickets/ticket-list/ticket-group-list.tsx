/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use no memo";

import type { Row } from "@tanstack/react-table";
import { Fragment, useRef } from "react";
import { flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

import type { Ticket } from "~/components/common/tickets/ticket-list/ticket-list";
import { TicketListLine } from "~/components/common/tickets/ticket-list/ticket-list-line";

export const TICKET_GROUP_ITEM_HEIGHT = 39;

export function TicketGroupList({ rows }: { rows: Row<Ticket>[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: (index) =>
      (rows[index]?.subRows.length ?? 0) * TICKET_GROUP_ITEM_HEIGHT +
      TICKET_GROUP_ITEM_HEIGHT,
    getScrollElement: () => parentRef.current,
    overscan: 1,
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
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {paddingTop > 0 ? <div style={{ height: paddingTop }}></div> : null}
        {virtualItems.map((virtualItem) => {
          const groupedRow = rows[virtualItem.index];

          if (!groupedRow) return null;

          return (
            <div
              key={virtualItem.key}
              data-group-key={`group_GROUP_${groupedRow.id}`}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
            >
              <div
                data-list-key={`GROUP_${groupedRow.id}`}
                className="sticky top-0 z-2 flex h-[39px] items-center gap-2 border-b bg-muted pr-2 pl-8 text-sm"
              >
                {groupedRow.getVisibleCells().map((groupedCell) =>
                  groupedCell.getIsAggregated() ? null : (
                    <Fragment key={groupedCell.id}>
                      <span>
                        {flexRender(
                          groupedCell.column.columnDef.aggregatedCell,
                          groupedCell.getContext(),
                        )}
                      </span>

                      <span className="text-muted-foreground">
                        {groupedRow.subRows.length}
                      </span>
                    </Fragment>
                  ),
                )}
              </div>
              <TicketGroupSubList
                getScrollElement={() => parentRef.current}
                initialOffset={() => virtualizer.scrollOffset ?? 0}
                scrollMargin={virtualItem.start + TICKET_GROUP_ITEM_HEIGHT}
                rows={groupedRow.subRows}
              />
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

export function TicketGroupSubList({
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
    estimateSize: () => TICKET_GROUP_ITEM_HEIGHT,
    getScrollElement,
    initialOffset,
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
      {paddingBottom > 0 ? <div style={{ height: paddingBottom }}></div> : null}
    </div>
  );
}
