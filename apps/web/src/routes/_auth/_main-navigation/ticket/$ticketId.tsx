import { useQuery } from "@rocicorp/zero/react";
import { createFileRoute, useRouter } from "@tanstack/react-router";

import { Separator } from "@kyakujs/ui/separator";
import { SidebarTrigger } from "@kyakujs/ui/sidebar";
import { mutators } from "@kyakujs/zero/mutators";
import { queries } from "@kyakujs/zero/queries";

import AssigneeCombobox from "~/components/common/tickets/assignee-combobox";
import PriorityCombobox from "~/components/common/tickets/priority-combobox";
import SubStatusCombobox from "~/components/common/tickets/substatus-combobox";

export const Route = createFileRoute(
  "/_auth/_main-navigation/ticket/$ticketId",
)({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  const { ticketId } = Route.useParams();
  const { zero } = useRouter().options.context;
  const [ticket, { type }] = useQuery(queries.ticket({ ticketId: ticketId }));

  if (type === "unknown") {
    return null;
  }

  if (!ticket && type === "complete") {
    return <div>Ticket not found</div>;
  }

  if (!ticket) {
    return null;
  }

  return (
    <div className="flex w-full">
      <div className="flex grow flex-col">
        <header className="flex h-10 w-full items-center gap-2 border-b border-border px-4">
          <SidebarTrigger className="-ml-1 inline-flex group-has-[[data-state=collapsed]]/sidebar-wrapper:inline-flex lg:hidden [&_svg]:size-4 [&_svg]:shrink-0" />
          <Separator
            orientation="vertical"
            className="mr-2 block h-4 w-[1px] group-has-[[data-state=collapsed]]/sidebar-wrapper:block lg:hidden"
          />
          <h2 className="text-sm">TIC-{ticket.shortId}</h2>
        </header>
        <div className="flex h-full w-full">
          <div className="grow">
            <div className="m-auto max-w-[76ch]">
              {ticket.timelineEntries.map((entry) => (
                <div key={entry.id}>
                  <p>{entry.type}</p>
                  <p>{JSON.stringify(entry.entry)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-72 flex-col overflow-y-scroll border-l border-accent bg-sidebar p-6">
        <div className="mb-4">{ticket.title}</div>
        <div className="text-xs">{ticket.description}</div>
        <div className="flex flex-col">
          <AssigneeCombobox
            onValueChange={(value) => {
              if (value) {
                zero.mutate(
                  mutators.ticket.assign({
                    ticketId: ticket.id,
                    assigneeId: value,
                  }),
                );
              } else {
                zero.mutate(
                  mutators.ticket.unassign({
                    ticketId: ticket.id,
                  }),
                );
              }
            }}
            value={ticket.assignedToId}
          />
        </div>
        <div className="flex flex-col">
          <PriorityCombobox
            onValueChange={(value) => {
              if (!value) return;

              zero.mutate(
                mutators.ticket.setPriority({
                  ticketId: ticket.id,
                  priority: value,
                }),
              );
            }}
            value={ticket.priority}
          />
        </div>
        <div className="flex flex-col">
          <SubStatusCombobox
            onValueChange={(value) => console.log(value)}
            value={ticket.status}
          />
        </div>
      </div>
    </div>
  );
}
