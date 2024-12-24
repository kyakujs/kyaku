import { authClientOptions, createAuthClient } from "@kyakujs/auth/client";

import { authQueryOptions } from "~/services/auth.query";

export const authClient = createAuthClient({
  ...authClientOptions,
  fetchOptions: {
    // https://discord.com/channels/1288403910284935179/1288403910284935182/1311199374793244703
    onResponse: async () => {
      await window.getQueryClient().invalidateQueries(authQueryOptions());
      await window.getRouter().invalidate();
    },
  },
});
