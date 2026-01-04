import { ArrowDownWideNarrowIcon, ArrowUpNarrowWideIcon } from "lucide-react";

import { Button } from "@kyakujs/ui/button";
import { Popover, PopoverPopup, PopoverTrigger } from "@kyakujs/ui/popover";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@kyakujs/ui/select";
import { Separator } from "@kyakujs/ui/separator";

import {
  TICKET_ASSIGNEDTO_ACCESSOR_KEY,
  TICKET_CREATEDAT_ACCESSOR_KEY,
  TICKET_LABELS_ACCESSOR_KEY,
  TICKET_PRIORITY_ACCESSOR_KEY,
  TICKET_SHORTID_ACCESSOR_KEY,
  TICKET_STATUSDETAIL_ACCESSOR_KEY,
  TICKET_UPDATEDAT_ACCESSOR_KEY,
} from "~/components/common/tickets/ticket-list/ticket-list";
import { groupings, sortings, useIssuesStore } from "~/store/issues-store";

export function DisplayMenu() {
  const {
    columnVisibility,
    grouping,
    sortBy,
    sortDirection,
    setColumnVisibility,
    setGrouping,
    setSortBy,
    setSortDirection,
  } = useIssuesStore();

  const tableColumns = [
    {
      id: TICKET_SHORTID_ACCESSOR_KEY,
      label: "ID",
    },
    {
      id: TICKET_STATUSDETAIL_ACCESSOR_KEY,
      label: "Status",
    },
    {
      id: TICKET_ASSIGNEDTO_ACCESSOR_KEY,
      label: "Assignee",
    },
    {
      id: TICKET_PRIORITY_ACCESSOR_KEY,
      label: "Priority",
    },
    {
      id: TICKET_LABELS_ACCESSOR_KEY,
      label: "Labels",
    },
    {
      id: TICKET_CREATEDAT_ACCESSOR_KEY,
      label: "Created at",
    },
    {
      id: TICKET_UPDATEDAT_ACCESSOR_KEY,
      label: "Updated at",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger render={<Button size="sm" />}>Display</PopoverTrigger>
      <PopoverPopup align="end">
        <div className="flex w-75 flex-col gap-2">
          <div className="flex h-10 flex-initial items-center justify-between">
            <label htmlFor="grouping" className="min-w-20 text-sm">
              Grouping
            </label>
            <Select
              id="grouping"
              items={groupings}
              onValueChange={setGrouping}
              value={grouping}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                {groupings.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          </div>
          <div className="flex h-10 flex-initial items-center justify-between">
            <label htmlFor="ordering" className="min-w-20 text-sm">
              Ordering
            </label>
            <div className="flex items-center gap-1">
              <Select
                id="ordering"
                items={sortings}
                onValueChange={setSortBy}
                value={sortBy}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  {sortings.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectPopup>
              </Select>
              {sortDirection === "desc" ? (
                <Button size="icon" onClick={() => setSortDirection("asc")}>
                  <ArrowDownWideNarrowIcon />
                </Button>
              ) : (
                <Button size="icon" onClick={() => setSortDirection("desc")}>
                  <ArrowUpNarrowWideIcon />
                </Button>
              )}
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-1">
            <label htmlFor="ordering" className="min-w-20 text-sm">
              Display properties
            </label>
            <div className="flex flex-initial flex-wrap gap-1">
              {tableColumns.map((column) => (
                <Button
                  key={column.id}
                  size="xs"
                  variant="outline"
                  data-active={columnVisibility[column.id] !== false}
                  className="data-[active=true]:bg-sidebar-accent"
                  onClick={() =>
                    setColumnVisibility(column.id, !columnVisibility[column.id])
                  }
                >
                  {column.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverPopup>
    </Popover>
  );
}
