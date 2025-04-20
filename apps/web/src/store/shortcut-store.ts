import { create } from "zustand";

export interface Shortcut {
  id: string;
  key: string;
  action: (e: KeyboardEvent) => void;
  enableOnContentEditable?: boolean;
  enableOnInteractiveElement?: boolean;
}

interface ShortcutState {
  shortcuts: Shortcut[];
  callback: (event: KeyboardEvent) => void;

  subscribe: () => void;
  unsubscribe: () => void;

  registerShortcut: (shortcut: Shortcut) => void;
  registerShortcuts: (shortcuts: Shortcut[]) => void;
  unregisterShortcut: (shortcutId: string) => void;
  unregisterShortcuts: (shortcutIds: string[]) => void;
}

const ignoreKeydownEvent = (
  event: KeyboardEvent,
  enableOnContentEditable?: boolean,
  enableOnInteractiveElement?: boolean,
) => {
  const target = (event.target ?? {}) as HTMLElement;

  if (target.isContentEditable && !enableOnContentEditable) {
    return true;
  }

  const ELEMENTS_TO_IGNORE = ["INPUT", "TEXTAREA"] as const;
  type ElementsToIgnore = (typeof ELEMENTS_TO_IGNORE)[number];

  if (
    ELEMENTS_TO_IGNORE.includes(target.nodeName as ElementsToIgnore) &&
    !enableOnInteractiveElement
  )
    return true;

  return false;
};

export const useShortcutStore = create<ShortcutState>((set, get) => ({
  shortcuts: [],
  callback: (event: KeyboardEvent) => {
    const { shortcuts } = get();
    const shortcut = shortcuts.find((s) => s.key === event.key.toLowerCase());
    if (
      shortcut &&
      !ignoreKeydownEvent(
        event,
        shortcut.enableOnContentEditable,
        shortcut.enableOnInteractiveElement,
      )
    ) {
      console.log(`Shortcut triggered: ${shortcut.id}`);
      shortcut.action(event);
    }
  },

  subscribe: () => {
    const { callback } = get();
    window.addEventListener("keydown", callback);
  },

  unsubscribe: () => {
    const { callback } = get();
    window.removeEventListener("keydown", callback);
  },

  registerShortcut: (shortcut) => {
    set((state) => ({
      shortcuts: [...state.shortcuts, shortcut],
    }));
  },

  registerShortcuts: (shortcuts) => {
    set((state) => ({
      shortcuts: [...state.shortcuts, ...shortcuts],
    }));
  },

  unregisterShortcut: (shortcutId) => {
    set((state) => ({
      shortcuts: state.shortcuts.filter((s) => s.id !== shortcutId),
    }));
  },

  unregisterShortcuts(shortcutIds) {
    set((state) => ({
      shortcuts: state.shortcuts.filter((s) => !shortcutIds.includes(s.id)),
    }));
  },
}));
