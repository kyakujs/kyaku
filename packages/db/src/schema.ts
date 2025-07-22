import {
  boolean,
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
import { TimelineEntryType } from "@kyakujs/kyaku";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  username: text("username").unique(),
  displayUsername: text("displayUsername"),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("banReason"),
  banExpires: timestamp("banExpires"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  impersonatedBy: text("impersonatedBy"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export const jwks = pgTable("jwks", {
  id: text("id").primaryKey(),
  publicKey: text("publicKey").notNull(),
  privateKey: text("privateKey").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});

export const lifecycleFields = {
  createdAt: timestamp("createdAt", { precision: 3, mode: "date" })
    .defaultNow()
    .notNull(),
  createdById: varchar("createdById")
    .notNull()
    .references(() => user.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
  updatedById: varchar("updatedById").references(() => user.id, {
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
  createdBy: one(user, {
    fields: [customer.createdById],
    references: [user.id],
  }),
  updatedBy: one(user, {
    fields: [customer.updatedById],
    references: [user.id],
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
  createdBy: one(user, {
    fields: [label.createdById],
    references: [user.id],
  }),
  updatedBy: one(user, {
    fields: [label.updatedById],
    references: [user.id],
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
  createdBy: one(user, {
    fields: [ticketLabel.createdById],
    references: [user.id],
  }),
  updatedBy: one(user, {
    fields: [ticketLabel.updatedById],
    references: [user.id],
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
  userCreatedById: varchar("userCreatedById").references(() => user.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" }),
  customerUpdatedById: varchar("customerUpdatedById").references(
    () => customer.id,
    {
      onDelete: "restrict",
      onUpdate: "cascade",
    },
  ),
  userUpdatedById: varchar("userUpdatedById").references(() => user.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),
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
    userCreatedBy: one(user, {
      fields: [ticketTimelineEntry.userCreatedById],
      references: [user.id],
    }),
    customerUpdatedBy: one(user, {
      fields: [ticketTimelineEntry.customerUpdatedById],
      references: [user.id],
    }),
    userUpdatedBy: one(user, {
      fields: [ticketTimelineEntry.userUpdatedById],
      references: [user.id],
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
  statusChangedById: varchar("statusChangedById").references(() => user.id, {
    onDelete: "restrict",
    onUpdate: "cascade",
  }),
  assignedToId: varchar("assignedToId").references(() => user.id, {
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
  assignedTo: one(user, {
    fields: [ticket.assignedToId],
    references: [user.id],
  }),
  customer: one(customer, {
    fields: [ticket.customerId],
    references: [customer.id],
  }),
  createdBy: one(user, {
    fields: [ticket.createdById],
    references: [user.id],
  }),
  statusChangedBy: one(user, {
    fields: [ticket.statusChangedById],
    references: [user.id],
  }),
  updatedBy: one(user, {
    fields: [ticket.updatedById],
    references: [user.id],
  }),
  labels: many(label),
  timelineEntries: many(ticketTimelineEntry),
}));
