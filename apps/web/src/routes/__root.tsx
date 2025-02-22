import type { ErrorComponentProps } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import fontsourceInter from "@fontsource-variable/inter?url";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";

import type { RouterContext } from "~/router";
import { RouterDevtools } from "~/router";
import { authQueryOptions } from "~/services/auth.query";
import appCss from "~/styles/app.css?url";

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    const auth = await context.queryClient.ensureQueryData(authQueryOptions());

    return {
      auth,
    };
  },
  head: () => {
    return {
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content:
            "width=device-width,height=device-height,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no,viewport-fit=cover",
        },
        {
          title: "Kyaku",
        },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        {
          rel: "stylesheet",
          href: fontsourceInter,
        },
      ],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="Root">{children}</div>
        <RouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
