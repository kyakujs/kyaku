import type { Row } from "@rocicorp/zero";
import {
  createBuilder,
  createSchema,
  enumeration,
  json,
  number,
  relationships,
  string,
  table,
} from "@rocicorp/zero";

import type { TicketTimelineEntry, TimelineEntryType } from "@kyakujs/kyaku";

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
    type: enumeration<
      (typeof TimelineEntryType)[keyof typeof TimelineEntryType]
    >(),
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
  createdBy: one({
    sourceField: ["createdById"],
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
  updatedBy: one({
    sourceField: ["updatedById"],
    destField: ["id"],
    destSchema: user,
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
  enableLegacyMutators: false,
  enableLegacyQueries: false,
});

export type Schema = typeof schema;

export type Customer = Row<typeof schema.tables.customer>;
export type Ticket = Row<typeof schema.tables.ticket>;
export type User = Row<typeof schema.tables.user>;

/**
 * Represents the ZQL query builder.
 * This type is auto-generated from your Drizzle schema definition.
 */
export const zql = createBuilder(schema);

/** Defines the default types for Zero */
declare module "@rocicorp/zero" {
  interface DefaultTypes {
    schema: Schema;
  }
}
