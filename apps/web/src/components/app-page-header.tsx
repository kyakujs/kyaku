import type { PropsWithChildren } from "react";

import { Separator } from "@kyakujs/ui/separator";
import { SidebarTrigger } from "@kyakujs/ui/sidebar";

export function AppPageHeader({ children }: PropsWithChildren) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 inline-flex group-has-[[data-state=collapsed]]/sidebar-wrapper:inline-flex md:hidden [&_svg]:size-4 [&_svg]:shrink-0" />
        <Separator className="mr-2 block h-4 w-[1px] group-has-[[data-state=collapsed]]/sidebar-wrapper:block md:hidden" />
        {children}
      </div>
    </header>
  );
}
