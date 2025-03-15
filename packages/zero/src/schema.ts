import type { ExpressionBuilder, Row } from "@rocicorp/zero";
import {
  createSchema,
  definePermissions,
  NOBODY_CAN,
  relationships,
  string,
  table,
} from "@rocicorp/zero";

const customer = table("customer")
  .columns({
    id: string(),
    email: string(),
    name: string(),
    phone: string(),
    avatarUrl: string(),
    language: string(),
    timezone: string(),
  })
  .primaryKey("id");

const user = table("user")
  .columns({
    id: string(),
    name: string(),
  })
  .primaryKey("id");

const ticket = table("ticket")
  .columns({
    id: string(),
    title: string(),
    assignedToId: string(),
  })
  .primaryKey("id");

// Relationships
const ticketRelationships = relationships(ticket, ({ one }) => ({
  sender: one({
    sourceField: ["assignedToId"],
    destField: ["id"],
    destSchema: user,
  }),
}));

export const schema = createSchema({
  tables: [customer, ticket, user],
  relationships: [ticketRelationships],
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
