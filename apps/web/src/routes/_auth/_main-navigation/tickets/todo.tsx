import { useQuery } from "@rocicorp/zero/react";
import { createFileRoute } from "@tanstack/react-router";

import { queries } from "@kyakujs/zero/queries";

import type { Ticket } from "~/components/common/tickets/ticket-list/ticket-list";
import { TicketList } from "~/components/common/tickets/ticket-list/ticket-list";
import { Header } from "~/components/layout/headers/tickets/header";

export const Route = createFileRoute("/_auth/_main-navigation/tickets/todo")({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  const [data, { type }] = useQuery(queries.tickets());

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

  return (
    <div className="flex w-full flex-col">
      <Header>
        <h2 className="text-sm">Todo</h2>
      </Header>
      <div className="h-full w-full overflow-auto">
        {type === "complete" ? (
          <TicketList
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
