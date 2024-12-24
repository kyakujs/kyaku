import type { ClientOptions } from "better-auth";
import { adminClient, usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const authClientOptions: ClientOptions = {
  baseURL: process.env.VITE_APP_BASE_URL,
  plugins: [usernameClient(), adminClient()],
};

export { authClientOptions, createAuthClient };
