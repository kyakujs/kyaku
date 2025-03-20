import { createFileRoute } from "@tanstack/react-router";

import { Input } from "@kyakujs/ui/input";

import { Header } from "~/components/layout/headers/settings/header";
import { useAuthedQuery } from "~/services/auth.query";

export const Route = createFileRoute(
  "/_auth/_settings-navigation/settings/account/profile",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const authedQuery = useAuthedQuery();
  return (
    <>
      <Header />
      <div className="mx-4 flex flex-col items-center">
        <div className="flex w-full max-w-160 flex-col gap-8 py-4 md:py-16">
          <div className="text-2xl font-semibold text-foreground">Profile</div>

          <div className="flex flex-col gap-6">
            <form>
              <section className="rounded-md border border-border bg-muted">
                <ul>
                  <li className="relative flex flex-col items-stretch justify-between gap-2 px-4 py-3 after:absolute after:right-4 after:bottom-0 after:left-4 after:h-px after:bg-border sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex min-w-0 grow flex-col flex-wrap gap-0.5">
                      <label
                        htmlFor="first-name"
                        className="text-sm font-medium text-foreground"
                      >
                        First name
                      </label>
                    </div>

                    <Input
                      id="first-name"
                      name="first-name"
                      type="text"
                      placeholder="janesmith"
                      value={authedQuery.data.user.name}
                    />
                  </li>
                  <li className="relative flex flex-col items-stretch justify-between gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex min-w-0 grow flex-col flex-wrap gap-0.5">
                      <label
                        htmlFor="username"
                        className="text-sm font-medium text-foreground"
                      >
                        Username
                      </label>
                      <span className="text-xs text-muted-foreground">
                        However you want to be identified
                      </span>
                    </div>

                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="johndoe"
                      value={authedQuery.data.user.username ?? undefined}
                    />
                  </li>
                </ul>
              </section>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
