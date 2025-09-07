"use no memo";

import type { ColumnDef, TableState } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { TicketGroupList } from "~/components/common/tickets/ticket-list/ticket-group-list";
import { TicketSimpleList } from "~/components/common/tickets/ticket-list/ticket-simple-list";

export interface Ticket {
  id: string;
  title: string;
  shortId: number;
  assignedTo: {
    id: string;
    name: string;
    firstName: string | undefined;
    lastName: string | undefined;
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
    return <TicketGroupList rows={table.getRowModel().rows} />;
  }

  return <TicketSimpleList rows={table.getRowModel().rows} />;
}
