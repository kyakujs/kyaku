import { useRef, useState } from "react";
import { useHotkey } from "@tanstack/react-hotkeys";
import { CheckIcon } from "lucide-react";

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

import type { SubStatus } from "~/store/substatus-store";
import { subStatuses } from "~/store/substatus-store";

const SUBSTATUS_SHORTCUT = "s";

function CustomCombobox(props: {
  items: SubStatus[];
  onValueChange: (value: SubStatus["id"] | undefined) => void;
  value: SubStatus["id"];
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  useHotkey({ key: SUBSTATUS_SHORTCUT }, () => {
    ref.current?.focus();
    setOpen(true);
  });

  return (
    <Combobox
      items={props.items}
      defaultValue={props.items.find((item) => item.id === props.value)}
      onValueChange={(subStatus) => props.onValueChange(subStatus?.id)}
      open={open}
      onOpenChange={setOpen}
      autoHighlight
    >
      <ComboboxTrigger>
        <ComboboxValue>
          {(subStatus: SubStatus) => (
            <div className="flex items-center gap-2">
              <subStatus.icon
                className="size-4"
                style={{ color: subStatus.color }}
              />
              <span>{subStatus.value}</span>
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
            aria-label="Select status"
            style={{ "--row-width": "15rem" } as React.CSSProperties}
          >
            <div className="grid w-(--row-width) grid-cols-[1fr_auto] gap-2 p-1 pr-3 pl-3.5 text-center">
              <ComboboxInput
                placeholder="Set status to..."
                className="col-start-1"
              />
              <span className="col-start-2 inline-flex items-center justify-center whitespace-nowrap">
                <kbd className="min-w-4.5 rounded-sm border border-input p-0.5 text-xs leading-[1.1] text-muted-foreground">
                  {SUBSTATUS_SHORTCUT.toUpperCase()}
                </kbd>
              </span>
            </div>
            <ComboboxSeparator />
            <ComboboxEmpty>No status found.</ComboboxEmpty>
            <ComboboxList className="max-h-[min(calc(24rem-var(--input-container-height)),calc(var(--available-height)-var(--input-container-height)))]">
              {(subStatus: SubStatus) => (
                <ComboboxItem
                  key={subStatus.value}
                  value={subStatus}
                  className="w-(--row-width)"
                >
                  <div>
                    <subStatus.icon
                      className="size-4 text-muted-foreground"
                      style={{ color: subStatus.color }}
                    />
                  </div>
                  <div className="flex flex-1">{subStatus.value}</div>
                  <ComboboxItemIndicator>
                    <CheckIcon className="size-4" />
                  </ComboboxItemIndicator>
                  <span className="text-mono inline-flex text-center text-xs whitespace-nowrap text-muted-foreground">
                    <kbd aria-hidden="true" className="min-w-2.5">
                      {subStatus.code}
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

export default function SubStatusCombobox({
  onValueChange,
  value,
}: {
  onValueChange: (value: SubStatus["id"] | undefined) => void;
  value: SubStatus["id"];
}) {
  return (
    <CustomCombobox
      items={subStatuses}
      onValueChange={onValueChange}
      value={value}
    />
  );
}
