import { defineQueries, defineQuery } from "@rocicorp/zero";
import z from "zod";

import { zql } from "@kyakujs/zero/schema";

import "./auth";

export const queries = defineQueries({
  ticket: defineQuery(
    z.object({
      ticketId: z.string(),
    }),
    ({ args: { ticketId } }) =>
      zql.ticket
        .related("assignedTo")
        .related("createdBy")
        .related("customer")
        .related("labels")
        .related("timelineEntries")
        .related("updatedBy")
        .where("id", ticketId)
        .one(),
  ),
  tickets: defineQuery(
    z.object({
      filters: z.object({
        assignees: z.array(z.string()).optional(),
        statuses: z.array(z.number()).optional(),
      }),
    }),
    ({ args: { filters } }) => {
      let q = zql.ticket;

      // eslint-disable-next-line @typescript-eslint/unbound-method
      q = q.where(({ and, cmp }) =>
        and(
          filters.statuses ? cmp("status", "IN", filters.statuses) : undefined,
          filters.assignees
            ? cmp("assignedToId", "IN", filters.assignees ?? [])
            : undefined,
        ),
      );
      return q
        .related("assignedTo")
        .related("customer")
        .related("labels")
        .orderBy("priority", "asc")
        .orderBy("createdAt", "asc");
    },
  ),
});
