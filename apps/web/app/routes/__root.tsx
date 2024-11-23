import type { ErrorComponentProps } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";

import { RouterDevtools } from "~/libs/router";
import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => {
    return {
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: "Kyaku",
        },
      ],
      links: [{ rel: "stylesheet", href: appCss }],
    };
  },
  component: RootComponent,
  errorComponent: ErrorComponent,
  pendingComponent: PendingComponent,
  notFoundComponent: NotFoundComponent,
});

function ErrorComponent({ error }: ErrorComponentProps) {
  return (
    <RootDocument>
      <div className="text-destructive">
        <h1 className="font-bold">Error</h1>
        <p>{error.message}</p>
      </div>
    </RootDocument>
  );
}

function PendingComponent() {
  return <div>Loading...</div>;
}

function NotFoundComponent() {
  return <div>Not Found</div>;
}

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: PropsWithChildren) {
  return (
    <html suppressHydrationWarning>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <RouterDevtools position="bottom-right" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
