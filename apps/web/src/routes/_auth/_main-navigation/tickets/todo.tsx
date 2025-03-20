import { useCallback, useState } from "react";
import { useQuery, useZero } from "@rocicorp/zero/react";
import { createFileRoute } from "@tanstack/react-router";
import { CircleDashedIcon } from "lucide-react";

import type { Schema } from "@kyakujs/zero/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@kyakujs/ui/avatar";
import { Badge } from "@kyakujs/ui/badge";
import { Checkbox } from "@kyakujs/ui/checkbox";

import type {
  Column,
  Ticket,
} from "~/components/common/tickets/ticket-group-data-list";
import { PriorityIcon } from "~/components/common/tickets/priority-icon";
import { StatusIcon } from "~/components/common/tickets/status-icon";
import {
  getContextualDate,
  TicketGroupDataList,
} from "~/components/common/tickets/ticket-group-data-list";
import { Header } from "~/components/layout/headers/tickets/header";

export const Route = createFileRoute("/_auth/_main-navigation/tickets/todo")({
  component: RouteComponent,
});

function RouteComponent() {
  const z = useZero<Schema>();
  const [data] = useQuery(
    z.query.ticket
      .where("status", 0)
      .related("assignedTo", (assignee) => assignee.one())
      .related("customer")
      .related("labels")
      .orderBy("priority", "asc")
      .orderBy("createdAt", "asc")
      .limit(1000),
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

  const columns: Column<Ticket> = [
    {
      id: "select",
      cell: ({ row, dataList }) => (
        <div className="flex items-center">
          <Checkbox
            tabIndex={-1}
            checked={dataList.rowSelection.includes(row.id)}
            onCheckedChange={() => dataList.onRowSelectionChange(row.id)}
            onClick={(event) => {
              event.preventDefault();

              dataList.onRowSelectionChange(row.id);
            }}
          />
        </div>
      ),
    },
    {
      id: "priority",
      cell: ({ row }) => (
        <div className="flex items-center">
          <PriorityIcon priority={row.priority} />
        </div>
      ),
    },
    {
      id: "shortId",
      cell: ({ row }) => (
        <div
          className="flex shrink-0 items-center text-muted-foreground"
          style={{
            width: `7ch`,
          }}
        >
          TIC-{row.shortId}
        </div>
      ),
    },
    {
      id: "status",
      cell: ({ row }) => (
        <div className="flex items-center">
          <StatusIcon status={row.status} />
        </div>
      ),
    },
    {
      id: "title",
      cell: ({ row }) => (
        <span className="flex min-w-0 flex-[initial] shrink-1 flex-row items-center">
          <span title={row.title} className="truncate text-left">
            {row.title}
          </span>
        </span>
      ),
    },
    {
      id: "labels",
      cell: ({ row }) => (
        <div className="mr-0 flex min-w-[150px] flex-[initial] shrink-[1.5] grow-1 flex-row items-center justify-between gap-0.75 overflow-hidden transition-[shrink] hover:max-w-[initial] hover:shrink-[0.3]">
          <div className="flex min-w-0 shrink-[initial] grow-1 basis-[initial] flex-row"></div>
          {row.labels.map((label) => (
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
      id: "createdAt",
      cell: ({ row }) => (
        <div className="flex shrink-0 items-center">
          <span className="shrink-0">
            {getContextualDate(new Date(row.createdAt), "en-US")}
          </span>
        </div>
      ),
    },
    {
      id: "assignedTo",
      cell: ({ row }) =>
        row.assignedTo ? (
          <Avatar className="size-5">
            <AvatarImage
              src={row.assignedTo.image}
              alt={row.assignedTo.username}
            />
            <AvatarFallback>
              {row.assignedTo.firstName[0] ?? ""}
              {row.assignedTo.lastName[0] ?? ""}
            </AvatarFallback>
          </Avatar>
        ) : (
          <CircleDashedIcon />
        ),
    },
  ];

  const [rowSelection, setRowSelection] = useState<string[]>([]);
  const isRowSelected = useCallback(
    (rowId: string) => rowSelection.includes(rowId),
    [rowSelection],
  );
  const onRowSelectionChange = useCallback(
    (rowId: string) =>
      setRowSelection((prev) => {
        if (prev.includes(rowId)) {
          return prev.filter((id) => id !== rowId);
        }

        return [...prev, rowId];
      }),
    [],
  );

  return (
    <>
      <Header>
        <h2 className="text-sm">Todo</h2>
      </Header>
      <div className="h-[calc(100svh-40px)] w-full overflow-auto lg:h-[calc(100svh-56px)]">
        <div className="h-full w-full">
          <TicketGroupDataList
            columns={columns}
            data={tickets}
            dataList={{
              rowSelection: rowSelection,
              isRowSelected: isRowSelected,
              onRowSelectionChange: onRowSelectionChange,
            }}
          />
        </div>
      </div>
    </>
  );
}
