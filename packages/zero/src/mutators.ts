import { defineMutator, defineMutators } from "@rocicorp/zero";
import z from "zod";

export const mutators = defineMutators({
  ticket: {
    setPriority: defineMutator(
      z.object({ ticketId: z.string(), priority: z.number() }),
      async ({ tx, ctx, args: { ticketId, priority } }) => {
        if (!ctx) {
          throw new Error("Not authenticated");
        }
        const { userId } = ctx;
        await tx.mutate.ticket.update({
          id: ticketId,
          priority,
          updatedAt: Date.now(),
          updatedById: userId,
        });
      },
    ),
  },
});
