import { Link } from "@tanstack/react-router";
import { LogOutIcon, SettingsIcon } from "lucide-react";

import { MenuItem, MenuSeparator } from "@kyakujs/ui/menu";

import { authClient } from "~/components/auth/client";

export function WorkspaceMenu() {
  return (
    <>
      <MenuItem
        render={
          <Link to="/settings">
            <SettingsIcon />
            <span>Settings</span>
          </Link>
        }
      />

      <MenuSeparator />

      <MenuItem
        onClick={() => {
          void authClient.signOut();
        }}
      >
        <LogOutIcon />
        <span>Log out</span>
      </MenuItem>
    </>
  );
}
