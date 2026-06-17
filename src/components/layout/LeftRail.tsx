import {
  Code,
  Database,
  Box,
  Boxes,
  Leaf,
  Grid3x3,
  Network,
} from "lucide-react";

const railIcons = [
  { icon: Code, label: "Github" },
  { icon: Database, label: "Postgres" },
  { icon: Boxes, label: "Redis" },
  { icon: Leaf, label: "MongoDB" },
  { icon: Box, label: "Storage" },
  { icon: Grid3x3, label: "Grid" },
  { icon: Network, label: "Network" },
];

function LeftRail() {
  return (
    <div
      className={[
        // Hidden on mobile, visible from md up
        "hidden md:flex",
        "w-12 lg:w-14",
        "flex-col items-center justify-center gap-1 lg:gap-2",
        "border-r border-border bg-card py-3",
        "transition-colors shrink-0",
      ].join(" ")}
    >
      {railIcons.map(({ icon: Icon, label }, idx) => (
        <button
          key={label}
          title={label}
          className={[
            "flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-md transition-colors",
            idx === 0
              ? "bg-secondary text-foreground"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground",
          ].join(" ")}
        >
          <Icon size={16} className="lg:w-[18px] lg:h-[18px]" />
        </button>
      ))}
    </div>
  );
}

export default LeftRail;
