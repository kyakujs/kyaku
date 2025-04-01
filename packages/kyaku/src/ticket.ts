export enum TicketStatus {
  Done = "DONE",
  Snoozed = "SNOOZED",
  Todo = "TODO",
}

export enum DoneTicketStatusDetail {
  DoneAutomaticallySet = "DONE_AUTOMATICALLY_SET",
  DoneManuallySet = "DONE_MANUALLY_SET",
  Ignored = "IGNORED",
}

export enum SnoozeTicketStatusDetail {
  WaitingForCustomer = "WAITING_FOR_CUSTOMER",
  WaitingForDuration = "WAITING_FOR_DURATION",
}

export enum TodoTicketStatusDetail {
  CloseTheLoop = "CLOSE_THE_LOOP",
  Created = "CREATED",
  InProgress = "IN_PROGRESS",
  NewReply = "NEW_REPLY",
}

export type TicketStatusDetail =
  | DoneTicketStatusDetail
  | SnoozeTicketStatusDetail
  | TodoTicketStatusDetail;

export enum TicketPriority {
  Critical = "CRITICAL",
  High = "HIGH",
  Low = "LOW",
  Medium = "MEDIUM",
}

export enum TimelineEntryType {
  AssignmentChanged = "ASSIGNMENT_CHANGED",
  Chat = "CHAT",
  LabelsChanged = "LABELS_CHANGED",
  Note = "NOTE",
  PriorityChanged = "PRIORITY_CHANGED",
  StatusChanged = "STATUS_CHANGED",
}

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
  oldPriority: TicketPriority;
  newPriority: TicketPriority;
};

export type TicketStatusChanged = {
  oldStatus: TicketStatus;
  newStatus: TicketStatus;
};

export type TicketTimelineEntry =
  | TicketAssignmentChanged
  | TicketChat
  | TicketLabelsChanged
  | TicketNote
  | TicketPriorityChanged
  | TicketStatusChanged;
