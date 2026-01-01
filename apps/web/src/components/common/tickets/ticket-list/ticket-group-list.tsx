/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Row, Table } from "@tanstack/react-table";
import { Fragment, useRef } from "react";
import { flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@kyakujs/ui/button";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuTrigger,
} from "@kyakujs/ui/context-menu";

import type { Ticket } from "~/components/common/tickets/ticket-list/ticket-list";
import { TicketListLine } from "~/components/common/tickets/ticket-list/ticket-list-line";

export const TICKET_GROUP_ITEM_HEIGHT = 39;

export function TicketGroupList({
  rows,
  table,
}: {
  rows: Row<Ticket>[];
  table: Table<Ticket>;
}) {
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
              <ContextMenu>
                <ContextMenuTrigger
                  data-list-key={`GROUP_${groupedRow.id}`}
                  className="sticky top-0 z-2 flex h-[39px] items-center gap-2 border-b border-border bg-sidebar pr-2 pl-2 text-sm"
                >
                  {groupedRow.getVisibleCells().map((groupedCell) =>
                    groupedCell.getIsAggregated() ? null : (
                      <Fragment key={groupedCell.id}>
                        {groupedRow.getCanExpand() ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            onClick={groupedRow.getToggleExpandedHandler()}
                            className="cursor-pointer"
                          >
                            {groupedRow.getIsExpanded() ? (
                              <ChevronDownIcon className="size-4" />
                            ) : (
                              <ChevronRightIcon className="size-4" />
                            )}
                          </Button>
                        ) : null}
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
                </ContextMenuTrigger>
                <ContextMenuPopup>
                  {groupedRow.getCanExpand() ? (
                    <ContextMenuItem
                      inset
                      onClick={groupedRow.getToggleExpandedHandler()}
                    >
                      {groupedRow.getIsExpanded() ? (
                        <span>Collapse</span>
                      ) : (
                        <span>Expand</span>
                      )}
                    </ContextMenuItem>
                  ) : null}
                  {groupedRow.getCanExpand() ? (
                    <ContextMenuItem
                      inset
                      onClick={table.getToggleAllRowsExpandedHandler()}
                    >
                      {groupedRow.getIsExpanded() ? (
                        <span>Collapse all</span>
                      ) : (
                        <span>Expand all</span>
                      )}
                    </ContextMenuItem>
                  ) : null}
                </ContextMenuPopup>
              </ContextMenu>
              {groupedRow.getIsExpanded() ? (
                <TicketGroupSubList
                  getScrollElement={() => parentRef.current}
                  initialOffset={() => virtualizer.scrollOffset ?? 0}
                  scrollMargin={virtualItem.start + TICKET_GROUP_ITEM_HEIGHT}
                  rows={groupedRow.subRows}
                />
              ) : null}
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
      {virtualItems.map((virtualItem) => {
        const row = rows[virtualItem.index];
        if (!row) return null;

        return (
          <TicketListLine
            key={virtualItem.key}
            data-list-key={`ITEM_${row.id}`}
            data-index={virtualItem.index}
            ref={virtualizer.measureElement}
            row={row}
          />
        );
      })}
      {paddingBottom > 0 ? <div style={{ height: paddingBottom }}></div> : null}
    </div>
  );
}
