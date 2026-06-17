import { useState, useEffect } from "react";
import { ChevronDown, Share2, Moon, Sun, Menu, PanelRight } from "lucide-react";
import { useApps } from "@/hooks/useApps";
import { useAppStore } from "@/store/useAppStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function TopBar() {
  const { data: apps, isLoading } = useApps();
  const selectedAppId = useAppStore((s) => s.selectedAppId);
  const setSelectedAppId = useAppStore((s) => s.setSelectedAppId);
  const toggleMobilePanel = useAppStore((s) => s.toggleMobilePanel);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [theme]);

  const currentApp = apps?.find((a) => a.id === selectedAppId);
  const filteredApps = apps?.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-11 md:h-12 shrink-0 items-center justify-between border-b border-border bg-card px-2 md:px-3 transition-colors">
      {/* Left side */}
      <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
        {/* Logo */}
        <div className="flex h-6 w-6 md:h-7 md:w-7 shrink-0 items-center justify-center rounded bg-foreground text-background text-xs font-bold">
          ▲
        </div>

        {/* App selector dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="flex h-7 md:h-8 items-center gap-1 md:gap-2 rounded-md px-2 md:px-3 text-xs md:text-sm font-medium max-w-[140px] sm:max-w-[200px] md:max-w-none"
            >
              {isLoading ? (
                <span className="text-muted-foreground">Loading...</span>
              ) : (
                <>
                  <span className="hidden sm:inline">{currentApp?.icon}</span>
                  <span className="truncate">
                    {currentApp?.name ?? "Select app"}
                  </span>
                </>
              )}
              <ChevronDown size={12} className="shrink-0" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="w-64 md:w-72 border-border bg-card p-2 md:p-3"
          >
            <p className="text-foreground mb-2 px-1 text-sm font-semibold">
              Application
            </p>
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-2 h-8 md:h-9 bg-secondary text-sm"
            />
            <div className="max-h-48 md:max-h-64 overflow-y-auto">
              {filteredApps?.map((app) => (
                <DropdownMenuItem
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm focus:bg-secondary cursor-pointer"
                >
                  <span
                    className="flex h-6 w-6 md:h-7 md:w-7 shrink-0 items-center justify-center rounded text-xs"
                    style={{ backgroundColor: app.color }}
                  >
                    {app.icon}
                  </span>
                  <span className="text-foreground flex-1 truncate text-xs md:text-sm">
                    {app.name}
                  </span>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-0.5 md:gap-1 shrink-0">
        {/* Share — hidden on smallest screens */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex h-7 w-7 md:h-8 md:w-8 text-muted-foreground hover:text-foreground"
        >
          <Share2 size={14} className="md:w-4 md:h-4" />
        </Button>

        {/* Moon */}
        <Button
          variant="ghost"
          size="icon"
          className={`h-7 w-7 md:h-8 md:w-8 transition-colors ${
            theme === "dark"
              ? "bg-secondary text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setTheme("dark")}
          title="Dark theme"
        >
          <Moon size={14} className="md:w-4 md:h-4" />
        </Button>

        {/* Sun */}
        <Button
          variant="ghost"
          size="icon"
          className={`h-7 w-7 md:h-8 md:w-8 transition-colors ${
            theme === "light"
              ? "bg-secondary text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setTheme("light")}
          title="Light theme"
        >
          <Sun size={14} className="md:w-4 md:h-4" />
        </Button>

        {/* Panel toggle — visible on < lg, opens right/bottom panel */}
        <Button
          variant="ghost"
          size="icon"
          className="flex lg:hidden h-7 w-7 md:h-8 md:w-8 text-muted-foreground hover:text-foreground"
          onClick={() => toggleMobilePanel(true)}
          title="Open panel"
        >
          {/* Bottom sheet icon on mobile, side panel icon on tablet */}
          <PanelRight size={14} className="hidden md:block md:w-4 md:h-4" />
          <Menu size={14} className="block md:hidden" />
        </Button>

        {/* Avatar */}
        <div className="h-6 w-6 md:h-7 md:w-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shrink-0" />
      </div>
    </div>
  );
}

export default TopBar;
