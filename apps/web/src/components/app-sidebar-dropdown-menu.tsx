import { Link } from "@tanstack/react-router";
import { LogOutIcon, SettingsIcon } from "lucide-react";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@kyakujs/ui/dropdown-menu";

import { authClient } from "~/libs/auth-client";

export function AppSidebarDropdownMenu() {
  return (
    <>
      <DropdownMenuItem render={<Link to="/settings" />}>
        <SettingsIcon />
        <span>Settings</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        onClick={() => {
          void authClient.signOut();
        }}
      >
        <LogOutIcon />
        <span>Log out</span>
      </DropdownMenuItem>
    </>
  );
}
