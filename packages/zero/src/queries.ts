import { syncedQuery } from "@rocicorp/zero";
import z from "zod";

import { builder } from "@kyakujs/zero/schema";

export const queries = {
  ticket: syncedQuery("ticket", z.tuple([z.string()]), (ticketId: string) =>
    builder.ticket.related("timelineEntries").where("id", ticketId).one(),
  ),
  tickets: syncedQuery("tickets", z.tuple([z.object({
    filters: z.object({
      assignees: z.array(z.string()).optional(),
      statuses: z.array(z.number()).optional(),
    })
  })]), ({ filters }) => {
    let q = builder.ticket;
    q = q.where(({and, cmp }) => and(
      filters.statuses ? cmp('status', 'IN', filters.statuses): undefined,
       filters.assignees ?
          cmp('assignedToId', 'IN', filters.assignees ?? []) : undefined
        )
      );
    return q
      .related("assignedTo", (assignee) => assignee.one())
      .related("customer")
      .related("labels")
      .orderBy("priority", "asc")
      .orderBy("createdAt", "asc");
  }),
};
