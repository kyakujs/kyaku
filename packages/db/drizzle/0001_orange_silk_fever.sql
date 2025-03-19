CREATE TABLE "label" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text,
	"archivedAt" timestamp,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"createdById" varchar NOT NULL,
	"updatedAt" timestamp (3),
	"updatedById" varchar
);
--> statement-breakpoint
CREATE TABLE "ticketLabel" (
	"ticketId" varchar NOT NULL,
	"labelId" varchar NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"createdById" varchar NOT NULL,
	"updatedAt" timestamp (3),
	"updatedById" varchar,
	CONSTRAINT "ticketLabel_ticketId_labelId_pk" PRIMARY KEY("ticketId","labelId")
);
--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "firstName" text;--> statement-breakpoint
ALTER TABLE "customer" ADD COLUMN "lastName" text;--> statement-breakpoint
ALTER TABLE "ticket" ADD COLUMN "shortId" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "ticket" ADD COLUMN "priority" integer;--> statement-breakpoint
ALTER TABLE "ticket" ADD COLUMN "status" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "ticket" ADD COLUMN "statusDetail" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "ticket" ADD COLUMN "statusChangedAt" timestamp (3);--> statement-breakpoint
ALTER TABLE "ticket" ADD COLUMN "statusChangedById" varchar;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "firstName" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "lastName" text;--> statement-breakpoint
ALTER TABLE "label" ADD CONSTRAINT "label_createdById_user_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "label" ADD CONSTRAINT "label_updatedById_user_id_fk" FOREIGN KEY ("updatedById") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ticketLabel" ADD CONSTRAINT "ticketLabel_ticketId_ticket_id_fk" FOREIGN KEY ("ticketId") REFERENCES "public"."ticket"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ticketLabel" ADD CONSTRAINT "ticketLabel_labelId_label_id_fk" FOREIGN KEY ("labelId") REFERENCES "public"."label"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ticketLabel" ADD CONSTRAINT "ticketLabel_createdById_user_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ticketLabel" ADD CONSTRAINT "ticketLabel_updatedById_user_id_fk" FOREIGN KEY ("updatedById") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_statusChangedById_user_id_fk" FOREIGN KEY ("statusChangedById") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_shortId_unique" UNIQUE("shortId");