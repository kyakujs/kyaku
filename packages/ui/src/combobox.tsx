import { Combobox as ComboboxPrimitive } from "@base-ui/react";

import { cn } from "@kyakujs/ui";

function Combobox<ItemValue, Multiple extends boolean | undefined = false>(
  props: React.ComponentProps<
    typeof ComboboxPrimitive.Root<ItemValue, Multiple>
  >,
) {
  return <ComboboxPrimitive.Root data-slot="combobox" {...props} />;
}

function ComboboxValue({
  children,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Value>) {
  return (
    <ComboboxPrimitive.Value data-slot="combobox-value" {...props}>
      {children}
    </ComboboxPrimitive.Value>
  );
}

function ComboboxTrigger({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Trigger>) {
  return (
    <ComboboxPrimitive.Trigger
      className={cn(
        className,
        "inline-flex h-8 cursor-default items-center justify-between rounded-md bg-transparent px-3 text-sm text-foreground select-none hover:bg-sidebar-accent focus-visible:outline-sidebar-ring data-popup-open:bg-input/50 dark:bg-input/30 dark:hover:bg-input/50",
      )}
      data-slot="combobox-trigger"
      {...props}
    >
      {children}
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxPortal({
  children,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Portal>) {
  return (
    <ComboboxPrimitive.Portal data-slot="combobox-portal" {...props}>
      {children}
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxPositioner({
  children,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Positioner>) {
  return (
    <ComboboxPrimitive.Positioner data-slot="combobox-positioner" {...props}>
      {children}
    </ComboboxPrimitive.Positioner>
  );
}

function ComboboxPopup({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Popup>) {
  return (
    <ComboboxPrimitive.Popup
      className={cn(
        className,
        "rounded-md bg-popover text-foreground shadow-lg outline-1 outline-input transition-[transform,scale,opacity] [--input-container-height:3rem] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
      )}
      data-slot="combobox-popup"
      {...props}
    >
      {children}
    </ComboboxPrimitive.Popup>
  );
}

function ComboboxInput({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Input>) {
  return (
    <ComboboxPrimitive.Input
      className={cn(className, "h-8 w-full text-sm font-normal outline-none")}
      data-slot="combobox-input"
      {...props}
    >
      {children}
    </ComboboxPrimitive.Input>
  );
}

function ComboboxSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Separator>) {
  return (
    <ComboboxPrimitive.Separator
      className={cn(className, "border-t border-border bg-border")}
      data-slot="combobox-separator"
      {...props}
    >
      {children}
    </ComboboxPrimitive.Separator>
  );
}

function ComboboxEmpty({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Empty>) {
  return (
    <ComboboxPrimitive.Empty
      className={cn(
        className,
        "p-4 text-sm leading-4 text-muted-foreground empty:m-0 empty:p-0",
      )}
      data-slot="combobox-empty"
      {...props}
    >
      {children}
    </ComboboxPrimitive.Empty>
  );
}

function ComboboxList({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.List>) {
  return (
    <ComboboxPrimitive.List
      className={cn(
        className,
        "scroll-py-1 overflow-y-auto overscroll-contain py-1 empty:p-0",
      )}
      data-slot="combobox-list"
      {...props}
    >
      {children}
    </ComboboxPrimitive.List>
  );
}

function ComboboxItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Item>) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        className,
        "inline-flex items-center gap-2 py-2 pr-3 pl-3.5 text-sm leading-4 outline-none select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-accent-foreground data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-accent",
      )}
      data-slot="combobox-item"
      {...props}
    >
      {children}
    </ComboboxPrimitive.Item>
  );
}

function ComboboxItemIndicator({
  children,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ItemIndicator>) {
  return (
    <ComboboxPrimitive.ItemIndicator
      data-slot="combobox-item-indicator"
      {...props}
    >
      {children}
    </ComboboxPrimitive.ItemIndicator>
  );
}

export {
  Combobox,
  ComboboxValue,
  ComboboxTrigger,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxPopup,
  ComboboxInput,
  ComboboxSeparator,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
  ComboboxItemIndicator,
};
