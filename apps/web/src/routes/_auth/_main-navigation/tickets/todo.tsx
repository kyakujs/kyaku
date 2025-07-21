import type { ColumnDef } from "@tanstack/react-table";
import { useQuery, useZero } from "@rocicorp/zero/react";
import { createFileRoute } from "@tanstack/react-router";
import { CircleDashedIcon } from "lucide-react";

import type { Schema } from "@kyakujs/zero/schema";
import { cn } from "@kyakujs/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@kyakujs/ui/avatar";
import { Badge } from "@kyakujs/ui/badge";
import { Checkbox } from "@kyakujs/ui/checkbox";

import type { Ticket } from "~/components/common/tickets/ticket-list/ticket-list";
import { TicketList } from "~/components/common/tickets/ticket-list/ticket-list";
import { Header } from "~/components/layout/headers/tickets/header";
import { getContextualDate } from "~/libs/date";
import { priorities } from "~/store/priority-store";
import { statuses } from "~/store/status-store";
import { subStatuses } from "~/store/substatus-store";

export const Route = createFileRoute("/_auth/_main-navigation/tickets/todo")({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  const z = useZero<Schema>();
  const [data, result] = useQuery(
    z.query.ticket
      .where("status", 0)
      .related("assignedTo", (assignee) => assignee.one())
      .related("customer")
      .related("labels")
      .orderBy("priority", "asc")
      .orderBy("createdAt", "asc"),
  );

  const tickets: Ticket[] = data.map((ticket) => ({
    id: ticket.id,
    shortId: ticket.shortId,
    title: ticket.title,
    assignedTo: ticket.assignedTo
      ? {
          id: ticket.assignedTo.id,
          name: ticket.assignedTo.name,
          firstName: ticket.assignedTo.firstName,
          lastName: ticket.assignedTo.lastName,
          username: ticket.assignedTo.username,
          image: ticket.assignedTo.image,
        }
      : null,
    priority: ticket.priority,
    status: ticket.status,
    statusDetail: ticket.statusDetail,
    labels: ticket.labels.map((label) => ({
      id: label.id,
      name: label.name,
      color: label.color,
    })),
    createdAt: ticket.createdAt,
  }));

  const columns: ColumnDef<Ticket>[] = [
    {
      id: "select",
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
      accessorKey: "priority",
      aggregatedCell: ({ cell }) => {
        const priority = priorities.find(
          (p) => p.value === cell.getValue<number | undefined>(),
        );

        if (!priority) return null;

        return (
          <div className="flex items-center gap-2">
            <priority.icon className={cn("size-4", priority.color)} />
            <span className="text-foreground">{priority.name}</span>
          </div>
        );
      },
      cell: ({ cell }) => {
        const priority = priorities.find(
          (p) => p.value === cell.getValue<number | undefined>(),
        );

        if (!priority) return null;

        return (
          <div className="flex items-center">
            <priority.icon className={cn("size-4", priority.color)} />
          </div>
        );
      },
    },
    {
      accessorKey: "shortId",
      cell: ({ cell, table }) => {
        const width =
          table
            .getRowModel()
            .rows.toSorted((a, b) => b.original.shortId - a.original.shortId)[0]
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
      accessorKey: "status",
      cell: ({ cell }) => {
        const status = statuses.find(
          (s) => s.value === cell.getValue<number>(),
        );

        if (!status) return null;

        return (
          <div className="flex items-center">
            <span className={status.color}>
              <status.icon className="size-4" />
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "statusDetail",
      cell: ({ cell }) => {
        const subStatus = subStatuses.find(
          (s) => s.value === cell.getValue<number>(),
        );

        if (!subStatus) return null;

        return (
          <div className="flex items-center">
            <span className={subStatus.color}>
              <subStatus.icon className="size-4" />
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      cell: ({ cell }) => (
        <span className="flex min-w-0 flex-[initial] shrink-1 flex-row items-center">
          <span title={cell.getValue<string>()} className="truncate text-left">
            {cell.getValue<string>()}
          </span>
        </span>
      ),
    },
    {
      id: "labels",
      cell: ({ row }) => (
        <div className="mr-0 flex min-w-[150px] flex-[initial] shrink-[1.5] grow-1 flex-row items-center justify-between gap-0.75 overflow-hidden transition-[shrink] hover:max-w-[initial] hover:shrink-[0.3]">
          <div className="flex min-w-0 shrink-[initial] grow-1 basis-[initial] flex-row"></div>
          {row.original.labels.map((label) => (
            <div key={label.id} className="min-w-0 last:min-w-max">
              <Badge
                className="max-w-[112px] min-w-0 gap-1.5 truncate bg-background"
                variant="outline"
              >
                <div
                  className="size-2 shrink-0 rounded"
                  style={{ backgroundColor: label.color }}
                ></div>
                <span className="truncate">{label.name}</span>
              </Badge>
            </div>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      cell: ({ cell }) => (
        <div className="flex shrink-0 items-center">
          <span className="shrink-0">
            {getContextualDate(new Date(cell.getValue<number>()), "en-US")}
          </span>
        </div>
      ),
    },
    {
      id: "assignedTo",
      accessorFn: (row) => row.assignedTo?.id ?? null,
      cell: ({ row }) =>
        row.original.assignedTo ? (
          <Avatar className="size-5">
            <AvatarImage
              src={row.original.assignedTo.image}
              alt={row.original.assignedTo.username}
            />
            <AvatarFallback>
              {row.original.assignedTo.firstName?.[0] ?? ""}
              {row.original.assignedTo.lastName?.[0] ?? ""}
            </AvatarFallback>
          </Avatar>
        ) : (
          <CircleDashedIcon className="size-5" />
        ),
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <Header>
        <h2 className="text-sm">Todo</h2>
      </Header>
      <div className="h-full w-full overflow-auto">
        {result.type === "complete" ? (
          <TicketList
            columns={columns}
            data={tickets}
            state={{
              grouping: ["priority"],
              columnPinning: {
                left: ["select"],
              },
              columnOrder: [
                "select",
                "priority",
                "shortId",
                "statusDetail",
                "title",
                "labels",
                "createdAt",
                "assignedTo",
              ],
              columnVisibility: {
                status: false,
              },
              columnFilters: [
                {
                  id: "status",
                  value: [0, 1],
                },
              ],
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
