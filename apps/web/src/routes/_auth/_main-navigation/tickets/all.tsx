import { useQuery } from "@rocicorp/zero/react";
import { createFileRoute } from "@tanstack/react-router";

import { queries } from "@kyakujs/zero/queries";

import type { Ticket } from "~/components/common/tickets/ticket-list/ticket-list";
import { DisplayMenu } from "~/components/common/tickets/display-menu";
import {
  TICKET_ASSIGNEDTO_ACCESSOR_KEY,
  TICKET_CREATEDAT_ACCESSOR_KEY,
  TICKET_LABELS_ACCESSOR_KEY,
  TICKET_PRIORITY_ACCESSOR_KEY,
  TICKET_SELECT_ACCESSOR_KEY,
  TICKET_SHORTID_ACCESSOR_KEY,
  TICKET_STATUS_ACCESSOR_KEY,
  TICKET_STATUSDETAIL_ACCESSOR_KEY,
  TICKET_TITLE_ACCESSOR_KEY,
  TicketList,
} from "~/components/common/tickets/ticket-list/ticket-list";
import { Header } from "~/components/layout/headers/tickets/header";
import {
  useIssuesStore,
  useIssuesTableGrouping,
  useIssuesTableSorting,
} from "~/store/issues-store";

export const Route = createFileRoute("/_auth/_main-navigation/tickets/all")({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  const [data, { type }] = useQuery(
    queries.tickets({
      filters: {
        statuses: [0, 1, 2],
      },
    }),
  );

  const columnVisibility = useIssuesStore((state) => state.columnVisibility);
  const grouping = useIssuesTableGrouping();
  const sorting = useIssuesTableSorting();

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
    updatedAt: ticket.updatedAt,
  }));

  return (
    <div className="flex w-full flex-col">
      <Header>
        <div className="flex w-full items-center justify-between">
          <h2 className="text-sm">All tickets</h2>
          <DisplayMenu />
        </div>
      </Header>
      <div className="h-full w-full overflow-auto">
        {type === "complete" ? (
          <TicketList
            data={tickets}
            state={{
              columnFilters: [
                {
                  id: TICKET_STATUS_ACCESSOR_KEY,
                  value: [0, 1, 2],
                },
              ],
              columnOrder: [
                TICKET_SELECT_ACCESSOR_KEY,
                TICKET_PRIORITY_ACCESSOR_KEY,
                TICKET_SHORTID_ACCESSOR_KEY,
                TICKET_STATUSDETAIL_ACCESSOR_KEY,
                TICKET_TITLE_ACCESSOR_KEY,
                TICKET_LABELS_ACCESSOR_KEY,
                TICKET_ASSIGNEDTO_ACCESSOR_KEY,
                TICKET_CREATEDAT_ACCESSOR_KEY,
              ],
              columnVisibility: columnVisibility,
              grouping: grouping,
              sorting: sorting,
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
