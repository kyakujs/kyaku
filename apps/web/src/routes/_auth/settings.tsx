import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@kyakujs/ui/button'
import { Input } from '@kyakujs/ui/input'

import { useAuthedQuery } from '~/services/auth.query'

export const Route = createFileRoute('/_auth/settings')({
  component: Settings,
})

function Settings() {
  const authedQuery = useAuthedQuery()

  return (
    <div className="bg-backround mx-auto max-w-2xl">
      <main className="py-4 sm:py-12">
        <div className="mx-4 flex flex-col gap-8 sm:mx-10">
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
            <form>
              <section className="rounded-md border border-border bg-muted">
                <div className="flex flex-col gap-4 p-4">
                  <h3 className="text-regular text-foreground">Export</h3>

                  <p className="text-sm text-muted-foreground">
                    You can export your ticket data in CSV format.
                  </p>
                  <Button type="button" size="sm" className="self-start">
                    Export CSV
                  </Button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
