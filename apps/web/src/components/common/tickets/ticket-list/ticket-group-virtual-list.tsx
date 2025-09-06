/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use no memo";

import type { Row } from "@tanstack/react-table";
import type { Range } from "@tanstack/react-virtual";
import { Fragment, useCallback, useMemo, useRef } from "react";
import { flexRender } from "@tanstack/react-table";
import { defaultRangeExtractor, useVirtualizer } from "@tanstack/react-virtual";

import type { Ticket } from "~/components/common/tickets/ticket-list/ticket-list";
import { TicketListLine } from "~/components/common/tickets/ticket-list/ticket-list-line";

export const TICKET_GROUP_ITEM_HEIGHT = 39;

export function TicketGroupVirtualList({ rows }: { rows: Row<Ticket>[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const activeStickyIndexRef = useRef(0);
  const flattenedRows = useMemo(
    () => rows.flatMap((row) => [row, ...row.subRows]),
    [rows],
  );
  const stickyIndexes = useMemo(
    () =>
      rows.map((row) =>
        flattenedRows.findIndex((flatRow) => flatRow.id === row.id),
      ),
    [flattenedRows, rows],
  );

  const virtualizer = useVirtualizer({
    count: flattenedRows.length,
    estimateSize: () => TICKET_GROUP_ITEM_HEIGHT,
    getScrollElement: () => parentRef.current,
    rangeExtractor: useCallback(
      (range: Range) => {
        activeStickyIndexRef.current =
          [...stickyIndexes]
            .reverse()
            .find((index) => range.startIndex >= index) ?? 0;

        const next = new Set([
          activeStickyIndexRef.current,
          ...defaultRangeExtractor(range),
        ]);

        return [...next].sort((a, b) => a - b);
      },
      [stickyIndexes],
    ),
    overscan: 20,
  });

  const virtualItems = virtualizer.getVirtualItems();

  const [paddingTop, paddingBottom] =
    virtualItems.length > 0
      ? [
          Math.max(
            0,
            (virtualItems[1]?.start ?? 0) -
              (virtualItems[0]?.size ?? 0) -
              virtualizer.options.scrollMargin,
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
          const currentRow = flattenedRows[virtualItem.index];

          if (!currentRow) return null;

          return currentRow.getIsGrouped() ? (
            <div
              key={virtualItem.key}
              data-list-key={`GROUP_${currentRow.id}`}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              className="sticky top-0 z-2 flex h-[39px] items-center gap-2 border-b bg-muted pr-2 pl-8 text-sm"
            >
              {currentRow
                .getVisibleCells()
                .map((cell) =>
                  cell.getIsAggregated() ? null : (
                    <Fragment key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.aggregatedCell,
                        cell.getContext(),
                      )}
                    </Fragment>
                  ),
                )}
            </div>
          ) : (
            <TicketListLine
              key={virtualItem.key}
              data-list-key={`ITEM_${currentRow.id}`}
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              row={currentRow}
            />
          );
        })}
        {paddingBottom > 0 ? (
          <div style={{ height: paddingBottom }}></div>
        ) : null}
      </div>
    </div>
  );
}
