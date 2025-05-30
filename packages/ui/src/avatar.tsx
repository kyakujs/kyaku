import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui-components/react/avatar";

import { cn } from "@kyakujs/ui";

const Avatar: React.FC<React.ComponentProps<typeof AvatarPrimitive.Root>> = ({
  className,
  ...props
}) => (
  <AvatarPrimitive.Root
    className={cn(
      "relative flex size-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage: React.FC<
  React.ComponentProps<typeof AvatarPrimitive.Image>
> = ({ className, ...props }) => (
  <AvatarPrimitive.Image
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback: React.FC<
  React.ComponentProps<typeof AvatarPrimitive.Fallback>
> = ({ className, ...props }) => (
  <AvatarPrimitive.Fallback
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
