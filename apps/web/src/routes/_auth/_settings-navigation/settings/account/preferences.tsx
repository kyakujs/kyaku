import { createFileRoute } from "@tanstack/react-router";

import { SettingsPageHeader } from "~/components/settings-page-header";

export const Route = createFileRoute(
  "/_auth/_settings-navigation/settings/account/preferences",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SettingsPageHeader />
      <div className="mx-4 flex shrink-0 grow basis-auto flex-col items-center">
        <div className="flex w-full max-w-160 flex-col gap-8 py-4 md:py-16">
          <div className="text-2xl font-semibold text-foreground">
            Preferences
          </div>

          <div className="flex flex-col gap-6"></div>
        </div>
      </div>
    </>
  );
}
