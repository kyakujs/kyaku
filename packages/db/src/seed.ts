/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { faker } from "@faker-js/faker";
import { reset } from "drizzle-seed";

import { db } from "./client.js";
import * as schema from "./schema.js";

async function main() {
  await reset(db, schema);

  const users = await db
    .insert(schema.user)
    .values([
      {
        id: faker.string.uuid(),
        name: "Bot",
        email: "bot@example.com",
        emailVerified: true,
        role: "user",
        image: "https://api.dicebear.com/9.x/bottts/svg?seed=Kyakujs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: faker.string.uuid(),
        name: "Lindsay Walton",
        firstName: "Lindsay",
        lastName: "Walton",
        email: "lindsay.walton@example.com",
        emailVerified: true,
        role: "user",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: faker.string.uuid(),
        name: "Courtney Henry",
        firstName: "Courtney",
        lastName: "Henry",
        email: "courtney.henry@example.com",
        emailVerified: true,
        role: "user",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: faker.string.uuid(),
        name: "Tom Cook",
        firstName: "Tom",
        lastName: "Cook",
        email: "tom.cook@example.com",
        emailVerified: true,
        role: "user",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: faker.string.uuid(),
        name: "Whitney Francis",
        firstName: "Whitney",
        lastName: "Francis",
        email: "whitney.francis@example.com",
        emailVerified: true,
        role: "user",
        image:
          "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: faker.string.uuid(),
        name: "Leonard Krasner",
        firstName: "Leonard",
        lastName: "Krasner",
        email: "leonard.krasner@example.com",
        emailVerified: true,
        role: "user",
        image:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: faker.string.uuid(),
        name: "Floyd Miles",
        firstName: "Floyd",
        lastName: "Miles",
        email: "floyd.miles@example.com",
        emailVerified: true,
        role: "user",
        image:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .returning({ id: schema.user.id });

  const labels = await db
    .insert(schema.label)
    .values([
      {
        id: faker.string.uuid(),
        name: "Bug report",
        color: "#EB5757",
        createdAt: new Date(),
        createdById: users[0]?.id!,
        updatedAt: new Date(),
        updatedById: users[0]?.id,
      },
      {
        id: faker.string.uuid(),
        name: "Feature request",
        color: "#F2994A",
        createdAt: new Date(),
        createdById: users[0]?.id!,
        updatedAt: new Date(),
        updatedById: users[0]?.id,
      },
      {
        id: faker.string.uuid(),
        name: "General question",
        color: "#F2C94C",
        createdAt: new Date(),
        createdById: users[0]?.id!,
        updatedAt: new Date(),
        updatedById: users[0]?.id,
      },
      {
        id: faker.string.uuid(),
        name: "Payment declined",
        color: "#219653",
        createdAt: new Date(),
        createdById: users[0]?.id!,
        updatedAt: new Date(),
        updatedById: users[0]?.id,
      },
      {
        id: faker.string.uuid(),
        name: "Payment issue",
        color: "#2F80ED",
        createdAt: new Date(),
        createdById: users[0]?.id!,
        updatedAt: new Date(),
        updatedById: users[0]?.id,
      },
      {
        id: faker.string.uuid(),
        name: "Product feedback",
        color: "#56CCF2",
        createdAt: new Date(),
        createdById: users[0]?.id!,
        updatedAt: new Date(),
        updatedById: users[0]?.id,
      },
      {
        id: faker.string.uuid(),
        name: "Other",
        color: "#9B51E0",
        createdAt: new Date(),
        createdById: users[0]?.id!,
        updatedAt: new Date(),
        updatedById: users[0]?.id,
      },
      {
        id: faker.string.uuid(),
        name: "Technical issue",
        color: "#BB6BD9",
        createdAt: new Date(),
        createdById: users[0]?.id!,
        updatedAt: new Date(),
        updatedById: users[0]?.id,
      },
    ])
    .returning({ id: schema.label.id });

  const randomCustomers = faker.helpers.multiple(
    () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: "international" }),
      createdAt: new Date(),
      createdById: users[0]?.id!,
      updatedAt: new Date(),
      updatedById: users[0]?.id,
    }),
    {
      count: 1000,
    },
  );
  const customers = await db
    .insert(schema.customer)
    .values(randomCustomers)
    .returning({ id: schema.customer.id });

  const randomTickets = faker.helpers.multiple(
    () => {
      const status = faker.helpers.arrayElement([0, 1, 2]); // 0: Todo, 1: Snoozed, 2: Done
      const subStatusMapping = {
        0: [0, 1, 2, 3], // Todo
        1: [4, 5], // Snoozed
        2: [6, 7, 8], // Done
      } as const;
      const createdAt = faker.date.recent({ days: 90 });
      return {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        priority: faker.number.int({ min: 0, max: 3 }),
        status: status,
        statusDetail: faker.helpers.arrayElement(subStatusMapping[status]),
        customer: faker.helpers.arrayElement(customers).id,
        assignedToId: faker.helpers.arrayElement([
          ...users.map((user) => user.id),
          null,
        ]),
        labels: [faker.helpers.arrayElement(labels).id],
        createdAt: createdAt,
        createdById: users[0]?.id!,
        updatedAt: faker.date.recent({ refDate: createdAt }),
        updatedById: users[0]?.id,
        customerId: faker.helpers.arrayElement(customers).id,
      };
    },
    {
      count: 10000,
    },
  );

  const chunkSize = 5000;
  for (let i = 0; i < randomTickets.length; i += chunkSize) {
    const chunk = randomTickets.slice(i, i + chunkSize);

    const tickets = await db.insert(schema.ticket).values(chunk).returning({
      id: schema.ticket.id,
    });

    const ticketLabels = tickets.flatMap((ticket, index) =>
      chunk[index]!.labels.map((labelId) => ({
        ticketId: ticket.id,
        labelId: labelId,
        createdById: users[0]?.id!,
        updatedById: users[0]?.id,
      })),
    );

    await db.insert(schema.ticketLabel).values(ticketLabels);
  }
}

await main();
