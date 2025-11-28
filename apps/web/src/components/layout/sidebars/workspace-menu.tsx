import { Link, useNavigate } from "@tanstack/react-router";
import { LogOutIcon, SettingsIcon } from "lucide-react";

import { MenuItem, MenuSeparator } from "@kyakujs/ui/menu";

import { authClient } from "~/components/auth/client";

export function WorkspaceMenu() {
  const navigate = useNavigate();
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
          void authClient.signOut({
            fetchOptions: {
              onSuccess: async () => {
                await navigate({
                  to: "/login",
                });
              },
            },
          });
        }}
      >
        <LogOutIcon />
        <span>Log out</span>
      </MenuItem>
    </>
  );
}
