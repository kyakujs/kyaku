import handler from "@tanstack/react-start/server-entry";

export default {
  async fetch(request: Request): Promise<Response> {
    const response = await handler.fetch(request);
    return response;
  },
};
