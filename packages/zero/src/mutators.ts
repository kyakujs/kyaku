import { defineMutator, defineMutators } from "@rocicorp/zero";
import { ulid } from "ulid";
import z from "zod";

import type {
  TicketAssignmentChanged,
  TicketPriority,
  TicketPriorityChanged,
} from "@kyakujs/kyaku";
import { TimelineEntryType } from "@kyakujs/kyaku";

import { zql } from "./schema";

import "./auth";

export const mutators = defineMutators({
  ticket: {
    assign: defineMutator(
      z.object({ ticketId: z.string(), assigneeId: z.string() }),
      async ({ tx, ctx, args: { ticketId, assigneeId } }) => {
        if (!ctx) {
          throw new Error("Not authenticated");
        }
        const { userId } = ctx;
        const updateDate = Date.now();

        const ticket = await tx.run(zql.ticket.where("id", ticketId).one());

        if (!ticket) {
          throw new Error("Ticket not found");
        }

        const assignee = await tx.run(zql.user.where("id", assigneeId).one());

        if (!assignee) {
          throw new Error("Assignee not found");
        }

        await tx.mutate.ticket.update({
          id: ticketId,
          assignedToId: assigneeId,
          updatedAt: updateDate,
          updatedById: userId,
        });

        const entry: TicketAssignmentChanged = {
          oldAssignedToId: ticket.assignedToId,
          newAssignedToId: assigneeId,
        };
        await tx.mutate.ticketTimelineEntry.insert({
          id: ulid(),
          ticketId,
          type: TimelineEntryType.AssignmentChanged,
          entry: entry,
          customerId: ticket.customerId,
          createdAt: updateDate,
          userCreatedById: userId,
          updatedAt: updateDate,
          userUpdatedById: userId,
        });
      },
    ),
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
    unassign: defineMutator(
      z.object({ ticketId: z.string() }),
      async ({ tx, ctx, args: { ticketId } }) => {
        if (!ctx) {
          throw new Error("Not authenticated");
        }
        const { userId } = ctx;
        const updateDate = Date.now();

        const ticket = await tx.run(zql.ticket.where("id", ticketId).one());

        if (!ticket) {
          throw new Error("Ticket not found");
        }

        if (ticket.assignedToId === null) {
          throw new Error("Already unassigned");
        }

        await tx.mutate.ticket.update({
          id: ticketId,
          assignedToId: null,
          updatedAt: updateDate,
          updatedById: userId,
        });

        const entry: TicketAssignmentChanged = {
          oldAssignedToId: ticket.assignedToId,
          newAssignedToId: null,
        };
        await tx.mutate.ticketTimelineEntry.insert({
          id: ulid(),
          ticketId,
          type: TimelineEntryType.AssignmentChanged,
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
