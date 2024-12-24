import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  username: text("username").unique(),
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
  phone: text("phone"),
  avatarUrl: text("avatarUrl"),
  language: text("language"),
  timezone: text("timezone"),
  ...lifecycleFields,
});

export const ticket = pgTable("ticket", {
  id: text("id").primaryKey().notNull(),
  title: text("title"),
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
