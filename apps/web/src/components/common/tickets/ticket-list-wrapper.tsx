import type { Row } from "@tanstack/react-table";
import { useRef } from "react";

import type { Ticket } from "~/components/common/tickets/ticket-list";
import { TicketVirtualList } from "~/components/common/tickets/ticket-virtual-list";

export function TicketListWrapper({ rows }: { rows: Row<Ticket>[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={parentRef}
      className="h-full overflow-x-hidden overflow-y-auto"
      data-view
    >
      <TicketVirtualList
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getScrollElement={() => parentRef.current!}
        rows={rows}
        initialOffset={() => 0}
        scrollMargin={0}
      />
    </div>
  );
}
