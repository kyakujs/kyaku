"use no memo";

import type { JSX } from "react";
import { Fragment, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";

import { TicketGroupDataHeader } from "~/components/common/tickets/ticket-group-data-header";

export const getContextualDate = (date: Date, locale: string) => {
  if (date.getFullYear() === new Date().getFullYear()) {
    return new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
    }).format(date);
  } else {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
    }).format(date);
  }
};

export interface Ticket {
  id: string;
  title: string;
  shortId: number;
  assignedTo: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    username: string;
    image: string;
  } | null;
  priority: number;
  status: number;
  statusDetail: number;
  labels: {
    id: string;
    name: string;
    color: string;
  }[];
  createdAt: number;
}

export type Column<T> = {
  id: string;
  cell: ({ row, dataList }: { row: T; dataList: DataList<T> }) => JSX.Element;
}[];

export interface DataList<T> {
  rowSelection: string[];
  isRowSelected: (rowId: string) => boolean;
  onRowSelectionChange: (rowId: string) => void;
}

const ITEM_HEIGHT = 39;

export function TicketGroupDataList({
  columns,
  data,
  dataList,
}: {
  columns: Column<Ticket>;
  data: Ticket[];
  dataList: DataList<Ticket>;
}) {
  const parentRef = useRef<HTMLDivElement>(null);

  const groupedPriorities = Object.groupBy(data, (row) => row.priority);
  const groups = Object.keys(groupedPriorities);

  const groupVirtualizer = useVirtualizer({
    count: groups.length,
    estimateSize: (index) =>
      groupedPriorities[Number(groups[index]!)]!.length * ITEM_HEIGHT +
      ITEM_HEIGHT,
    getScrollElement: () => parentRef.current,
    overscan: 0,
  });

  const virtualItems = groupVirtualizer.getVirtualItems();

  const [paddingTop, paddingBottom] =
    virtualItems.length > 0
      ? [
          Math.max(
            0,
            virtualItems[0]!.start - groupVirtualizer.options.scrollMargin,
          ),
          Math.max(
            0,
            groupVirtualizer.getTotalSize() -
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
          height: `${groupVirtualizer.getTotalSize()}px`,
        }}
      >
        {paddingTop > 0 ? <div style={{ height: paddingTop }}></div> : null}
        {virtualItems.map((virtualRow) => (
          <div
            key={virtualRow.key}
            data-group-key={`group_GROUP_${groups[virtualRow.index]}`}
            data-index={virtualRow.index}
            ref={groupVirtualizer.measureElement}
          >
            <TicketGroupDataHeader
              data-list-key={`GROUP_${virtualRow.index}`}
              count={groupedPriorities[virtualRow.index]?.length ?? 0}
              priority={virtualRow.index}
            />
            <TicketGroupDataListItem
              columns={columns}
              items={groupedPriorities[virtualRow.index] ?? []}
              initialOffset={() => groupVirtualizer.scrollOffset ?? 0}
              getScrollElement={() => parentRef.current!}
              scrollMargin={virtualRow.start + ITEM_HEIGHT}
              dataList={dataList}
            />
          </div>
        ))}
        {paddingBottom > 0 ? (
          <div style={{ height: paddingBottom }}></div>
        ) : null}
      </div>
    </div>
  );
}

function TicketGroupDataListItem({
  columns,
  items,
  getScrollElement,
  initialOffset,
  scrollMargin,
  dataList,
}: {
  columns: Column<Ticket>;
  initialOffset: () => number;
  scrollMargin: number;
  items: Ticket[];
  getScrollElement: () => HTMLDivElement;
  dataList: DataList<Ticket>;
}) {
  const virtualizer = useVirtualizer({
    count: items.length,
    scrollMargin,
    getScrollElement,
    estimateSize: () => ITEM_HEIGHT,
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
          params={{ ticketId: items[virtualRow.index]!.id }}
          key={virtualRow.key}
          data-list-key={`ITEM_${items[virtualRow.index]!.id}`}
          data-index={virtualRow.index}
          ref={virtualizer.measureElement}
          className="block h-[39px] w-full -outline-offset-3 transition-colors hover:bg-muted/50 focus-visible:outline-1 data-[state=selected]:bg-muted"
        >
          <div className="flex h-full flex-col items-center justify-center p-2">
            <div className="flex w-full flex-[initial] flex-row items-center gap-2 text-sm">
              {columns.map((column) => (
                <Fragment key={column.id}>
                  {column.cell({ row: items[virtualRow.index]!, dataList })}
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
