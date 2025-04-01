CREATE TYPE "public"."ticketTimelineEntryType" AS ENUM('ASSIGNMENT_CHANGED', 'CHAT', 'LABELS_CHANGED', 'NOTE', 'PRIORITY_CHANGED', 'STATUS_CHANGED');--> statement-breakpoint
CREATE TABLE "ticketTimelineEntry" (
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "ticketTimelineEntryType" NOT NULL,
	"entry" json NOT NULL,
	"ticketId" varchar NOT NULL,
	"customerId" varchar NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"customerCreatedById" varchar,
	"userCreatedById" varchar,
	"updatedAt" timestamp (3),
	"customerUpdatedById" varchar,
	"userUpdatedById" varchar
);
--> statement-breakpoint
ALTER TABLE "ticketTimelineEntry" ADD CONSTRAINT "ticketTimelineEntry_ticketId_ticket_id_fk" FOREIGN KEY ("ticketId") REFERENCES "public"."ticket"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ticketTimelineEntry" ADD CONSTRAINT "ticketTimelineEntry_customerId_customer_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customer"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ticketTimelineEntry" ADD CONSTRAINT "ticketTimelineEntry_customerCreatedById_customer_id_fk" FOREIGN KEY ("customerCreatedById") REFERENCES "public"."customer"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ticketTimelineEntry" ADD CONSTRAINT "ticketTimelineEntry_userCreatedById_user_id_fk" FOREIGN KEY ("userCreatedById") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ticketTimelineEntry" ADD CONSTRAINT "ticketTimelineEntry_customerUpdatedById_customer_id_fk" FOREIGN KEY ("customerUpdatedById") REFERENCES "public"."customer"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ticketTimelineEntry" ADD CONSTRAINT "ticketTimelineEntry_userUpdatedById_user_id_fk" FOREIGN KEY ("userUpdatedById") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE cascade;