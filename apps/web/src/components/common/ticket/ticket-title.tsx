import { useZero } from "@rocicorp/zero/react";

import type { Schema } from "@kyakujs/zero/schema";
import { BasicEditor } from "@kyakujs/ui/basic-editor";

import { useAuthedQuery } from "~/services/auth.query";

export const TicketTitle = ({ id, title }: { id: string; title: string }) => {
  const authedQuery = useAuthedQuery();
  const z = useZero<Schema>();

  const onUpdateTitle = async (title: string) => {
    await z.mutate.ticket.update({
      id: id,
      title,
      updatedAt: Date.now(),
      updatedById: authedQuery.data.user.id,
    });
  };

  return <BasicEditor defaultValue={title} onBlur={onUpdateTitle} />;
};
