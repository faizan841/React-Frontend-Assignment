import { useQuery } from "@tanstack/react-query";
import type { App } from "../types";

async function fetchApps(): Promise<App[]> {
  const res = await fetch("/api/apps");
  if (!res.ok) {
    throw new Error("Failed to fetch apps");
  }
  return res.json();
}

export function useApps() {
  return useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
  });
}
