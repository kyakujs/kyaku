import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { mergeProps, useRender } from "@base-ui-components/react";
import { cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";

import { Button } from "./button";
import { useIsMobile } from "./hooks/is-mobile";
import { cn } from "./index";
import { Separator } from "./separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

interface SidebarContext {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ref,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext value={contextValue}>
      <div
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    </SidebarContext>
  );
};
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = ({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col bg-sidebar-background text-sidebar-foreground",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) bg-sidebar-background p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:-left-(--sidebar-width)"
            : "right-0 group-data-[collapsible=offcanvas]:-right-(--sidebar-width)",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="flex h-full w-full flex-col bg-sidebar-background group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
Sidebar.displayName = "Sidebar";

const SidebarTrigger = ({
  className,
  onClick,
  ref,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"button">) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar-background",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
};
SidebarRail.displayName = "SidebarRail";

const SidebarInset = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"main">) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        className,
      )}
      {...props}
    />
  );
};
SidebarInset.displayName = "SidebarInset";

const SidebarHeader = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
};
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
};
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = ({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof Separator>) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  );
};
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
};
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
};
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = ({
  className,
  ref,
  render = <div />,
  ...props
}: React.ComponentProps<"div"> & useRender.ComponentProps<"div">) => {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: cn(
      "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 transition-[margin,opa] duration-200 ease-linear focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-sidebar-ring [&>svg]:size-4 [&>svg]:shrink-0",
      "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
      className,
    ),
    ["data-sidebar" as string]: "group-label",
    ref: ref,
  };

  const { renderElement } = useRender({
    render,
    props: mergeProps<"div">(defaultProps, props),
  });

  return renderElement();
};
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = ({
  className,
  ref,
  render = <button />,
  ...props
}: React.ComponentProps<"button"> & useRender.ComponentProps<"button">) => {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: cn(
      "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-sidebar-ring [&>svg]:size-4 [&>svg]:shrink-0",
      // Increases the hit area of the button on mobile.
      "after:absolute after:-inset-2 after:md:hidden",
      "group-data-[collapsible=icon]:hidden",
      className,
    ),
    ["data-sidebar" as string]: "group-action",
    ref: ref,
  };

  const { renderElement } = useRender({
    render,
    props: mergeProps<"button">(defaultProps, props),
  });

  return renderElement();
};
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
);
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"ul">) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
);
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
);
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-[width,height,padding] group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground data-[status=active]:bg-sidebar-accent data-[status=active]:font-medium data-[status=active]:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = ({
  render = <button />,
  variant = "default",
  size = "default",
  className,
  ref,
  ...props
}: React.ComponentProps<"button"> &
  useRender.ComponentProps<"button"> &
  VariantProps<typeof sidebarMenuButtonVariants>) => {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: cn(sidebarMenuButtonVariants({ variant, size }), className),
    ["data-sidebar" as string]: "menu-button",
    ["data-size" as string]: size,
    ref: ref,
  };

  const { renderElement } = useRender({
    render,
    props: mergeProps<"button">(defaultProps, props),
  });

  return renderElement();
};
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = ({
  className,
  ref,
  render = <button />,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> &
  useRender.ComponentProps<"button"> & {
    showOnHover?: boolean;
  }) => {
  const defaultProps: useRender.ElementProps<"button"> = {
    className: cn(
      "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-sidebar-ring [&>svg]:size-4 [&>svg]:shrink-0",
      // Increases the hit area of the button on mobile.
      "after:absolute after:-inset-2 after:md:hidden",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      showOnHover &&
        "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[status=active]/menu-button:text-sidebar-accent-foreground data-[state=open]:opacity-100 md:opacity-0",
      className,
    ),
    ["data-sidebar" as string]: "menu-action",
    ref: ref,
  };

  const { renderElement } = useRender({
    render,
    props: mergeProps<"button">(defaultProps, props),
  });

  return renderElement();
};
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[status=active]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSub = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"ul">) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
);
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = ({ ref, ...props }: React.ComponentProps<"li">) => (
  <li ref={ref} {...props} />
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = ({
  // eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid
  render = <a />,
  size = "md",
  ref,
  className,
  ...props
}: React.ComponentProps<"a"> &
  useRender.ComponentProps<"a"> & {
    size?: "sm" | "md";
  }) => {
  const defaultProps: useRender.ElementProps<"a"> = {
    className: cn(
      "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
      "data-[status=active]:bg-sidebar-accent data-[status=active]:text-sidebar-accent-foreground",
      size === "sm" && "text-xs",
      size === "md" && "text-sm",
      "group-data-[collapsible=icon]:hidden",
      className,
    ),
    ["data-sidebar" as string]: "menu-sub-button",
    ["data-size" as string]: size,
    ref: ref,
  };

  const { renderElement } = useRender({
    render,
    props: mergeProps<"a">(defaultProps, props),
  });

  return renderElement();
};
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
