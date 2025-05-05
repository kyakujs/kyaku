"use client";

import { useEffect, useId, useState } from "react";
import { CheckIcon } from "lucide-react";

import { Button } from "@kyakujs/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@kyakujs/ui/command";
import { Kbd } from "@kyakujs/ui/kbd";
import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@kyakujs/ui/popover";

import type { Priority } from "./priorities";
import type { Shortcut } from "~/store/shortcut-store";
import { useShortcutStore } from "~/store/shortcut-store";
import { priorities } from "./priorities";

interface PrioritySelectorProps {
  priority: Priority;
  ticketId?: string;
}

export function PrioritySelector({ priority }: PrioritySelectorProps) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [value, setValue] = useState<string>(priority.id);
  const {
    registerShortcut,
    registerShortcuts,
    unregisterShortcut,
    unregisterShortcuts,
  } = useShortcutStore();

  useEffect(() => {
    setValue(priority.id);
  }, [priority.id]);

  useEffect(() => {
    const priorityShortcut: Shortcut = {
      id: "priority",
      key: "p",
      action: (e: KeyboardEvent) => {
        if (!open) {
          e.preventDefault();
          setOpen((prev) => !prev);
        }
      },
      enableOnContentEditable: false,
      enableOnInteractiveElement: false,
    };

    registerShortcut(priorityShortcut);

    return () => {
      unregisterShortcut(priorityShortcut.id);
    };
  }, [open, registerShortcut, unregisterShortcut]);

  useEffect(() => {
    const priorityShortcuts: Shortcut[] = priorities.map((priority) => ({
      id: `priority-${priority.id}`,
      key: priority.shortcut,
      action: (e: KeyboardEvent) => {
        if (open && !searchValue) {
          e.preventDefault();
          setValue(priority.id);
          setOpen(false);
        }
      },
      enableOnContentEditable: true,
      enableOnInteractiveElement: true,
    }));

    if (open) {
      registerShortcuts(priorityShortcuts);
    }

    return () => {
      unregisterShortcuts(priorityShortcuts.map((s) => s.id));
    };
  }, [open, searchValue, registerShortcuts, unregisterShortcuts]);

  /*const handlePriorityChange = (priorityId: string) => {
    setValue(priorityId);
    setOpen(false);

    if (issueId) {
      const newPriority = priorities.find((p) => p.id === priorityId);
      if (newPriority) {
        updateIssuePriority(issueId, newPriority);
      }
    }
  };*/

  return (
    <div className="*:not-first:mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id={id}
              className="flex size-7 items-center justify-center"
              size="icon"
              variant="ghost"
              role="combobox"
              aria-expanded={open}
            >
              {(() => {
                const selectedItem = priorities.find(
                  (item) => item.id === value,
                );
                if (selectedItem) {
                  const Icon = selectedItem.icon;
                  return <Icon className="size-4 text-muted-foreground" />;
                }
                return null;
              })()}
            </Button>
          }
        ></PopoverTrigger>
        <PopoverPositioner align="start" side="inline-start" sideOffset={4}>
          <PopoverContent className="w-full min-w-(--radix-popper-anchor-width) border-input p-0">
            <Command>
              <CommandInput
                placeholder="Set priority..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandList>
                <CommandEmpty>No priority found.</CommandEmpty>
                <CommandGroup>
                  {priorities.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id}
                      //onSelect={handlePriorityChange}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="size-4 text-muted-foreground" />
                        {item.name}
                      </div>
                      {value === item.id ? (
                        <CheckIcon size={16} className="ml-auto" />
                      ) : null}
                      {!searchValue ? (
                        <Kbd shortcut={item.shortcut} className="min-w-2.5" />
                      ) : null}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
    </div>
  );
}
