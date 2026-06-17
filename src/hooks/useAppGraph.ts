import { useQuery } from "@tanstack/react-query";
import type { GraphData } from "../types";

async function fetchGraph(appId: string): Promise<GraphData> {
  const res = await fetch(`/api/apps/${appId}/graph`);
  if (!res.ok) {
    throw new Error("Failed to fetch graph data");
  }
  return res.json();
}

export function useAppGraph(appId: string | null) {
  return useQuery({
    queryKey: ["graph", appId],
    queryFn: () => fetchGraph(appId as string),
    enabled: !!appId,
  });
}
