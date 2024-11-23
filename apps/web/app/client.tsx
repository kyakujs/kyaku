/// <reference types="vinxi/types/client" />
import { StartClient } from "@tanstack/start";
import { hydrateRoot } from "react-dom/client";

import { createRouter } from "~/libs/router";

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);
