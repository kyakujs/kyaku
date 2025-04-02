import { useState } from "react";
import { useZero } from "@rocicorp/zero/react";

import type { Schema } from "@kyakujs/zero/schema";
import { BasicEditor } from "@kyakujs/ui/basic-editor";

export const TicketTitle = ({ id, title }: { id: string; title: string }) => {
  const z = useZero<Schema>();
  const [value, setValue] = useState(title);

  const onUpdateTitle = async (title: string) => {
    await z.mutate.ticket.update({
      id: id,
      title,
    });
  };

  return (
    <BasicEditor
      value={{
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: value,
              },
            ],
          },
        ],
      }}
      onChange={(value) => setValue(value.content[0].content[0].text)}
      onBlur={() => {
        onUpdateTitle(value);
      }}
    />
  );
};
