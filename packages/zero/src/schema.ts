import type { ExpressionBuilder, Row, TableSchema } from "@rocicorp/zero";
import {
  createSchema,
  createTableSchema,
  definePermissions,
  NOBODY_CAN,
} from "@rocicorp/zero";

const customerSchema = createTableSchema({
  tableName: "customer",
  columns: {
    id: "string",
    email: "string",
    name: "string",
    phone: "string",
    avatarUrl: "string",
    language: "string",
    timezone: "string",
  },
  primaryKey: "id",
});

const userSchema = createTableSchema({
  tableName: "user",
  columns: {
    id: "string",
    name: "string",
  },
  primaryKey: "id",
});

const ticketSchema = createTableSchema({
  tableName: "ticket",
  columns: {
    id: "string",
    title: "string",
    assignedToId: "string",
  },
  relationships: {
    sender: {
      sourceField: "assignedToId",
      destSchema: userSchema,
      destField: "id",
    },
  },
  primaryKey: "id",
});

export const schema = createSchema({
  version: 1,
  tables: {
    customer: customerSchema,
    ticket: ticketSchema,
    user: userSchema,
  },
});

export type Schema = typeof schema;
export type Customer = Row<typeof customerSchema>;
export type Ticket = Row<typeof ticketSchema>;
export type User = Row<typeof schema.tables.user>;

// The contents of your decoded JWT.
interface AuthData {
  sub: string | null;
}

export const permissions: ReturnType<typeof definePermissions> =
  definePermissions<AuthData, Schema>(schema, () => {
    const allowIfLoggedIn = (
      authData: AuthData,
      eb: ExpressionBuilder<TableSchema>,
    ) => eb.cmpLit(authData.sub, "IS NOT", null);

    return {
      customer: {
        row: {
          insert: [allowIfLoggedIn],
          update: {
            preMutation: [allowIfLoggedIn],
          },
          delete: NOBODY_CAN,
        },
      },
      ticket: {
        row: {
          insert: [allowIfLoggedIn],
          update: {
            preMutation: [allowIfLoggedIn],
          },
          delete: NOBODY_CAN,
        },
      },
      user: {
        row: {
          insert: NOBODY_CAN,
          update: {
            preMutation: NOBODY_CAN,
          },
          delete: NOBODY_CAN,
        },
      },
    };
  });
