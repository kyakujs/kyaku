import { reset, seed } from "drizzle-seed";

import { db } from "./client";
import * as schema from "./schema";

async function main() {
  await reset(db, schema);

  const botUser = await db
    .insert(schema.user)
    .values({
      id: crypto.randomUUID(),
      name: "Bot",
      email: "bot@example.com",
      emailVerified: true,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning({ id: schema.user.id })
    .then((res) => res[0]);

  if (!botUser?.id) throw new Error("Could not create user");

  await seed(db, {
    customer: schema.customer,
    label: schema.label,
    ticket: schema.ticket,
    ticketLabel: schema.ticketLabel,
    user: schema.user,
  }).refine((f) => ({
    customer: {
      count: 10000,
      columns: {
        name: f.fullName(),
        firstName: f.firstName(),
        lastName: f.lastName(),
        email: f.email(),
        phone: f.phoneNumber({ template: "(###) ###-####" }),
        createdBy: botUser.id,
        updatedBy: botUser.id,
      },
    },
    label: {
      count: 8,
      columns: {
        name: f.valuesFromArray({
          values: [
            "Bug report",
            "Feature request",
            "General question",
            "Payment declined",
            "Payment issue",
            "Product feedback",
            "Other",
            "Technical issue",
          ],
        }),
        color: f.valuesFromArray({
          values: [
            "#EB5757",
            "#F2994A",
            "#F2C94C",
            "#219653",
            "#2F80ED",
            "#56CCF2",
            "#9B51E0",
            "#BB6BD9",
          ],
        }),
      },
    },
    ticket: {
      count: 1000,
      columns: {
        title: f.valuesFromArray({
          values: [
            "The sun set behind the mountains, painting the sky in hues of orange and purple",
            "I can't believe how good this homemade pizza turned out!",
            "Sometimes, all you need is a good book and a quiet corner.",
            "Who else thinks rainy days are perfect for binge-watching old movies?",
            "Tried a new hiking trail today and found the most amazing waterfall!",
          ],
        }),
        priority: f.valuesFromArray({
          values: [0, 1, 2, 3],
        }),
        note: f.valuesFromArray({
          values: ["a", "b"],
        }),
        status: f.valuesFromArray({
          values: [0, 1, 2],
        }),
        statusDetail: f.valuesFromArray({
          values: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        }),
        createdBy: botUser.id,
        updatedBy: botUser.id,
      },
    },
    user: {
      count: 10,
      columns: {
        name: f.fullName(),
        firstName: f.firstName(),
        lastName: f.lastName(),
        email: f.email(),
        role: f.default({ defaultValue: "user" }),
        image: f.valuesFromArray({
          values: [
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
          ],
        }),
      },
    },
  }));
}

await main();
