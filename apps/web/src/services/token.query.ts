import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const tokenQueryOptions = () =>
  queryOptions({
    queryKey: ["getToken"],
    queryFn: async () => {
      const response = await fetch("/api/auth/token");

      try {
        return (await response.json()) as { token: string | undefined };
      } catch {
        return { token: undefined };
      }
    },
    select: (data) => data.token,
  });

export const useTokenQuery = () => {
  return useSuspenseQuery(tokenQueryOptions());
};
