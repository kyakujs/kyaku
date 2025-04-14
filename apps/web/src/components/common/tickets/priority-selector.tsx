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
import {
  Popover,
  PopoverContent,
  PopoverPositioner,
  PopoverTrigger,
} from "@kyakujs/ui/popover";

import type { Priority } from "./priorities";
import { priorities } from "./priorities";

interface PrioritySelectorProps {
  priority: Priority;
  ticketId?: string;
}

export function PrioritySelector({
  priority,
  ticketId,
}: PrioritySelectorProps) {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(priority.id);

  useEffect(() => {
    setValue(priority.id);
  }, [priority.id]);

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
              <CommandInput placeholder="Set priority..." />
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
                      {value === item.id && (
                        <CheckIcon size={16} className="ml-auto" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {item.shortcut}
                      </span>
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
