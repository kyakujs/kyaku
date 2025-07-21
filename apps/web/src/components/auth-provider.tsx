import { createContext, useContext, useMemo } from "react";

import { authClient } from "~/libs/auth-client";
import { useTokenQuery } from "~/services/token.query";

interface AuthContext {
  user?: NonNullable<
    ReturnType<typeof authClient.useSession>["data"]
  >["user"] & { username?: string };
  token: string | undefined;
  isPending: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: token } = useTokenQuery();
  const { data, isPending } = authClient.useSession();

  const authContext = useMemo(
    () => ({
      user: data?.user,
      token,
      isPending,
      login: async (callbackURL?: string) => {
        await authClient.signIn.social({
          provider: "github",
          callbackURL,
        });
      },
      logout: async () => {
        await authClient.signOut();
      },
    }),
    [data?.user, isPending, token],
  );

  return <AuthContext value={authContext}>{children}</AuthContext>;
};
