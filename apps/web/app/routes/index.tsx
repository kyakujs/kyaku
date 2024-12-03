import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@kyakujs/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="bg-backround">
      Home
      <Button type="button">Click me</Button>
    </div>
  );
}
