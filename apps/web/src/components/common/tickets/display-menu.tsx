import { Button } from "@kyakujs/ui/button";
import { Popover, PopoverPopup, PopoverTrigger } from "@kyakujs/ui/popover";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@kyakujs/ui/select";

import { groupings, sortings, useIssuesStore } from "~/store/issues-store";

export function DisplayMenu() {
  const { grouping, sortBy, setGrouping, setSortBy } = useIssuesStore();
  return (
    <Popover>
      <PopoverTrigger render={<Button size="sm" />}>Display</PopoverTrigger>
      <PopoverPopup align="end">
        <div className="flex h-10 flex-initial items-center justify-between">
          <label htmlFor="grouping" className="min-w-20 text-sm">
            Grouping
          </label>
          <Select
            id="grouping"
            items={groupings}
            onValueChange={setGrouping}
            value={grouping}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {groupings.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
        <div className="flex h-10 flex-initial items-center justify-between">
          <label htmlFor="ordering" className="min-w-20 text-sm">
            Ordering
          </label>
          <Select
            id="ordering"
            items={sortings}
            onValueChange={setSortBy}
            value={sortBy}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {sortings.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </div>
      </PopoverPopup>
    </Popover>
  );
}
