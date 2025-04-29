import type { ComponentProps } from "react";

import { cn } from "@kyakujs/ui";

const Kbd: React.FC<
  ComponentProps<"kbd"> & {
    shortcut: string;
  }
> = ({ className, shortcut, ...props }) => {
  return (
    <span
      aria-label={shortcut}
      className="inline-flex items-center text-muted-foreground"
    >
      <kbd
        aria-hidden={true}
        className={cn("text-mono text-center text-[11px]", className)}
        {...props}
      >
        {shortcut}
      </kbd>
    </span>
  );
};
Kbd.displayName = "Kbd";

export { Kbd };
