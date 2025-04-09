import type { UseSuspenseQueryResult } from "@tanstack/react-query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import type { Authenticated } from "~/services/auth.api";
import { getAuth } from "~/services/auth.api";

export const authQueryOptions = () =>
  queryOptions({
    queryKey: ["getAuth"],
    queryFn: () => getAuth(),
    refetchInterval: 1000 * 60 * 15, // 15 minutes - default expiration time for JWT
  });

export const useAuthQuery = () => {
  return useSuspenseQuery(authQueryOptions());
};

export const useAuthedQuery = () => {
  const authQuery = useAuthQuery();

  if (authQuery.data.isAuthenticated === false) {
    throw new Error("Not authenticated");
  }

  return authQuery as UseSuspenseQueryResult<Authenticated>;
};
