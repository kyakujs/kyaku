import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui-components/react/dialog";
import { cva } from "class-variance-authority";

import { cn } from "@kyakujs/ui";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetBackdrop = ({
  className,
  ref,
  ...props
}: SheetPrimitive.Backdrop.Props & {
  ref?: React.Ref<HTMLDivElement>;
}) => (
  <SheetPrimitive.Backdrop
    className={cn(
      "fixed inset-0 bg-black/20 transition-opacity duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70",
      className,
    )}
    {...props}
    ref={ref}
  />
);
SheetBackdrop.displayName = SheetPrimitive.Backdrop.displayName;

const sheetVariants = cva(
  "fixed max-w-sm gap-4 bg-background p-6 shadow-lg transition duration-150",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 h-full data-[ending-style]:-translate-x-full data-[starting-style]:-translate-x-full",
        right:
          "inset-y-0 right-0 h-full data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends SheetPrimitive.Popup.Props,
    VariantProps<typeof sheetVariants> {
  ref?: React.Ref<HTMLDivElement>;
}

const SheetContent = ({
  side = "right",
  className,
  children,
  ref,
  ...props
}: SheetContentProps) => (
  <SheetPortal>
    <SheetBackdrop />
    <SheetPrimitive.Popup
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
    </SheetPrimitive.Popup>
  </SheetPortal>
);
SheetContent.displayName = SheetPrimitive.Popup.displayName;

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = ({
  className,
  ref,
  ...props
}: SheetPrimitive.Title.Props & {
  ref?: React.Ref<HTMLHeadingElement>;
}) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = ({
  className,
  ref,
  ...props
}: SheetPrimitive.Description.Props & {
  ref?: React.Ref<HTMLHeadingElement>;
}) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetBackdrop,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
