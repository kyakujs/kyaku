import * as React from "react";
import { Separator as SeparatorPrimitive } from "@base-ui-components/react/separator";

import { cn } from "@kyakujs/ui";

const Separator: React.FC<
  SeparatorPrimitive.Props & {
    ref?: React.Ref<HTMLDivElement>;
  }
> = ({ className, ...props }) => (
  <SeparatorPrimitive
    data-slot="separator"
    className={cn(
      "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
      className,
    )}
    {...props}
  />
);
Separator.displayName = SeparatorPrimitive.displayName;

export { Separator };
