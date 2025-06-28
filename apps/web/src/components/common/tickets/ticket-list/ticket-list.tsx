"use no memo";

import type { ColumnDef, TableState } from "@tanstack/react-table";
import { useEffect } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { Shortcut } from "~/store/shortcut-store";
import { TicketGroupVirtualList } from "~/components/common/tickets/ticket-list/ticket-group-virtual-list";
import { TicketListWrapper } from "~/components/common/tickets/ticket-list/ticket-list-wrapper";
import { useShortcutStore } from "~/store/shortcut-store";

export const NEXT_ITEM_SHORTCUT = "arrowdown";
export const PREVIOUS_ITEM_SHORTCUT = "arrowup";
const ROW_SELECTOR = "a[data-list-key^=ITEM]";

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
  const { registerShortcuts, unregisterShortcuts } = useShortcutStore();

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

  useEffect(() => {
    const previousItemShortcut: Shortcut = {
      id: "previous-item",
      key: PREVIOUS_ITEM_SHORTCUT,
      action: (e: KeyboardEvent) => {
        e.preventDefault();

        if (e.target instanceof Element) {
          const currentItem = e.target.closest(ROW_SELECTOR);
          if (!currentItem) {
            const firstItem = document.querySelector(ROW_SELECTOR);

            if (firstItem) (firstItem as HTMLAnchorElement).focus();
          } else {
            const previousItem = currentItem.previousElementSibling;

            if (previousItem && previousItem instanceof HTMLAnchorElement)
              previousItem.focus();
          }
        }
      },
      enableOnContentEditable: false,
      enableOnInteractiveElement: false,
    };

    const nextItemShortcut: Shortcut = {
      id: "next-item",
      key: NEXT_ITEM_SHORTCUT,
      action: (e: KeyboardEvent) => {
        e.preventDefault();

        if (e.target instanceof Element) {
          const currentItem = e.target.closest(ROW_SELECTOR);
          if (!currentItem) {
            const firstItem = document.querySelector(ROW_SELECTOR);

            if (firstItem) (firstItem as HTMLAnchorElement).focus();
          } else {
            const nextItem = currentItem.nextElementSibling;

            if (nextItem && nextItem instanceof HTMLAnchorElement) {
              const nextNextItem = nextItem.nextElementSibling;
              nextNextItem?.scrollIntoView({ block: "end", inline: "nearest" });
              nextItem.focus();
            }
          }
        }
      },
      enableOnContentEditable: false,
      enableOnInteractiveElement: false,
    };

    registerShortcuts([previousItemShortcut, nextItemShortcut]);

    return () =>
      unregisterShortcuts([previousItemShortcut.id, nextItemShortcut.id]);
  }, [registerShortcuts, unregisterShortcuts]);

  if (state?.grouping?.length) {
    return <TicketGroupVirtualList rows={table.getRowModel().rows} />;
  }

  return <TicketListWrapper rows={table.getRowModel().rows} />;
}
