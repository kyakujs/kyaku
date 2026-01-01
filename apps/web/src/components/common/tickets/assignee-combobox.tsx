import { useRef, useState } from "react";
import { useQuery } from "@rocicorp/zero/react";
import { CheckIcon, CircleDashedIcon } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import type { User } from "@kyakujs/zero/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@kyakujs/ui/avatar";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@kyakujs/ui/combobox";
import { queries } from "@kyakujs/zero/queries";

const ASSIGNEE_SHORTCUT = "a";

const noAssigneeUser = {
  id: "",
  username: "No assignee",
  name: "No assignee",
  image: "",
  firstName: "",
  lastName: "",
};

type AssignableUser = User | typeof noAssigneeUser;

function CustomCombobox(props: {
  items: AssignableUser[];
  onValueChange: (value: AssignableUser["id"] | null | undefined) => void;
  value: AssignableUser["id"] | null;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);

  useHotkeys(ASSIGNEE_SHORTCUT, (event) => {
    event.preventDefault();
    ref.current?.focus();
    setOpen(true);
  });

  const itemsWithNull = [noAssigneeUser, ...props.items];
  console.log(itemsWithNull);

  return (
    <Combobox
      items={itemsWithNull}
      defaultValue={
        props.value === ""
          ? null
          : itemsWithNull.find((item) => item.id === props.value)
      }
      onValueChange={(user) => props.onValueChange(user?.id)}
      open={open}
      onOpenChange={setOpen}
      autoHighlight
    >
      <ComboboxTrigger>
        <ComboboxValue>
          {(user: AssignableUser | null) =>
            user ? (
              <div className="flex items-center gap-2">
                <Avatar className="size-4">
                  <AvatarImage src={user.image} alt={user.username} />
                  <AvatarFallback
                    render={
                      <svg
                        viewBox="0 0 100 100"
                        className="fill-current p-[5%] text-[48px] font-medium uppercase"
                        aria-hidden={true}
                      />
                    }
                  >
                    <text
                      x="50%"
                      y="50%"
                      alignmentBaseline="middle"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      dy=".125em"
                    >
                      {user.firstName?.[0] ?? ""}
                      {user.lastName?.[0] ?? ""}
                    </text>
                  </AvatarFallback>
                </Avatar>
                <span>{user.username}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CircleDashedIcon className="size-4 text-muted-foreground" />
                <span>No assignee</span>
              </div>
            )
          }
        </ComboboxValue>
      </ComboboxTrigger>
      <ComboboxPortal>
        <ComboboxPositioner
          align="start"
          side="left"
          sideOffset={4}
          disableAnchorTracking={true}
        >
          <ComboboxPopup
            className="max-h-[min(24rem,var(--available-height))] max-w-[15rem] origin-[var(--transform-origin)]"
            aria-label="Select assignee"
            style={{ "--row-width": "15rem" } as React.CSSProperties}
          >
            <div className="grid w-(--row-width) grid-cols-[1fr_auto] gap-2 p-1 pr-3 pl-3.5 text-center">
              <ComboboxInput
                placeholder="Set assignee to..."
                className="col-start-1"
              />
              <span className="col-start-2 inline-flex items-center justify-center whitespace-nowrap">
                <kbd className="min-w-4.5 rounded-sm border border-input p-0.5 text-xs leading-[1.1] text-muted-foreground">
                  {ASSIGNEE_SHORTCUT.toUpperCase()}
                </kbd>
              </span>
            </div>
            <ComboboxSeparator />
            <ComboboxEmpty>No assignee found.</ComboboxEmpty>
            <ComboboxList className="max-h-[min(calc(24rem-var(--input-container-height)),calc(var(--available-height)-var(--input-container-height)))]">
              {(user: AssignableUser) => (
                <ComboboxItem
                  key={user.username}
                  value={user}
                  className="w-(--row-width)"
                >
                  <div>
                    {user.id ? (
                      <Avatar className="size-4">
                        <AvatarImage src={user.image} alt={user.username} />
                        <AvatarFallback
                          render={
                            <svg
                              viewBox="0 0 100 100"
                              className="fill-current p-[5%] text-[48px] font-medium uppercase"
                              aria-hidden={true}
                            />
                          }
                        >
                          <text
                            x="50%"
                            y="50%"
                            alignmentBaseline="middle"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            dy=".125em"
                          >
                            {user.firstName?.[0] ?? ""}
                            {user.lastName?.[0] ?? ""}
                          </text>
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <CircleDashedIcon className="size-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex flex-1">{user.username}</div>
                  <ComboboxItemIndicator>
                    <CheckIcon className="size-4" />
                  </ComboboxItemIndicator>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </Combobox>
  );
}

export default function AssigneeCombobox({
  onValueChange,
  value,
}: {
  onValueChange: (value: string | null | undefined) => void;
  value: string | null;
}) {
  const [users, { type }] = useQuery(queries.users({}));

  if (type !== "complete") {
    return null;
  }

  return (
    <CustomCombobox items={users} onValueChange={onValueChange} value={value} />
  );
}
