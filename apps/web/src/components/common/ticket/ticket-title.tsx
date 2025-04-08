import { useZero } from "@rocicorp/zero/react";

import type { Schema } from "@kyakujs/zero/schema";
import { BasicEditor } from "@kyakujs/ui/basic-editor";

export const TicketTitle = ({ id, title }: { id: string; title: string }) => {
  const z = useZero<Schema>();

  const onUpdateTitle = async (title: string) => {
    await z.mutate.ticket.update({
      id: id,
      title,
    });
  };

  return <BasicEditor defaultValue={title} onBlur={onUpdateTitle} />;
};
