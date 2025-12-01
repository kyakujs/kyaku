"use no memo";

import type { ColumnDef, TableState } from "@tanstack/react-table";
import {
  getCoreRowModel,
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
export const TICKET_ASSIGNEDTO_ACCESSOR_KEY = "assignedTo";

export interface Ticket {
  id: string;
  title: string;
  shortId: number;
  assignedTo: {
    id: string;
    name: string;
    firstName: string | undefined;
    lastName: string | undefined;
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

export function TicketList({
  data,
  state,
}: {
  data: Ticket[];
  state: Partial<TableState> | undefined;
}) {
  const columns: ColumnDef<Ticket>[] = [
    {
      id: TICKET_SELECT_ACCESSOR_KEY,
      cell: ({ row }) => (
        <div className="flex items-center">
          <Checkbox
            tabIndex={-1}
            checked={row.getIsSelected()}
            //onCheckedChange={() => row.onRowSelectionChange(row.id)}
            onClick={(event) => {
              event.preventDefault();

              row.toggleSelected();
            }}
          />
        </div>
      ),
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
            <priority.icon
              className="size-4"
              style={{ color: priority.color }}
            />
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
          <div className="flex items-center">
            <priority.icon
              className="size-4"
              style={{ color: priority.color }}
            />
          </div>
        );
      },
    },
    {
      accessorKey: TICKET_SHORTID_ACCESSOR_KEY,
      cell: ({ cell, table }) => {
        const width =
          table
            .getRowModel()
            .flatRows.filter((row) => row.depth === 1)
            .toSorted((a, b) => b.original.shortId - a.original.shortId)[0]
            ?.original.shortId.toString().length ?? 3;

        return (
          <div
            className="flex shrink-0 items-center text-muted-foreground"
            style={{
              width: `${width + 4}ch`,
            }}
          >
            TIC-{cell.getValue<string>()}
          </div>
        );
      },
    },
    {
      accessorKey: TICKET_STATUS_ACCESSOR_KEY,
      cell: ({ cell }) => {
        const status = statuses.find((s) => s.id === cell.getValue<number>());

        if (!status) return null;

        return (
          <div className="flex items-center">
            <status.icon className="size-4" style={{ color: status.color }} />
          </div>
        );
      },
    },
    {
      accessorKey: TICKET_STATUSDETAIL_ACCESSOR_KEY,
      cell: ({ cell }) => {
        const subStatus = subStatuses.find(
          (s) => s.id === cell.getValue<number>(),
        );

        if (!subStatus) return null;

        return (
          <div className="flex items-center">
            <subStatus.icon
              className="size-4"
              style={{ color: subStatus.color }}
            />
          </div>
        );
      },
    },
    {
      accessorKey: TICKET_TITLE_ACCESSOR_KEY,
      cell: ({ cell }) => (
        <span className="flex min-w-0 flex-[initial] shrink-1 flex-row items-center">
          <span title={cell.getValue<string>()} className="truncate text-left">
            {cell.getValue<string>()}
          </span>
        </span>
      ),
    },
    {
      id: TICKET_LABELS_ACCESSOR_KEY,
      cell: ({ row }) => (
        <div className="mr-0 flex min-w-[150px] flex-[initial] shrink-[1.5] grow-1 flex-row items-center justify-between gap-0.75 overflow-hidden transition-[shrink] hover:max-w-[initial] hover:shrink-[0.3]">
          <div className="flex min-w-0 shrink-[initial] grow-1 basis-[initial] flex-row"></div>
          {row.original.labels.map((label) => (
            <div key={label.id} className="min-w-0 last:min-w-max">
              <Badge
                className="max-w-[112px] min-w-0 gap-1.5 truncate"
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
    },
    {
      accessorKey: TICKET_CREATEDAT_ACCESSOR_KEY,
      cell: ({ cell }) => (
        <div className="flex shrink-0 items-center">
          <span className="shrink-0">
            {getContextualDate(new Date(cell.getValue<number>()), "en-US")}
          </span>
        </div>
      ),
    },
    {
      id: TICKET_ASSIGNEDTO_ACCESSOR_KEY,
      accessorFn: (row) => row.assignedTo?.id ?? null,
      cell: ({ row }) =>
        row.original.assignedTo ? (
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
        ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    groupedColumnMode: false,
    debugTable: true,
  });

  if (state?.grouping?.length) {
    return <TicketGroupList rows={table.getRowModel().rows} />;
  }

  return <TicketSimpleList rows={table.getRowModel().rows} />;
}
