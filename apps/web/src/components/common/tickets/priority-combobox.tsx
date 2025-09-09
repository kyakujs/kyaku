"use client";

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

import type { Priority } from "~/store/priority-store";
import { priorities } from "~/store/priority-store";

function CustomCombobox(props: {
  items: Priority[];
  value: number | undefined;
}) {
  return (
    <Combobox
      items={props.items}
      defaultValue={props.items.find((item) => item.id === props.value)}
      onValueChange={(value) => {
        console.log(value);
      }}
    >
      <ComboboxTrigger className="h-8 cursor-default items-center justify-between rounded-lg border border-gray-200 bg-[canvas] bg-clip-padding px-3 text-sm text-gray-900 select-none hover:bg-gray-50 focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-blue-800 data-[popup-open]:bg-gray-50">
        <ComboboxValue>
          {(priority: Priority) => (
            <div className="flex items-center gap-2">
              <priority.icon className="size-4 text-muted-foreground" />
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
          trackAnchor={false}
        >
          <ComboboxPopup
            className="max-h-[min(24rem,var(--available-height))] max-w-[15rem] origin-[var(--transform-origin)] rounded-lg bg-[canvas] bg-clip-padding text-gray-900 shadow-[0_1px_2px_rgba(0,0,0,.025),_0_1px_3px_rgba(0,0,0,.025)] shadow-gray-200 outline-1 outline-gray-200 transition-[transform,scale,opacity] [--input-container-height:3rem] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300"
            aria-label="Select priority"
          >
            <div className="grid w-60 grid-cols-[1fr_auto] gap-2 p-1 pr-3 pl-3.5 text-center">
              <ComboboxInput
                placeholder="Set priority to..."
                className="col-start-1 h-8 w-full text-sm font-normal text-gray-900 outline-none"
              />
              <span className="col-start-2 inline-flex items-center justify-center whitespace-nowrap">
                <kbd className="min-w-4.5 rounded-md border border-gray-300 p-0.5 text-xs leading-[1.1] text-gray-800">
                  P
                </kbd>
              </span>
            </div>
            <ComboboxSeparator className="border-t border-gray-200" />
            <ComboboxEmpty className="p-4 text-[0.925rem] leading-4 text-gray-600 empty:m-0 empty:p-0">
              No priority found.
            </ComboboxEmpty>
            <ComboboxList className="max-h-[min(calc(24rem-var(--input-container-height)),calc(var(--available-height)-var(--input-container-height)))] scroll-py-2 overflow-y-auto overscroll-contain py-2 empty:p-0">
              {(priority: Priority) => (
                <ComboboxItem
                  key={priority.value}
                  value={priority}
                  className="inline-flex min-w-[var(--anchor-width)] cursor-default items-center gap-2 py-2 pr-3 pl-3.5 text-sm leading-4 outline-none select-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-800 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-100"
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
  priority,
}: {
  priority: number | undefined;
}) {
  return <CustomCombobox items={priorities} value={priority} />;
}
