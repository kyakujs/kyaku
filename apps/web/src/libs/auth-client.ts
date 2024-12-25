import { authClientOptions, createAuthClient } from "@kyakujs/auth/client";

import { authQueryOptions } from "~/services/auth.query";

export const authClient = createAuthClient({
  ...authClientOptions,
  fetchOptions: {
    onResponse: async () => {
      await window.getQueryClient().invalidateQueries(authQueryOptions());
      await window.getRouter().invalidate();
    },
  },
});
