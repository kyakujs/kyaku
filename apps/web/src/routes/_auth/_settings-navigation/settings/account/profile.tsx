import { Input } from "@kyakujs/ui/input";
import { createFileRoute } from "@tanstack/react-router";

import { authClient } from "~/components/auth/client";
import { Header } from "~/components/layout/headers/settings/header";

export const Route = createFileRoute("/_auth/_settings-navigation/settings/account/profile")({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  const session = authClient.useSession();

  if (!session.data) {
    return <div className="text-red-500">User not found</div>;
  }

  return (
    <>
      <Header />
      <div className="mx-4 flex flex-col items-center">
        <div className="flex w-full max-w-160 flex-col gap-8 py-4 md:py-16">
          <div className="text-foreground text-2xl font-semibold">Profile</div>

          <div className="flex flex-col gap-6">
            <form>
              <section className="border-border bg-muted rounded-md border">
                <ul>
                  <li className="after:bg-border relative flex flex-col items-stretch justify-between gap-2 px-4 py-3 after:absolute after:right-4 after:bottom-0 after:left-4 after:h-px sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex min-w-0 grow flex-col flex-wrap gap-0.5">
                      <label htmlFor="full-name" className="text-foreground text-sm font-medium">
                        Full name
                      </label>
                    </div>

                    <Input
                      id="full-name"
                      name="full-name"
                      type="text"
                      placeholder="janesmith"
                      value={session.data.user.name}
                    />
                  </li>
                  {/*<li className="relative flex flex-col items-stretch justify-between gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
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
                      value={session.data.user.username}
                    />
                  </li>*/}
                </ul>
              </section>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
