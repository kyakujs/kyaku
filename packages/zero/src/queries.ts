import { syncedQuery } from "@rocicorp/zero";
import z from "zod";

import { builder } from "@kyakujs/zero/schema";

export const queries = {
  tickets: syncedQuery("tickets", z.tuple([]), () =>
    builder.ticket
      .where("status", 0)
      .related("assignedTo", (assignee) => assignee.one())
      .related("customer")
      .related("labels")
      .orderBy("priority", "asc")
      .orderBy("createdAt", "asc"),
  ),
};
