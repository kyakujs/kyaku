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

const modKeyMapping = {
  control: "ctrlKey",
  shift: "shiftKey",
  alt: "altKey",
  meta: "metaKey",
} as const;

const convertKeyToArray = (key: string) => {
  const sanitizedKey = key.toLowerCase();

  // Modifier key combination
  if (sanitizedKey.includes("+")) {
    return sanitizedKey.split("+").map((k) => k.trim());
  }

  // Key sequence
  if (sanitizedKey.includes(" ")) {
    return sanitizedKey.split(" ").map((k) => k.trim());
  }

  return [sanitizedKey];
};

const mapModKeys = (keys: string[]) => {
  return keys.map((key) => modKeyMapping[key as keyof typeof modKeyMapping]);
};

const getEventModKeys = (event: KeyboardEvent) => {
  const modKeys: (typeof modKeyMapping)[keyof typeof modKeyMapping][] = [];

  if (event.altKey) modKeys.push("altKey");
  if (event.ctrlKey) modKeys.push("ctrlKey");
  if (event.metaKey) modKeys.push("metaKey");
  if (event.shiftKey) modKeys.push("shiftKey");

  return modKeys;
};

const isModKeyPressed = (event: KeyboardEvent) => {
  return event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
};

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

const areSetEqual = <T>(a: Set<T>, b: Set<T>) => {
  return a.size === b.size && a.isSubsetOf(b);
};

const isHotKeyCombination = (event: KeyboardEvent, hotKeys: string[]) => {
  const actionKey = hotKeys.at(-1);
  const hotKeyModKeys = hotKeys.slice(0, -1);

  const mappedHotKeyModKeys = new Set(mapModKeys(hotKeyModKeys));
  const eventModKeys = new Set(getEventModKeys(event));

  return (
    areSetEqual(mappedHotKeyModKeys, eventModKeys) &&
    event.key.toLowerCase() === actionKey
  );
};

export const useShortcutStore = create<ShortcutState>((set, get) => ({
  shortcuts: [],
  callback: (event: KeyboardEvent) => {
    const { shortcuts } = get();

    shortcuts.forEach((shortcut) => {
      const hotKeys = convertKeyToArray(shortcut.key);

      if (
        ignoreKeydownEvent(
          event,
          shortcut.enableOnContentEditable,
          shortcut.enableOnInteractiveElement,
        )
      ) {
        return;
      }

      if (isModKeyPressed(event)) {
        if (isHotKeyCombination(event, hotKeys)) {
          console.log(`Shortcut triggered: ${shortcut.id}`);
          shortcut.action(event);
        }

        return;
      }

      // TODO: handle key sequences

      if (event.key.toLowerCase() === hotKeys[0]) {
        console.log(`Shortcut triggered: ${shortcut.id}`);
        shortcut.action(event);
      }
    });
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
