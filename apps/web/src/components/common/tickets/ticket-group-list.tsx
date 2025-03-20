/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use no memo";

import type { JSX } from "react";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { TicketGroupHeader } from "~/components/common/tickets/ticket-group-header";
import { TicketGroupListItem } from "~/components/common/tickets/ticket-group-list-item";

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

export interface DataList<_T> {
  rowSelection: string[];
  isRowSelected: (rowId: string) => boolean;
  onRowSelectionChange: (rowId: string) => void;
}

export const TICKET_GROUP_ITEM_HEIGHT = 39;

export function TicketGroupList({
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
      groupedPriorities[Number(groups[index]!)]!.length *
        TICKET_GROUP_ITEM_HEIGHT +
      TICKET_GROUP_ITEM_HEIGHT,
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
            <TicketGroupHeader
              data-list-key={`GROUP_${virtualRow.index}`}
              count={groupedPriorities[virtualRow.index]?.length ?? 0}
              priority={virtualRow.index}
            />
            <TicketGroupListItem
              columns={columns}
              items={groupedPriorities[virtualRow.index] ?? []}
              initialOffset={() => groupVirtualizer.scrollOffset ?? 0}
              getScrollElement={() => parentRef.current!}
              scrollMargin={virtualRow.start + TICKET_GROUP_ITEM_HEIGHT}
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
