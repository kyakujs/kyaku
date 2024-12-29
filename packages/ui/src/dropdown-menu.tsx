import * as React from "react";
import { Menu as DropdownMenuPrimitive } from "@base-ui-components/react/menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "@kyakujs/ui";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

// TODO: fix TS4023
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup as unknown;

const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubmenuTrigger> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.SubmenuTrigger
    ref={ref}
    className={cn(
      "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto" />
  </DropdownMenuPrimitive.SubmenuTrigger>
);
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubmenuTrigger.displayName;

const DropdownMenuSubContent = ({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Positioner>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Positioner
      ref={ref}
      className="outline-none"
      {...props}
    >
      <DropdownMenuPrimitive.Popup
        className={cn(
          "origin-(--transform-origin) rounded-md bg-popover p-1 text-popover-foreground shadow-lg outline-1 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
          className,
        )}
      >
        {children}
      </DropdownMenuPrimitive.Popup>
    </DropdownMenuPrimitive.Positioner>
  </DropdownMenuPrimitive.Portal>
);
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.Positioner.displayName;

const DropdownMenuContent = ({
  className,
  children,
  sideOffset = 4,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Positioner>) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Backdrop />
    <DropdownMenuPrimitive.Positioner
      ref={ref}
      sideOffset={sideOffset}
      className="outline-none"
      {...props}
    >
      <DropdownMenuPrimitive.Popup
        className={cn(
          "origin-(--transform-origin) rounded-md bg-popover p-1 text-popover-foreground shadow-lg outline-1 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300",
          className,
        )}
      >
        {children}
      </DropdownMenuPrimitive.Popup>
    </DropdownMenuPrimitive.Positioner>
  </DropdownMenuPrimitive.Portal>
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Positioner.displayName;

const DropdownMenuItem = ({
  className,
  inset,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitive.CheckboxItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </DropdownMenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = ({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitive.RadioItemIndicator>
        <CircleIcon className="size-2 fill-current" />
      </DropdownMenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuGroupLabel = ({
  className,
  inset,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.GroupLabel> & {
  inset?: boolean;
}) => (
  <DropdownMenuPrimitive.GroupLabel
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
);
DropdownMenuGroupLabel.displayName =
  DropdownMenuPrimitive.GroupLabel.displayName;

const DropdownMenuSeparator = ({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
