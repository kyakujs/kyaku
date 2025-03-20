import { Link } from "@tanstack/react-router";
import { LogOutIcon, SettingsIcon } from "lucide-react";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@kyakujs/ui/dropdown-menu";

import { authClient } from "~/libs/auth-client";

export function WorkspaceMenu() {
  return (
    <>
      <DropdownMenuItem
        render={
          <Link to="/settings">
            <SettingsIcon />
            <span>Settings</span>
          </Link>
        }
      />

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
