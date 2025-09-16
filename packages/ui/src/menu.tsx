import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui-components/react/menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "@kyakujs/ui";

const Menu: React.FC<React.ComponentProps<typeof MenuPrimitive.Root>> = ({
  ...props
}) => {
  return <MenuPrimitive.Root data-slot="menu" {...props} />;
};
Menu.displayName = "Menu";

const MenuTrigger: React.FC<
  React.ComponentProps<typeof MenuPrimitive.Trigger>
> = ({ ...props }) => {
  return <MenuPrimitive.Trigger data-slot="menu-trigger" {...props} />;
};
MenuTrigger.displayName = "MenuTrigger";

const MenuPortal: React.FC<
  React.ComponentProps<typeof MenuPrimitive.Portal>
> = ({ ...props }) => {
  return <MenuPrimitive.Portal data-slot="menu-portal" {...props} />;
};
MenuPortal.displayName = "MenuPortal";

const MenuBackdrop: React.FC<
  React.ComponentProps<typeof MenuPrimitive.Backdrop>
> = ({ children, ...props }) => (
  <MenuPrimitive.Backdrop data-slot="menu-backdrop" {...props}>
    {children}
  </MenuPrimitive.Backdrop>
);
MenuBackdrop.displayName = "MenuBackdrop";

const MenuPositioner: React.FC<
  React.ComponentProps<typeof MenuPrimitive.Positioner>
> = ({ children, className, ...props }) => (
  <MenuPrimitive.Positioner
    data-slot="menu-positioner"
    className={cn(className, "outline-none")}
    {...props}
  >
    {children}
  </MenuPrimitive.Positioner>
);
MenuPositioner.displayName = "MenuPositioner";

const MenuPopup: React.FC<React.ComponentProps<typeof MenuPrimitive.Popup>> = ({
  children,
  className,
  ...props
}) => (
  <MenuPrimitive.Popup
    data-slot="menu-popup"
    className={cn(
      "origin-(--transform-origin) rounded-md bg-popover p-1 text-popover-foreground shadow-lg outline-1 outline-border transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300",
      className,
    )}
    {...props}
  >
    {children}
  </MenuPrimitive.Popup>
);
MenuPopup.displayName = "MenuPopup";

const MenuItem: React.FC<React.ComponentProps<typeof MenuPrimitive.Item>> = ({
  className,
  ...props
}) => (
  <MenuPrimitive.Item
    data-slot="menu-item"
    className={cn(
      "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
);
MenuItem.displayName = "MenuItem";

const MenuSubmenu: React.FC<
  React.ComponentProps<typeof MenuPrimitive.SubmenuRoot>
> = ({ children, ...props }) => (
  <MenuPrimitive.SubmenuRoot data-slot="menu-submenu" {...props}>
    {children}
  </MenuPrimitive.SubmenuRoot>
);
MenuSubmenu.displayName = "MenuSubmenu";

const MenuSubmenuTrigger: React.FC<
  React.ComponentProps<typeof MenuPrimitive.SubmenuTrigger>
> = ({ children, className, ...props }) => (
  <MenuPrimitive.SubmenuTrigger
    data-slot="menu-submenu-trigger"
    className={cn(
      className,
      "relative flex cursor-default items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    )}
    {...props}
  >
    {children} <ChevronRightIcon />
  </MenuPrimitive.SubmenuTrigger>
);
MenuSubmenuTrigger.displayName = "MenuSubmenuTrigger";

const MenuGroup: React.FC<React.ComponentProps<typeof MenuPrimitive.Group>> = ({
  ...props
}) => {
  return <MenuPrimitive.Group data-slot="menu-group" {...props} />;
};
MenuGroup.displayName = "MenuGroup";

const MenuGroupLabel: React.FC<
  React.ComponentProps<typeof MenuPrimitive.GroupLabel>
> = ({ className, ...props }) => (
  <MenuPrimitive.GroupLabel
    data-slot="menu-group-label"
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
);
MenuGroupLabel.displayName = "MenuGroupLabel";

const MenuRadioGroup: React.FC<
  React.ComponentProps<typeof MenuPrimitive.RadioGroup>
> = ({ ...props }) => {
  return <MenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />;
};
MenuRadioGroup.displayName = "MenuRadioGroup";

const MenuRadioItem: React.FC<
  React.ComponentProps<typeof MenuPrimitive.RadioItem>
> = ({ className, children, ...props }) => (
  <MenuPrimitive.RadioItem
    data-slot="menu-radio-item"
    className={cn(
      "relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <MenuPrimitive.RadioItemIndicator>
        <CircleIcon className="size-2 fill-current" />
      </MenuPrimitive.RadioItemIndicator>
    </span>
    {children}
  </MenuPrimitive.RadioItem>
);
MenuRadioItem.displayName = "MenuRadioItem";

const MenuCheckboxItem: React.FC<
  React.ComponentProps<typeof MenuPrimitive.CheckboxItem>
> = ({ className, children, checked, ...props }) => (
  <MenuPrimitive.CheckboxItem
    data-slot="menu-checkbox-item"
    className={cn(
      "relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <MenuPrimitive.CheckboxItemIndicator>
        <CheckIcon className="size-4" />
      </MenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
);
MenuCheckboxItem.displayName = "MenuCheckboxItem";

const MenuSeparator: React.FC<
  React.ComponentProps<typeof MenuPrimitive.Separator>
> = ({ className, ...props }) => (
  <MenuPrimitive.Separator
    data-slot="menu-separator"
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
);
MenuSeparator.displayName = "MenuSeparator";

const MenuShortcut: React.FC<React.ComponentProps<"span">> = ({
  className,
  ...props
}) => {
  return (
    <span
      data-slot="menu-shortcut"
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
MenuShortcut.displayName = "MenuShortcut";

export {
  Menu,
  MenuTrigger,
  MenuPortal,
  MenuBackdrop,
  MenuPositioner,
  MenuPopup,
  MenuItem,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuGroup,
  MenuGroupLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuCheckboxItem,
  MenuSeparator,
  MenuShortcut,
};
