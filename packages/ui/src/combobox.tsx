import { Combobox as ComboboxPrimitive } from "@base-ui-components/react";

import { cn } from "@kyakujs/ui";

const Combobox: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Root>
> = ({ ...props }) => {
  return <ComboboxPrimitive.Root data-slot="combobox" {...props} />;
};
Combobox.displayName = "Combobox";

const ComboboxValue: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Value>
> = ({ children, ...props }) => {
  return (
    <ComboboxPrimitive.Value data-slot="combobox-value" {...props}>
      {children}
    </ComboboxPrimitive.Value>
  );
};
ComboboxValue.displayName = "ComboboxValue";

const ComboboxTrigger: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Trigger>
> = ({ children, className, ...props }) => {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        className,
        "inline-flex h-8 cursor-default items-center justify-between rounded-md bg-transparent px-3 text-sm text-foreground select-none hover:bg-sidebar-accent focus-visible:outline-sidebar-ring data-[popup-open]:bg-input/50 dark:bg-input/30 dark:hover:bg-input/50",
      )}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Trigger>
  );
};
ComboboxTrigger.displayName = "ComboboxTrigger";

const ComboboxPortal: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Portal>
> = ({ children, ...props }) => {
  return (
    <ComboboxPrimitive.Portal data-slot="combobox-portal" {...props}>
      {children}
    </ComboboxPrimitive.Portal>
  );
};
ComboboxPortal.displayName = "ComboboxPortal";

const ComboboxPositioner: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Positioner>
> = ({ children, ...props }) => {
  return (
    <ComboboxPrimitive.Positioner data-slot="combobox-positioner" {...props}>
      {children}
    </ComboboxPrimitive.Positioner>
  );
};
ComboboxPositioner.displayName = "ComboboxPositioner";

const ComboboxPopup: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Popup>
> = ({ children, className, ...props }) => {
  return (
    <ComboboxPrimitive.Popup
      data-slot="combobox-popup"
      className={cn(
        className,
        "rounded-md bg-popover text-foreground shadow-lg outline-1 outline-input transition-[transform,scale,opacity] [--input-container-height:3rem] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0",
      )}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Popup>
  );
};
ComboboxPopup.displayName = "ComboboxPopup";

const ComboboxInput: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Input>
> = ({ children, className, ...props }) => {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-input"
      className={cn(className, "h-8 w-full text-sm font-normal outline-none")}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Input>
  );
};
ComboboxInput.displayName = "ComboboxInput";

const ComboboxSeparator: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Separator>
> = ({ children, className, ...props }) => {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn(className, "border-t bg-border")}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Separator>
  );
};
ComboboxSeparator.displayName = "ComboboxSeparator";

const ComboboxEmpty: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Empty>
> = ({ children, className, ...props }) => {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        className,
        "p-4 text-sm leading-4 text-muted-foreground empty:m-0 empty:p-0",
      )}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Empty>
  );
};
ComboboxEmpty.displayName = "ComboboxEmpty";

const ComboboxList: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.List>
> = ({ children, className, ...props }) => {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        className,
        "scroll-py-1 overflow-y-auto overscroll-contain py-1 empty:p-0",
      )}
      {...props}
    >
      {children}
    </ComboboxPrimitive.List>
  );
};
ComboboxList.displayName = "ComboboxList";

const ComboboxItem: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.Item>
> = ({ children, className, ...props }) => {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        className,
        "inline-flex items-center gap-2 py-2 pr-3 pl-3.5 text-sm leading-4 outline-none select-none data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-accent-foreground data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-accent",
      )}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Item>
  );
};
ComboboxItem.displayName = "ComboboxItem";

const ComboboxItemIndicator: React.FC<
  React.ComponentProps<typeof ComboboxPrimitive.ItemIndicator>
> = ({ children, ...props }) => {
  return (
    <ComboboxPrimitive.ItemIndicator
      data-slot="combobox-item-indicator"
      {...props}
    >
      {children}
    </ComboboxPrimitive.ItemIndicator>
  );
};
ComboboxItemIndicator.displayName = "ComboboxItemIndicator";

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
