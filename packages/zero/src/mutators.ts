import { defineMutator, defineMutators } from "@rocicorp/zero";
import { ulid } from "ulid";
import z from "zod";

import type { TicketPriority, TicketPriorityChanged } from "@kyakujs/kyaku";
import { TimelineEntryType } from "@kyakujs/kyaku";

import { zql } from "./schema";

import "./auth";

export const mutators = defineMutators({
  ticket: {
    setPriority: defineMutator(
      z.object({ ticketId: z.string(), priority: z.number() }),
      async ({ tx, ctx, args: { ticketId, priority } }) => {
        if (!ctx) {
          throw new Error("Not authenticated");
        }
        const { userId } = ctx;
        const updateDate = Date.now();

        const ticket = await tx.run(zql.ticket.where("id", ticketId).one());

        if (!ticket) {
          throw new Error("Ticket not found");
        }

        await tx.mutate.ticket.update({
          id: ticketId,
          priority,
          updatedAt: updateDate,
          updatedById: userId,
        });

        const entry: TicketPriorityChanged = {
          oldPriority:
            ticket.priority as (typeof TicketPriority)[keyof typeof TicketPriority],
          newPriority:
            priority as (typeof TicketPriority)[keyof typeof TicketPriority],
        };
        await tx.mutate.ticketTimelineEntry.insert({
          id: ulid(),
          ticketId,
          type: TimelineEntryType.PriorityChanged,
          entry: entry,
          customerId: ticket.customerId,
          createdAt: updateDate,
          userCreatedById: userId,
          updatedAt: updateDate,
          userUpdatedById: userId,
        });
      },
    ),
  },
});
