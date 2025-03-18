import { Link } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";

import { SidebarTrigger } from "@kyakujs/ui/sidebar";

export function SettingsPageHeader() {
  return (
    <header className="sticky top-0 z-1 flex shrink-0 items-center gap-2 border-b border-border bg-background py-2 md:hidden">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 inline-flex group-has-[[data-state=collapsed]]/sidebar-wrapper:inline-flex lg:hidden [&_svg]:size-4 [&_svg]:shrink-0" />
        <Link to="/" className="flex cursor-default items-center gap-2">
          <ChevronLeftIcon className="block size-4 group-has-[[data-state=collapsed]]/sidebar-wrapper:block lg:hidden" />
          <span className="text-sm">Settings</span>
        </Link>
      </div>
    </header>
  );
}
