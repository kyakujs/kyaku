export const TicketStatus = {
  Todo: 0,
  Snoozed: 1,
  Done: 2,
} as const;

export const TodoTicketStatusDetail = {
  NeedsFirstResponse: 0,
  Invetigating: 1,
  NeedNextResponse: 2,
  CloseTheLoop: 3,
} as const;

export const SnoozeTicketStatusDetail = {
  WaitingForCustomer: 4,
  PausedForLater: 5,
} as const;

export const DoneTicketStatusDetail = {
  Ignored: 6,
  DoneManuallySet: 7,
  DoneAutomaticallySet: 8,
} as const;

export const TicketStatusDetail = {
  ...TodoTicketStatusDetail,
  ...SnoozeTicketStatusDetail,
  ...DoneTicketStatusDetail,
} as const;

export const TicketPriority = {
  NoPriority: undefined,
  Urgent: 0,
  High: 1,
  Medium: 2,
  Low: 3,
} as const;

export const TimelineEntryType = {
  AssignmentChanged: "ASSIGNMENT_CHANGED",
  Chat: "CHAT",
  LabelsChanged: "LABELS_CHANGED",
  Note: "NOTE",
  PriorityChanged: "PRIORITY_CHANGED",
  StatusChanged: "STATUS_CHANGED",
} as const;

export type TicketAssignmentChanged = {
  oldAssignedToId: string | null;
  newAssignedToId: string | null;
};

export type TicketChat = {
  text: string;
};

export type TicketLabelsChanged = {
  oldLabelIds: string[];
  newLabelIds: string[];
};

export type TicketNote = {
  text: string;
  rawContent: string;
};

export type TicketPriorityChanged = {
  oldPriority: (typeof TicketPriority)[keyof typeof TicketPriority];
  newPriority: (typeof TicketPriority)[keyof typeof TicketPriority];
};

export type TicketStatusChanged = {
  oldStatus: (typeof TicketStatus)[keyof typeof TicketStatus];
  newStatus: (typeof TicketStatus)[keyof typeof TicketStatus];
};

export type TicketTimelineEntry =
  | TicketAssignmentChanged
  | TicketChat
  | TicketLabelsChanged
  | TicketNote
  | TicketPriorityChanged
  | TicketStatusChanged;
