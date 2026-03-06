"use no memo";

import type { Row, Table } from "@tanstack/react-table";
import { Fragment, useCallback, useRef } from "react";
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
import {
  TICKET_ITEM_HEIGHT,
  TicketListLine,
} from "~/components/common/tickets/ticket-list/ticket-list-line";

export const TICKET_GROUP_ITEM_HEIGHT = 39;

export function TicketGroupList({
  rows,
  table,
}: {
  rows: Row<Ticket>[];
  table: Table<Ticket>;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const getScrollElement = useCallback(() => parentRef.current, []);

  const virtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: (index) => {
      const row = rows[index];
      if (!row?.getIsExpanded()) return TICKET_GROUP_ITEM_HEIGHT;
      return row.subRows.length * TICKET_ITEM_HEIGHT + TICKET_GROUP_ITEM_HEIGHT;
    },
    getScrollElement: getScrollElement,
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
    <div
      ref={parentRef}
      className="col-[1/_-1] grid min-h-0 grid-cols-subgrid overflow-x-hidden overflow-y-auto"
    >
      <div
        className="col-[1/_-1] grid min-h-0 w-full grid-cols-subgrid content-start"
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
              data-index={virtualItem.index}
              ref={virtualizer.measureElement}
              data-group-key={`group_GROUP_${groupedRow.id}`}
              className="col-[1/_-1] grid size-full grid-cols-subgrid"
            >
              <ContextMenu>
                <ContextMenuTrigger
                  data-list-key={`GROUP_${groupedRow.id}`}
                  className="sticky top-0 z-2 col-[1/_-1] flex h-[39px] items-center gap-2 overflow-visible border-b border-border bg-sidebar text-sm will-change-transform"
                >
                  {groupedRow.getAllCells().map((groupedCell) =>
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
                    <>
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
                    </>
                  ) : null}
                </ContextMenuPopup>
              </ContextMenu>
              {groupedRow.getIsExpanded() ? (
                <TicketGroupSubList
                  getScrollElement={getScrollElement}
                  initialOffset={virtualizer.scrollOffset ?? 0}
                  scrollMargin={virtualItem.start}
                  rows={groupedRow.subRows}
                />
              ) : null}
            </div>
          );
        })}
        {paddingBottom > 0 ? (
          <div style={{ height: paddingBottom }}></div>
        ) : null}
        <div className="col-[1/_-1]"></div>
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
  initialOffset: number;
  rows: Row<Ticket>[];
  scrollMargin: number;
}) {
  const virtualizer = useVirtualizer({
    count: rows.length,
    scrollMargin,
    estimateSize: () => TICKET_ITEM_HEIGHT,
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
      className="col-[1/_-1] grid min-h-0 w-full grid-cols-subgrid content-start"
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
            data-index={virtualItem.index}
            data-list-key={`ITEM_${row.id}`}
            row={row}
          />
        );
      })}
      {paddingBottom > 0 ? <div style={{ height: paddingBottom }}></div> : null}
    </div>
  );
}
