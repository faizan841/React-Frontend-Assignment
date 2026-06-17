import { http, HttpResponse, delay } from "msw";
import { apps, graphs } from "./data";

// Toggle this to true to simulate random failures
const SIMULATE_RANDOM_ERRORS = false;

export const handlers = [
  http.get("/api/apps", async () => {
    await delay(600);

    if (SIMULATE_RANDOM_ERRORS && Math.random() < 0.2) {
      return HttpResponse.json(
        { error: "Failed to fetch apps" },
        { status: 500 },
      );
    }

    return HttpResponse.json(apps);
  }),

  http.get("/api/apps/:appId/graph", async ({ params }) => {
    await delay(800);

    const { appId } = params;
    const graph = graphs[appId as string];

    if (SIMULATE_RANDOM_ERRORS && Math.random() < 0.2) {
      return HttpResponse.json(
        { error: "Failed to fetch graph data" },
        { status: 500 },
      );
    }

    if (!graph) {
      return HttpResponse.json({ error: "App not found" }, { status: 404 });
    }

    return HttpResponse.json(graph);
  }),
];
