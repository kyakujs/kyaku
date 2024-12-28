import * as React from "react";
import { Input as InputPrimitive } from "@base-ui-components/react/input";

import { cn } from "@kyakujs/ui";

const Input = ({
  className,
  type,
  ref,
  ...props
}: InputPrimitive.Props & {
  ref?: React.Ref<HTMLInputElement>;
}) => {
  return (
    <InputPrimitive
      type={type}
      className={cn(
        "flex appearance-none rounded-md border border-input bg-background px-3 py-1.5 text-sm -outline-offset-1 placeholder:text-muted-foreground focus-visible:outline-1 focus-visible:outline-ring focus-visible:outline-solid disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
};
Input.displayName = "Input";

export { Input };
