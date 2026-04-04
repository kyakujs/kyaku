"use no memo";

import type {
  ColumnDef,
  ExpandedState,
  RowData,
  TableState,
  VisibilityState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CircleDashedIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@kyakujs/ui/avatar";
import { Badge } from "@kyakujs/ui/badge";
import { Checkbox } from "@kyakujs/ui/checkbox";

import { TicketGroupList } from "~/components/common/tickets/ticket-list/ticket-group-list";
import { TicketSimpleList } from "~/components/common/tickets/ticket-list/ticket-simple-list";
import { getContextualDate } from "~/libs/date";
import { priorities } from "~/store/priority-store";
import { statuses } from "~/store/status-store";
import { subStatuses } from "~/store/substatus-store";

export const TICKET_SELECT_ACCESSOR_KEY = "select";
export const TICKET_PRIORITY_ACCESSOR_KEY = "priority";
export const TICKET_SHORTID_ACCESSOR_KEY = "shortId";
export const TICKET_STATUS_ACCESSOR_KEY = "status";
export const TICKET_STATUSDETAIL_ACCESSOR_KEY = "statusDetail";
export const TICKET_TITLE_ACCESSOR_KEY = "title";
export const TICKET_LABELS_ACCESSOR_KEY = "labels";
export const TICKET_CREATEDAT_ACCESSOR_KEY = "createdAt";
export const TICKET_UPDATEDAT_ACCESSOR_KEY = "updatedAt";
export const TICKET_ASSIGNEDTO_ACCESSOR_KEY = "assignedTo";

declare module "@tanstack/table-core" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    layout: string;
  }
}

export interface Ticket {
  id: string;
  title: string;
  shortId: number;
  assignedTo: {
    id: string;
    name: string;
    firstName: string | null;
    lastName: string | null;
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
  updatedAt: number;
}

const columns: ColumnDef<Ticket>[] = [
  {
    id: TICKET_SELECT_ACCESSOR_KEY,
    cell: ({ row }) => (
      <div data-list-grid-column="select">
        <div className="flex h-full items-center justify-center">
          <Checkbox
            tabIndex={-1}
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        </div>
      </div>
    ),
    meta: {
      layout: "start",
    },
  },
  {
    accessorKey: TICKET_PRIORITY_ACCESSOR_KEY,
    aggregatedCell: ({ cell }) => {
      const priority = priorities.find(
        (p) => p.id === cell.getValue<number | undefined>(),
      );

      if (!priority) return null;

      return (
        <div className="flex items-center gap-2">
          <priority.icon className="size-4" style={{ color: priority.color }} />
          <span className="text-foreground">{priority.value}</span>
        </div>
      );
    },
    cell: ({ cell }) => {
      const priority = priorities.find(
        (p) => p.id === cell.getValue<number | undefined>(),
      );

      if (!priority) return null;

      return (
        <div className="flex items-center" data-list-grid-column="priority">
          <priority.icon className="size-4" style={{ color: priority.color }} />
        </div>
      );
    },
    meta: {
      layout: "start",
    },
  },
  {
    accessorKey: TICKET_SHORTID_ACCESSOR_KEY,
    cell: ({ cell }) => {
      return (
        <div className="flex items-center" data-list-grid-column="shortId">
          <div className="text-left text-[13px]">
            <span className="inline-block flex-nowrap font-features-['cpsp','calt'] tracking-[-0.02em] text-muted-foreground tabular-nums">
              TIC-{cell.getValue<string>()}
            </span>
          </div>
        </div>
      );
    },
    meta: {
      layout: "start",
    },
  },
  {
    accessorKey: TICKET_STATUS_ACCESSOR_KEY,
    cell: ({ cell }) => {
      const status = statuses.find((s) => s.id === cell.getValue<number>());

      if (!status) return null;

      return (
        <div className="flex items-center" data-list-grid-column="status">
          <status.icon className="size-4" style={{ color: status.color }} />
        </div>
      );
    },
    meta: {
      layout: "start",
    },
  },
  {
    accessorKey: TICKET_STATUSDETAIL_ACCESSOR_KEY,
    aggregatedCell: ({ cell }) => {
      const subStatus = subStatuses.find(
        (s) => s.id === cell.getValue<number>(),
      );

      if (!subStatus) return null;

      return (
        <div className="flex items-center gap-2">
          <subStatus.icon
            className="size-4 shrink-0"
            style={{ color: subStatus.color }}
          />
          <span>{subStatus.value}</span>
        </div>
      );
    },
    cell: ({ cell }) => {
      const subStatus = subStatuses.find(
        (s) => s.id === cell.getValue<number>(),
      );

      if (!subStatus) return null;

      return (
        <div className="flex items-center" data-list-grid-column="statusDetail">
          <subStatus.icon
            className="size-4"
            style={{ color: subStatus.color }}
          />
        </div>
      );
    },
    meta: {
      layout: "start",
    },
  },
  {
    accessorKey: TICKET_TITLE_ACCESSOR_KEY,
    cell: ({ cell }) => (
      <span
        data-list-grid-column="title"
        className="flex min-w-0 flex-[initial] shrink items-center"
      >
        <span className="truncate text-sm" title={cell.getValue<string>()}>
          {cell.getValue<string>()}
        </span>
      </span>
    ),
    meta: {
      layout: "title",
    },
  },
  {
    id: TICKET_LABELS_ACCESSOR_KEY,
    cell: ({ row }) => (
      <div
        className="flex flex-[initial] shrink-[1.5] grow flex-row"
        data-list-grid-column="labels"
      >
        <div className="flex flex-[initial] grow flex-row"></div>
        {row.original.labels.map((label) => (
          <div key={label.id} className="min-w-0 last:min-w-max">
            <Badge
              className="max-w-28 min-w-0 gap-1.5 truncate xl:max-w-56"
              variant="outline"
            >
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                style={{ color: label.color }}
              >
                <circle
                  cx="4"
                  cy="4"
                  r="2.5"
                  fill="currentColor"
                  stroke="currentColor"
                ></circle>
              </svg>

              <span className="truncate">{label.name}</span>
            </Badge>
          </div>
        ))}
      </div>
    ),
    meta: {
      layout: "labels",
    },
  },
  {
    id: TICKET_ASSIGNEDTO_ACCESSOR_KEY,
    accessorFn: (row) => row.assignedTo?.id ?? null,
    aggregatedCell: ({ row }) =>
      row.original.assignedTo ? (
        <div className="flex items-center gap-2">
          <Avatar className="size-5">
            <AvatarImage
              src={row.original.assignedTo.image}
              alt={row.original.assignedTo.username}
            />
            <AvatarFallback
              render={
                <svg
                  viewBox="0 0 100 100"
                  className="fill-current p-[5%] text-[48px] font-medium uppercase"
                  aria-hidden={true}
                />
              }
            >
              <text
                x="50%"
                y="50%"
                alignmentBaseline="middle"
                dominantBaseline="middle"
                textAnchor="middle"
                dy=".125em"
              >
                {row.original.assignedTo.firstName?.[0] ?? ""}
                {row.original.assignedTo.lastName?.[0] ?? ""}
              </text>
            </AvatarFallback>
          </Avatar>
          <span>{row.original.assignedTo.username}</span>
        </div>
      ) : (
        <span>No assignee</span>
      ),
    cell: ({ row }) => (
      <div data-list-grid-column="assignedTo">
        {row.original.assignedTo ? (
          <Avatar className="size-5">
            <AvatarImage
              src={row.original.assignedTo.image}
              alt={row.original.assignedTo.username}
            />
            <AvatarFallback
              render={
                <svg
                  viewBox="0 0 100 100"
                  className="fill-current p-[5%] text-[48px] font-medium uppercase"
                  aria-hidden={true}
                />
              }
            >
              <text
                x="50%"
                y="50%"
                alignmentBaseline="middle"
                dominantBaseline="middle"
                textAnchor="middle"
                dy=".125em"
              >
                {row.original.assignedTo.firstName?.[0] ?? ""}
                {row.original.assignedTo.lastName?.[0] ?? ""}
              </text>
            </AvatarFallback>
          </Avatar>
        ) : (
          <CircleDashedIcon className="size-5" />
        )}
      </div>
    ),
    meta: {
      layout: "assignedTo",
    },
  },
  {
    accessorKey: TICKET_CREATEDAT_ACCESSOR_KEY,
    cell: ({ cell }) => (
      <div
        className="flex items-center justify-end text-right"
        data-list-grid-column="createdAt"
      >
        <span className="shrink-0 flex-nowrap text-sm">
          {getContextualDate(new Date(cell.getValue<number>()), "en-US")}
        </span>
      </div>
    ),
    meta: {
      layout: "end",
    },
  },
  {
    accessorKey: TICKET_UPDATEDAT_ACCESSOR_KEY,
    cell: ({ cell }) => (
      <div
        className="flex items-center justify-end text-right"
        data-list-grid-column="updatedAt"
      >
        <span className="shrink-0 flex-nowrap text-sm">
          {getContextualDate(new Date(cell.getValue<number>()), "en-US")}
        </span>
      </div>
    ),
    meta: {
      layout: "end",
    },
  },
  {
    accessorKey: "end-padding",
    cell: () => <div data-list-grid-column="end-padding"></div>,
    meta: {
      layout: "end",
    },
  },
];

export function TicketList({
  data,
  state,
}: {
  data: Ticket[];
  state: Partial<TableState> | undefined;
}) {
  const [expanded, setExpanded] = useState<ExpandedState>(true);

  const columnVisibility: VisibilityState = useMemo(
    () => ({
      ...(state?.columnVisibility ?? {}),
      [TICKET_SELECT_ACCESSOR_KEY]: true,
      [TICKET_TITLE_ACCESSOR_KEY]: true,
      ["end-padding"]: true,
    }),
    [state?.columnVisibility],
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getRowId: (row) => row.id,
    getSortedRowModel: getSortedRowModel(),
    groupedColumnMode: false,
    manualExpanding: true,
    onExpandedChange: setExpanded,
    state: {
      ...state,
      columnVisibility,
      columnOrder: [
        TICKET_SELECT_ACCESSOR_KEY,
        TICKET_PRIORITY_ACCESSOR_KEY,
        TICKET_SHORTID_ACCESSOR_KEY,
        TICKET_STATUSDETAIL_ACCESSOR_KEY,
        TICKET_TITLE_ACCESSOR_KEY,
        TICKET_LABELS_ACCESSOR_KEY,
        TICKET_ASSIGNEDTO_ACCESSOR_KEY,
        TICKET_CREATEDAT_ACCESSOR_KEY,
        TICKET_UPDATEDAT_ACCESSOR_KEY,
      ],
      expanded: expanded,
    },
    debugTable: true,
  });

  const visibilityTemplate = useMemo(
    () => ({
      "[select] 26px": true,
      "[priority] 16px":
        columnVisibility[TICKET_PRIORITY_ACCESSOR_KEY] ?? false,
      "[shortId] minmax(52px, auto)":
        columnVisibility[TICKET_SHORTID_ACCESSOR_KEY] ?? false,
      "[statusDetail] 16px":
        columnVisibility[TICKET_STATUSDETAIL_ACCESSOR_KEY] ?? false,
      "[title] 1fr": true,
      "[createdAt] minmax(56px, auto)":
        columnVisibility[TICKET_CREATEDAT_ACCESSOR_KEY] ?? false,
      "[updatedAt] minmax(56px, auto)":
        columnVisibility[TICKET_UPDATEDAT_ACCESSOR_KEY] ?? false,
      "[end-padding] 12px": true,
    }),
    [columnVisibility],
  );

  const gridListStyle = useMemo(
    () =>
      ({
        "--data-list-template": Object.entries(visibilityTemplate)
          .filter(([_, isVisible]) => isVisible)
          .map(([template]) => template)
          .join(" "),
      }) as React.CSSProperties,
    [visibilityTemplate],
  );

  if (state?.grouping?.length) {
    return (
      <div
        className="col-[1/_-1] grid w-full min-w-0 grow grid-cols-(--data-list-template) gap-2 overflow-hidden"
        style={gridListStyle}
      >
        <TicketGroupList rows={table.getRowModel().rows} table={table} />
      </div>
    );
  }

  return (
    <div
      className="col-[1/_-1] grid w-full min-w-0 grow grid-cols-(--data-list-template) gap-2 overflow-hidden"
      style={gridListStyle}
    >
      <TicketSimpleList rows={table.getRowModel().rows} />
    </div>
  );
}
