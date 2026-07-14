import {
  integer,
  json,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";

import type { TicketTimelineEntry } from "@kyakujs/kyaku";
import * as authSchema from "@kyakujs/auth/schema";
import { TimelineEntryType } from "@kyakujs/kyaku";

export * from "@kyakujs/auth/schema";

export const lifecycleFields = {
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  createdById: varchar("createdById")
    .notNull()
    .references(() => authSchema.user.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
  updatedById: varchar("updatedById").references(() => authSchema.user.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),
};

export const customer = pgTable("customer", {
  id: varchar("id").primaryKey().notNull(),
  email: text("email"),
  name: text("name"),
  firstName: text("firstName"),
  lastName: text("lastName"),
  phone: text("phone"),
  avatarUrl: text("avatarUrl"),
  language: text("language"),
  timezone: text("timezone"),
  ...lifecycleFields,
});

export const customerRelations = relations(customer, ({ one }) => ({
  createdBy: one(authSchema.user, {
    fields: [customer.createdById],
    references: [authSchema.user.id],
  }),
  updatedBy: one(authSchema.user, {
    fields: [customer.updatedById],
    references: [authSchema.user.id],
  }),
}));

export const label = pgTable("label", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  color: text("color"),
  archivedAt: timestamp("archivedAt"),
  ...lifecycleFields,
});

export const labelRelations = relations(label, ({ one }) => ({
  createdBy: one(authSchema.user, {
    fields: [label.createdById],
    references: [authSchema.user.id],
  }),
  updatedBy: one(authSchema.user, {
    fields: [label.updatedById],
    references: [authSchema.user.id],
  }),
}));

export const ticketLabel = pgTable(
  "ticketLabel",
  {
    ticketId: varchar("ticketId")
      .notNull()
      .references(() => ticket.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    labelId: varchar("labelId")
      .notNull()
      .references(() => label.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    ...lifecycleFields,
  },
  (table) => {
    return [primaryKey({ columns: [table.ticketId, table.labelId] })];
  },
);

export const ticketLabelRelations = relations(ticketLabel, ({ one }) => ({
  ticket: one(ticket, {
    fields: [ticketLabel.ticketId],
    references: [ticket.id],
  }),
  label: one(label, {
    fields: [ticketLabel.labelId],
    references: [label.id],
  }),
  createdBy: one(authSchema.user, {
    fields: [ticketLabel.createdById],
    references: [authSchema.user.id],
  }),
  updatedBy: one(authSchema.user, {
    fields: [ticketLabel.updatedById],
    references: [authSchema.user.id],
  }),
}));

export const ticketTimelineEntryType = pgEnum("ticketTimelineEntryType", [
  TimelineEntryType.AssignmentChanged,
  TimelineEntryType.Chat,
  TimelineEntryType.LabelsChanged,
  TimelineEntryType.Note,
  TimelineEntryType.PriorityChanged,
  TimelineEntryType.StatusChanged,
]);

export const ticketTimelineEntry = pgTable("ticketTimelineEntry", {
  id: varchar("id").primaryKey().notNull(),
  type: ticketTimelineEntryType("type").notNull(),
  entry: json("entry").notNull().$type<TicketTimelineEntry>(),
  ticketId: varchar("ticketId")
    .notNull()
    .references(() => ticket.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  customerId: varchar("customerId")
    .notNull()
    .references(() => customer.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  customerCreatedById: varchar("customerCreatedById").references(
    () => customer.id,
    {
      onDelete: "restrict",
      onUpdate: "cascade",
    },
  ),
  userCreatedById: varchar("userCreatedById").references(
    () => authSchema.user.id,
    {
      onDelete: "restrict",
      onUpdate: "cascade",
    },
  ),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
  customerUpdatedById: varchar("customerUpdatedById").references(
    () => customer.id,
    {
      onDelete: "restrict",
      onUpdate: "cascade",
    },
  ),
  userUpdatedById: varchar("userUpdatedById").references(
    () => authSchema.user.id,
    {
      onDelete: "restrict",
      onUpdate: "cascade",
    },
  ),
});

export const ticketTimelineEntryRelations = relations(
  ticketTimelineEntry,
  ({ one }) => ({
    customer: one(customer, {
      fields: [ticketTimelineEntry.customerId],
      references: [customer.id],
    }),
    customerCreatedBy: one(customer, {
      fields: [ticketTimelineEntry.customerCreatedById],
      references: [customer.id],
    }),
    userCreatedBy: one(authSchema.user, {
      fields: [ticketTimelineEntry.userCreatedById],
      references: [authSchema.user.id],
    }),
    customerUpdatedBy: one(authSchema.user, {
      fields: [ticketTimelineEntry.customerUpdatedById],
      references: [authSchema.user.id],
    }),
    userUpdatedBy: one(authSchema.user, {
      fields: [ticketTimelineEntry.userUpdatedById],
      references: [authSchema.user.id],
    }),
    ticket: one(ticket, {
      fields: [ticketTimelineEntry.ticketId],
      references: [ticket.id],
    }),
  }),
);

export const ticket = pgTable("ticket", {
  id: text("id").primaryKey().notNull(),
  shortId: serial("shortId").unique(),
  title: text("title"),
  description: text("description"),
  priority: integer("priority"),
  status: integer("status").notNull().default(0),
  statusDetail: integer("statusDetail").default(0),
  statusChangedAt: timestamp("statusChangedAt", { precision: 3, mode: "date" }),
  statusChangedById: varchar("statusChangedById").references(
    () => authSchema.user.id,
    {
      onDelete: "restrict",
      onUpdate: "cascade",
    },
  ),
  assignedToId: varchar("assignedToId").references(() => authSchema.user.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),
  customerId: varchar("customerId")
    .notNull()
    .references(() => customer.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  ...lifecycleFields,
});

export const ticketRelations = relations(ticket, ({ one, many }) => ({
  assignedTo: one(authSchema.user, {
    fields: [ticket.assignedToId],
    references: [authSchema.user.id],
  }),
  customer: one(customer, {
    fields: [ticket.customerId],
    references: [customer.id],
  }),
  createdBy: one(authSchema.user, {
    fields: [ticket.createdById],
    references: [authSchema.user.id],
  }),
  statusChangedBy: one(authSchema.user, {
    fields: [ticket.statusChangedById],
    references: [authSchema.user.id],
  }),
  updatedBy: one(authSchema.user, {
    fields: [ticket.updatedById],
    references: [authSchema.user.id],
  }),
  labels: many(label),
  timelineEntries: many(ticketTimelineEntry),
}));
