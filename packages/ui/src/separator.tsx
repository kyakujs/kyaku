import * as React from "react";
import { Separator as SeparatorPrimitive } from "@base-ui-components/react/separator";

import { cn } from "@kyakujs/ui";

const Separator: React.FC<
  SeparatorPrimitive.Props & {
    ref?: React.Ref<HTMLDivElement>;
  }
> = ({ className, ...props }) => (
  <SeparatorPrimitive
    className={cn("shrink-0 bg-border", className)}
    {...props}
  />
);
Separator.displayName = SeparatorPrimitive.displayName;

export { Separator };
