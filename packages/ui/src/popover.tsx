import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui-components/react/popover";

import { cn } from "@kyakujs/ui";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverPositioner: React.FC<
  React.ComponentProps<typeof PopoverPrimitive.Positioner>
> = ({ align = "center", sideOffset = 4, ...props }) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner
      align={align}
      sideOffset={sideOffset}
      {...props}
    ></PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
);
PopoverPositioner.displayName = PopoverPrimitive.Positioner.displayName;

const PopoverContent: React.FC<
  React.ComponentProps<typeof PopoverPrimitive.Popup>
> = ({ className, ...props }) => (
  <PopoverPrimitive.Popup
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-[--radix-popover-content-transform-origin] rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
      className,
    )}
    {...props}
  />
);
PopoverContent.displayName = PopoverPrimitive.Popup.displayName;

export { Popover, PopoverTrigger, PopoverPositioner, PopoverContent };
