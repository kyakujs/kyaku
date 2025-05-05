import type { Row } from "@tanstack/react-table";
import { useRef } from "react";

import type { Ticket } from "~/components/common/tickets/ticket-list";
import { TicketListItem } from "~/components/common/tickets/ticket-list-item";

export function TicketListFlat({ rows }: { rows: Row<Ticket>[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={parentRef}
      className="h-full overflow-x-hidden overflow-y-auto"
      data-view
    >
      <TicketListItem
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getScrollElement={() => parentRef.current!}
        rows={rows}
        initialOffset={() => 0}
        scrollMargin={0}
      />
    </div>
  );
}
