"use no memo";

import type { ColumnDef, TableState } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { TicketListFlat } from "~/components/common/tickets/ticket-list-flat";
import { TicketListGroup } from "~/components/common/tickets/ticket-list-group";

export interface Ticket {
  id: string;
  title: string;
  shortId: number;
  assignedTo: {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    username: string;
    image: string;
  } | null;
  priority: number;
  status: number;
  statusDetail: number;
  labels: {
    id: string;
    name: string;
    color: string;
  }[];
  createdAt: number;
}

export function TicketList({
  columns,
  data,
  state,
}: {
  columns: ColumnDef<Ticket>[];
  data: Ticket[];
  state: Partial<TableState> | undefined;
}) {
  const table = useReactTable({
    data,
    columns,
    state,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  if (state?.grouping?.length) {
    return <TicketListGroup rows={table.getRowModel().rows} />;
  }

  return <TicketListFlat rows={table.getRowModel().rows} />;
}
