import type { PropsWithChildren } from "react";
import { Link } from "@tanstack/react-router";

import { Button } from "@kyakujs/ui/button";
import { Separator } from "@kyakujs/ui/separator";
import { SidebarTrigger } from "@kyakujs/ui/sidebar";

export function Header({ children }: PropsWithChildren) {
  return (
    <div>
      <header className="flex h-10 items-center gap-2 border-b border-border px-4">
        <Button
          variant="outline"
          size="xs"
          className="aria-disabled:bg-sidebar-accent"
          render={
            <Link
              to="/tickets/todo"
              activeProps={{
                "aria-disabled": true,
              }}
            >
              Todo
            </Link>
          }
        />
        <Button
          variant="outline"
          size="xs"
          className="aria-disabled:bg-sidebar-accent"
          render={
            <Link
              to="/tickets/snoozed"
              activeProps={{
                "aria-disabled": true,
              }}
            >
              Snoozed
            </Link>
          }
        />
        <Button
          variant="outline"
          size="xs"
          className="aria-disabled:bg-sidebar-accent"
          render={
            <Link
              to="/tickets/all"
              activeProps={{
                "aria-disabled": true,
              }}
            >
              All
            </Link>
          }
        />
      </header>
      <div className="flex h-10 w-full items-center gap-2 border-b border-border px-4">
        <SidebarTrigger className="-ml-1 inline-flex group-has-[[data-state=collapsed]]/sidebar-wrapper:inline-flex lg:hidden [&_svg]:size-4 [&_svg]:shrink-0" />
        <Separator
          orientation="vertical"
          className="mr-2 block h-4 w-[1px] group-has-[[data-state=collapsed]]/sidebar-wrapper:block lg:hidden"
        />
        {children}
      </div>
    </div>
  );
}
