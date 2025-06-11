import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";

import { createRouter } from "~/router";

export default createStartHandler({
  createRouter,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
})(defaultStreamHandler);
