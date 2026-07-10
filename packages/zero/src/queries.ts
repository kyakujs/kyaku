import type { Condition } from "@rocicorp/zero";
import { defineQueries, defineQuery } from "@rocicorp/zero";
import z from "zod";

import { zql } from "@kyakujs/zero/schema";

import "./auth";

export const queries = defineQueries({
  users: defineQuery(z.object(), () => zql.user.orderBy("username", "asc")),
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
        assignees: z.array(z.string().or(z.null())).optional(),
        statuses: z.array(z.number()).optional(),
      }),
    }),
    ({ args: { filters } }) => {
      let q = zql.ticket;

      // eslint-disable-next-line @typescript-eslint/unbound-method
      q = q.where(({ and, or, cmp }) => {
        let assigneeCondition: Condition | undefined = undefined;
        if (filters.assignees) {
          const nonNullAssignees = filters.assignees.filter(
            (assignee) => assignee !== null,
          );
          const nullAssigneeIncluded = filters.assignees.includes(null);

          if (nonNullAssignees.length > 0 && nullAssigneeIncluded) {
            assigneeCondition = or(
              cmp("assignedToId", "IN", nonNullAssignees),
              cmp("assignedToId", "IS", null),
            );
          } else if (nonNullAssignees.length > 0) {
            assigneeCondition = cmp("assignedToId", "IN", nonNullAssignees);
          } else if (nullAssigneeIncluded) {
            assigneeCondition = cmp("assignedToId", "IS", null);
          }
        }
        const statusCondition = filters.statuses
          ? cmp("status", "IN", filters.statuses)
          : undefined;

        return and(assigneeCondition, statusCondition);
      });
      return q
        .related("assignedTo")
        .related("customer")
        .related("labels")
        .orderBy("priority", "asc")
        .orderBy("createdAt", "asc");
    },
  ),
});
