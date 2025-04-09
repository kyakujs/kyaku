import type { ExpressionBuilder, Row } from "@rocicorp/zero";
import {
  createSchema,
  definePermissions,
  enumeration,
  json,
  NOBODY_CAN,
  number,
  relationships,
  string,
  table,
} from "@rocicorp/zero";

import type { TicketTimelineEntry, TimelineEntryType } from "@kyakujs/kyaku";

// Status : 0 = Todo, 1 = Snoozed, 2 = Done
// Status detail : 0 = Created (Needs first response), 1 = In progress (Investigating), 2 = New reply (Needs next response)
//                 3 = Waiting for customer, 4 = Waiting for duration
//                 5 = Ignored, 6 = Done manually set, 7 = Done automatically set

const customer = table("customer")
  .columns({
    id: string(),
    email: string(),
    name: string(),
    phone: string(),
    avatarUrl: string(),
    language: string(),
    timezone: string(),
    createdById: string(),
    updatedById: string(),
  })
  .primaryKey("id");

const user = table("user")
  .columns({
    id: string(),
    name: string(),
    firstName: string(),
    lastName: string(),
    image: string(),
    username: string(),
  })
  .primaryKey("id");

const label = table("label")
  .columns({
    id: string(),
    name: string(),
    color: string(),
    createdById: string(),
    updatedById: string(),
  })
  .primaryKey("id");

const ticketLabel = table("ticketLabel")
  .columns({
    ticketId: string(),
    labelId: string(),
    createdById: string(),
    updatedById: string(),
  })
  .primaryKey("ticketId", "labelId");

const ticket = table("ticket")
  .columns({
    id: string(),
    shortId: number(),
    title: string(),
    description: string(),
    priority: number(),
    status: number(),
    customerId: string(),
    statusDetail: number(),
    assignedToId: string(),
    createdById: string(),
    createdAt: number(),
    updatedById: string(),
    updatedAt: number(),
  })
  .primaryKey("id");

const ticketTimelineEntry = table("ticketTimelineEntry")
  .columns({
    id: string(),
    ticketId: string(),
    type: enumeration<TimelineEntryType>(),
    entry: json<TicketTimelineEntry>(),
  })
  .primaryKey("id");

// Relationships
export const customerRelationships = relationships(customer, ({ one }) => ({
  createdBy: one({
    sourceField: ["createdById"],
    destField: ["id"],
    destSchema: user,
  }),
  updatedBy: one({
    sourceField: ["updatedById"],
    destField: ["id"],
    destSchema: user,
  }),
}));

export const labelRelationships = relationships(label, ({ one }) => ({
  createdBy: one({
    sourceField: ["createdById"],
    destField: ["id"],
    destSchema: user,
  }),
  updatedBy: one({
    sourceField: ["updatedById"],
    destField: ["id"],
    destSchema: user,
  }),
}));

export const ticketLabelRelationships = relationships(
  ticketLabel,
  ({ one }) => ({
    ticket: one({
      sourceField: ["ticketId"],
      destField: ["id"],
      destSchema: ticket,
    }),
    label: one({
      sourceField: ["labelId"],
      destField: ["id"],
      destSchema: label,
    }),
    createdBy: one({
      sourceField: ["createdById"],
      destField: ["id"],
      destSchema: user,
    }),
    updatedBy: one({
      sourceField: ["updatedById"],
      destField: ["id"],
      destSchema: user,
    }),
  }),
);

const ticketRelationships = relationships(ticket, ({ many, one }) => ({
  assignedTo: one({
    sourceField: ["assignedToId"],
    destField: ["id"],
    destSchema: user,
  }),
  customer: one({
    sourceField: ["customerId"],
    destField: ["id"],
    destSchema: customer,
  }),
  labels: many(
    {
      sourceField: ["id"],
      destField: ["ticketId"],
      destSchema: ticketLabel,
    },
    {
      sourceField: ["labelId"],
      destField: ["id"],
      destSchema: label,
    },
  ),
  timelineEntries: many({
    sourceField: ["id"],
    destField: ["ticketId"],
    destSchema: ticketTimelineEntry,
  }),
}));

const ticketTimelineEntryRelationships = relationships(
  ticketTimelineEntry,
  ({ one }) => ({
    ticket: one({
      sourceField: ["ticketId"],
      destField: ["id"],
      destSchema: ticket,
    }),
  }),
);

export const schema = createSchema({
  tables: [customer, label, ticket, ticketLabel, ticketTimelineEntry, user],
  relationships: [
    customerRelationships,
    labelRelationships,
    ticketLabelRelationships,
    ticketRelationships,
    ticketTimelineEntryRelationships,
  ],
});

export type Schema = typeof schema;
type TableName = keyof Schema["tables"];

export type Customer = Row<typeof schema.tables.customer>;
export type Ticket = Row<typeof schema.tables.ticket>;
export type User = Row<typeof schema.tables.user>;

// The contents of your decoded JWT.
interface AuthData {
  sub: string | null;
}

export const permissions: ReturnType<typeof definePermissions> =
  definePermissions<AuthData, Schema>(schema, () => {
    const allowIfLoggedIn = (
      authData: AuthData,
      eb: ExpressionBuilder<Schema, TableName>,
    ) => eb.cmpLit(authData.sub, "IS NOT", null);

    return {
      customer: {
        row: {
          select: [allowIfLoggedIn],
          insert: [allowIfLoggedIn],
          update: {
            postMutation: [allowIfLoggedIn],
            preMutation: [allowIfLoggedIn],
          },
          delete: NOBODY_CAN,
        },
      },
      ticket: {
        row: {
          select: [allowIfLoggedIn],
          insert: [allowIfLoggedIn],
          update: {
            postMutation: [allowIfLoggedIn],
            preMutation: [allowIfLoggedIn],
          },
          delete: NOBODY_CAN,
        },
      },
      ticketTimelineEntry: {
        row: {
          select: [allowIfLoggedIn],
          insert: [allowIfLoggedIn],
          update: {
            postMutation: [allowIfLoggedIn],
            preMutation: [allowIfLoggedIn],
          },
          delete: NOBODY_CAN,
        },
      },
      user: {
        row: {
          select: [allowIfLoggedIn],
          insert: NOBODY_CAN,
          update: {
            postMutation: NOBODY_CAN,
            preMutation: NOBODY_CAN,
          },
          delete: NOBODY_CAN,
        },
      },
    };
  });
