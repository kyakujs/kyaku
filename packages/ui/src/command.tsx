import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@kyakujs/ui";
import { Dialog, DialogContent } from "@kyakujs/ui/dialog";

const Command: React.FC<React.ComponentProps<typeof CommandPrimitive>> = ({
  className,
  ...props
}) => (
  <CommandPrimitive
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
);
Command.displayName = CommandPrimitive.displayName;

const CommandDialog: React.FC<React.ComponentProps<typeof Dialog>> = ({
  children,
  ...props
}) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};
CommandDialog.displayName = "CommandDialog";

const CommandInput: React.FC<
  React.ComponentProps<typeof CommandPrimitive.Input>
> = ({ className, ...props }) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
);
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList: React.FC<
  React.ComponentProps<typeof CommandPrimitive.List>
> = ({ className, ...props }) => (
  <CommandPrimitive.List
    className={cn("max-h-[300px] overflow-x-hidden overflow-y-auto", className)}
    {...props}
  />
);
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty: React.FC<
  React.ComponentProps<typeof CommandPrimitive.Empty>
> = (props) => (
  <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />
);
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup: React.FC<
  React.ComponentProps<typeof CommandPrimitive.Group>
> = ({ className, ...props }) => (
  <CommandPrimitive.Group
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
);
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator: React.FC<
  React.ComponentProps<typeof CommandPrimitive.Separator>
> = ({ className, ...props }) => (
  <CommandPrimitive.Separator
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
);
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem: React.FC<
  React.ComponentProps<typeof CommandPrimitive.Item>
> = ({ className, ...props }) => (
  <CommandPrimitive.Item
    className={cn(
      "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
);
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut: React.FC<React.ComponentProps<"span">> = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
