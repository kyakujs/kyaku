import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui-components/react";
import { X } from "lucide-react";

import { cn } from "@kyakujs/ui";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

type DialogOverlayProps = DialogPrimitive.Backdrop.Props & {
  ref?: React.Ref<HTMLDivElement>;
};
const DialogOverlay: React.FC<DialogOverlayProps> = ({
  className,
  ...props
}) => (
  <DialogPrimitive.Backdrop
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
      className,
    )}
    {...props}
  />
);
DialogOverlay.displayName = DialogPrimitive.Backdrop.displayName;

type DialogContentProps = DialogPrimitive.Popup.Props & {
  ref?: React.Ref<HTMLDivElement>;
};
const DialogContent: React.FC<DialogContentProps> = ({
  className,
  children,
  ...props
}) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Popup
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Popup>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Popup.displayName;

type DialogHeaderProps = React.ComponentProps<"div">;
const DialogHeader: React.FC<DialogHeaderProps> = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

type DialogTitleProps = DialogPrimitive.Title.Props & {
  ref?: React.Ref<HTMLHeadingElement>;
};
const DialogTitle: React.FC<DialogTitleProps> = ({ className, ...props }) => (
  <DialogPrimitive.Title
    className={cn(
      "text-lg leading-none font-semibold tracking-tight",
      className,
    )}
    {...props}
  />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

type DialogDescriptionProps = DialogPrimitive.Description.Props & {
  ref?: React.Ref<HTMLParagraphElement>;
};
const DialogDescription: React.FC<DialogDescriptionProps> = ({
  className,
  ...props
}) => (
  <DialogPrimitive.Description
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
