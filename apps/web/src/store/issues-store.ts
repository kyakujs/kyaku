import type {
  GroupingState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { create } from "zustand";

import {
  TICKET_ASSIGNEDTO_ACCESSOR_KEY,
  TICKET_CREATEDAT_ACCESSOR_KEY,
  TICKET_LABELS_ACCESSOR_KEY,
  TICKET_PRIORITY_ACCESSOR_KEY,
  TICKET_SHORTID_ACCESSOR_KEY,
  TICKET_STATUS_ACCESSOR_KEY,
  TICKET_STATUSDETAIL_ACCESSOR_KEY,
  TICKET_UPDATEDAT_ACCESSOR_KEY,
} from "~/components/common/tickets/ticket-list/ticket-list";

export const groupings = [
  { label: "No grouping", value: null },
  { label: "Status", value: "status" },
  { label: "Assignee", value: "assignee" },
  { label: "Priority", value: "priority" },
] as const;

type GroupingType = (typeof groupings)[number]["value"];

export const sortings = [
  { label: "Status", value: "status" },
  { label: "Assignee", value: "assignee" },
  { label: "Priority", value: "priority" },
] as const;

type SortingType = GroupingType;

export interface IssuesState {
  // State
  columnVisibility: VisibilityState;
  grouping: GroupingType;
  sortBy: SortingType;
  sortDirection: "asc" | "desc";

  // Actions
  setColumnVisibility: (column: string, visible: boolean) => void;
  setGrouping: (type: GroupingType) => void;
  setSortBy: (type: SortingType) => void;
  setSortDirection: (direction: "asc" | "desc") => void;
}

const mapGrouping = (type: GroupingType): GroupingState => {
  switch (type) {
    case "assignee":
      return [TICKET_ASSIGNEDTO_ACCESSOR_KEY];
    case "priority":
      return [TICKET_PRIORITY_ACCESSOR_KEY];
    case "status":
      return [TICKET_STATUSDETAIL_ACCESSOR_KEY];
    case null:
    default:
      return [];
  }
};

const mapSortBy = (
  type: SortingType,
  sortDirection: "asc" | "desc",
): SortingState => {
  switch (type) {
    case "assignee":
      return [
        {
          id: TICKET_ASSIGNEDTO_ACCESSOR_KEY,
          desc: sortDirection === "desc",
        },
      ];
    case "priority":
      return [
        {
          id: TICKET_PRIORITY_ACCESSOR_KEY,
          desc: sortDirection === "desc",
        },
      ];
    case "status":
      return [
        {
          id: TICKET_STATUSDETAIL_ACCESSOR_KEY,
          desc: sortDirection === "desc",
        },
      ];
    default:
      return [];
  }
};

export const useIssuesStore = create<IssuesState>((set) => ({
  // Initial state
  columnVisibility: {
    [TICKET_ASSIGNEDTO_ACCESSOR_KEY]: true,
    [TICKET_LABELS_ACCESSOR_KEY]: true,
    [TICKET_PRIORITY_ACCESSOR_KEY]: true,
    [TICKET_SHORTID_ACCESSOR_KEY]: true,
    [TICKET_STATUSDETAIL_ACCESSOR_KEY]: true,
    [TICKET_STATUS_ACCESSOR_KEY]: false,
    [TICKET_CREATEDAT_ACCESSOR_KEY]: true,
    [TICKET_UPDATEDAT_ACCESSOR_KEY]: false,
  },
  grouping: "status",
  sortBy: "priority",
  sortDirection: "asc",

  // Actions
  setColumnVisibility: (column, visible) => {
    set((state) => ({
      columnVisibility: {
        ...state.columnVisibility,
        [column]: visible,
      },
    }));
  },
  setGrouping: (type) => {
    set(() => ({
      grouping: type,
    }));
  },
  setSortBy: (type) => {
    set(() => ({
      sortBy: type,
    }));
  },
  setSortDirection: (direction) => {
    set(() => ({
      sortDirection: direction,
    }));
  },
}));

export const useIssuesTableGrouping = () => {
  const { grouping } = useIssuesStore();
  return mapGrouping(grouping);
};

export const useIssuesTableSorting = () => {
  const { grouping, sortBy, sortDirection } = useIssuesStore();

  return [...mapSortBy(grouping, "asc"), ...mapSortBy(sortBy, sortDirection)];
};
