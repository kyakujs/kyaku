import type { PropsWithChildren } from "react";

import { Separator } from "@kyakujs/ui/separator";
import { SidebarTrigger } from "@kyakujs/ui/sidebar";

export function Header({ children }: PropsWithChildren) {
  return (
    <header className="flex h-10 w-full items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1 inline-flex group-has-[[data-state=collapsed]]/sidebar-wrapper:inline-flex lg:hidden [&_svg]:size-4 [&_svg]:shrink-0" />
      <Separator className="mr-2 block h-4 w-[1px] group-has-[[data-state=collapsed]]/sidebar-wrapper:block lg:hidden" />
      {children}
    </header>
  );
}
