import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@kyakujs/ui";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors select-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:outline-offset-2 focus-visible:outline-destructive/90 focus-visible:outline-solid",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
