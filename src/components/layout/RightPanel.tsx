import { X, ChevronDown } from "lucide-react";
import { useApps } from "@/hooks/useApps";
import { useAppStore } from "@/store/useAppStore";
import NodeInspector from "@/components/inspector/NodeInspector";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function RightPanel() {
  const { data: apps, isLoading, error } = useApps();
  const selectedAppId = useAppStore((s) => s.selectedAppId);
  const setSelectedAppId = useAppStore((s) => s.setSelectedAppId);
  const isMobilePanelOpen = useAppStore((s) => s.isMobilePanelOpen);
  const toggleMobilePanel = useAppStore((s) => s.toggleMobilePanel);

  return (
    <>
      {/* Backdrop — mobile + tablet only */}
      {isMobilePanelOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => toggleMobilePanel(false)}
        />
      )}

      {/*
        MOBILE (< md):   bottom sheet, slides up from bottom
        TABLET (md–lg):  side drawer, slides in from right
        DESKTOP (lg+):   static panel, always visible in flex row
      */}
      <div
        className={cn(
          "bg-card border-border transition-transform duration-300 ease-in-out",

          // ── MOBILE: bottom sheet ──────────────────────────────
          // Fixed to bottom, full width, partial height, slides up/down
          "fixed bottom-0 left-0 right-0 z-50",
          "h-[70svh] w-full rounded-t-2xl border-t",
          isMobilePanelOpen ? "translate-y-0" : "translate-y-full",

          // ── TABLET (md): side drawer from right ───────────────
          "md:left-auto md:right-0 md:top-11 md:bottom-auto",
          "md:h-[calc(100svh-2.75rem)] md:w-[300px] md:rounded-none md:border-t-0 md:border-l",
          isMobilePanelOpen
            ? "md:translate-y-0 md:translate-x-0"
            : "md:translate-y-0 md:translate-x-full",

          // ── DESKTOP (lg+): static, part of flex row ───────────
          "lg:static lg:z-0 lg:h-full lg:w-[300px] xl:w-[320px]",
          "lg:translate-x-0 lg:translate-y-0",
          "lg:rounded-none lg:border-t-0 lg:border-l",
        )}
      >
        <div className="flex h-full flex-col overflow-hidden">
          {/* Drag handle — mobile only */}
          <div className="flex shrink-0 justify-center pt-2 pb-1 md:hidden">
            <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Header — mobile + tablet (close button) */}
          <div className="flex shrink-0 items-center justify-between border-b border-border px-3 py-2 lg:hidden">
            <h2 className="text-sm font-semibold text-foreground">Panel</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => toggleMobilePanel(false)}
            >
              {/* Down arrow on mobile (bottom sheet), X on tablet (side drawer) */}
              <ChevronDown size={16} className="md:hidden" />
              <X size={16} className="hidden md:block" />
            </Button>
          </div>

          {/* Apps list */}
          <div className="shrink-0 border-b border-border p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Applications
            </p>

            {isLoading && (
              <div className="flex flex-col gap-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-8 w-full rounded-md" />
                ))}
              </div>
            )}

            {error && (
              <p className="rounded-md bg-destructive/10 px-2 py-1.5 text-xs text-destructive">
                Failed to load apps
              </p>
            )}

            {apps && (
              <div className="flex flex-col gap-0.5">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors",
                      selectedAppId === app.id
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                    )}
                  >
                    <span
                      className="flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center rounded text-xs"
                      style={{ backgroundColor: app.color }}
                    >
                      {app.icon}
                    </span>
                    <span className="flex-1 truncate text-xs">{app.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Node Inspector — scrollable */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            <NodeInspector />
          </div>
        </div>
      </div>
    </>
  );
}

export default RightPanel;
