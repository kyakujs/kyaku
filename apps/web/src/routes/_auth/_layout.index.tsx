import { useQuery, useZero } from "@rocicorp/zero/react";
import { createFileRoute } from "@tanstack/react-router";

import type { Schema } from "@kyakujs/zero/schema";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@kyakujs/ui/sidebar";

import { AppSidebar } from "~/components/app-sidebar";

export const Route = createFileRoute("/_auth/_layout/")({
  component: Index,
});

function Index() {
  const z = useZero<Schema>();
  const [tickets] = useQuery(z.query.ticket);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        <div className="flex flex-1 flex-col gap-4 p-4">
          Hello world!
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.id}>{ticket.title}</li>
            ))}
          </ul>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
