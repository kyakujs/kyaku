import { syncedQuery } from "@rocicorp/zero";
import z from "zod";

import { builder } from "@kyakujs/zero/schema";

export const queries = {
  ticket: syncedQuery("ticket", z.tuple([z.string()]), (ticketId: string) =>
    builder.ticket.related("timelineEntries").where("id", ticketId).one(),
  ),
  tickets: syncedQuery("tickets", z.tuple([]), () =>
    builder.ticket
      .where("status", 0) // Todo
      .related("assignedTo", (assignee) => assignee.one())
      .related("customer")
      .related("labels")
      .orderBy("priority", "asc")
      .orderBy("createdAt", "asc"),
  ),
};
