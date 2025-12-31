import { useRef, useState } from "react";
import { CheckIcon } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@kyakujs/ui/combobox";

import type { Priority } from "~/store/priority-store";
import { priorities } from "~/store/priority-store";

const PRIORITY_SHORTCUT = "p";

function CustomCombobox(props: {
  items: Priority[];
  onValueChange: (value: Priority["id"]) => void;
  value: Priority["id"];
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  useHotkeys(PRIORITY_SHORTCUT, (event) => {
    event.preventDefault();
    ref.current?.focus();
    setOpen(true);
  });

  return (
    <Combobox
      items={props.items}
      defaultValue={props.items.find((item) => item.id === props.value)}
      onValueChange={(priority) => props.onValueChange(priority?.id)}
      open={open}
      onOpenChange={setOpen}
      autoHighlight
    >
      <ComboboxTrigger ref={ref}>
        <ComboboxValue>
          {(priority: Priority) => (
            <div className="flex items-center gap-2">
              <priority.icon
                className="size-4"
                style={{ color: priority.color }}
              />
              <span>{priority.value}</span>
            </div>
          )}
        </ComboboxValue>
      </ComboboxTrigger>
      <ComboboxPortal>
        <ComboboxPositioner
          align="start"
          side="left"
          sideOffset={4}
          disableAnchorTracking={true}
        >
          <ComboboxPopup
            className="max-h-[min(24rem,var(--available-height))] max-w-[15rem] origin-[var(--transform-origin)]"
            aria-label="Select priority"
            style={{ "--row-width": "15rem" } as React.CSSProperties}
          >
            <div className="grid w-(--row-width) grid-cols-[1fr_auto] gap-2 p-1 pr-3 pl-3.5 text-center">
              <ComboboxInput
                placeholder="Set priority to..."
                className="col-start-1"
              />
              <span className="col-start-2 inline-flex items-center justify-center whitespace-nowrap">
                <kbd className="min-w-4.5 rounded-sm border border-input p-0.5 text-xs leading-[1.1] text-muted-foreground">
                  {PRIORITY_SHORTCUT.toUpperCase()}
                </kbd>
              </span>
            </div>
            <ComboboxSeparator />
            <ComboboxEmpty>No priority found.</ComboboxEmpty>
            <ComboboxList className="max-h-[min(calc(24rem-var(--input-container-height)),calc(var(--available-height)-var(--input-container-height)))]">
              {(priority: Priority) => (
                <ComboboxItem
                  key={priority.value}
                  value={priority}
                  className="w-(--row-width)"
                >
                  <div>
                    <priority.icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="flex flex-1">{priority.value}</div>
                  <ComboboxItemIndicator>
                    <CheckIcon className="size-4" />
                  </ComboboxItemIndicator>
                  <span className="text-mono inline-flex text-center text-xs whitespace-nowrap text-muted-foreground">
                    <kbd aria-hidden="true" className="min-w-2.5">
                      {priority.code}
                    </kbd>
                  </span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  );
}

export default function PriorityCombobox({
  onValueChange,
  value,
}: {
  onValueChange: (value: Priority["id"]) => void;
  value: Priority["id"];
}) {
  return (
    <CustomCombobox
      items={priorities}
      onValueChange={onValueChange}
      value={value}
    />
  );
}
