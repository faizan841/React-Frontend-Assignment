import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import {
  Settings,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  MemoryStick,
  HardDrive,
  Globe,
} from "lucide-react";
import type { ServiceNodeData, ResourceTab } from "@/types";
import { cn } from "@/lib/utils";

const resourceTabs: { key: ResourceTab; label: string; icon: typeof Cpu }[] = [
  { key: "cpu", label: "CPU", icon: Cpu },
  { key: "memory", label: "Memory", icon: MemoryStick },
  { key: "disk", label: "Disk", icon: HardDrive },
  { key: "region", label: "Region", icon: Globe },
];

function ServiceNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as ServiceNodeData;
  const activeTab = nodeData.activeResourceTab ?? "cpu";

  const metricValue = (tab: ResourceTab) => {
    switch (tab) {
      case "cpu":
        return nodeData.metrics.cpu.toFixed(2);
      case "memory":
        return `${nodeData.metrics.memoryGB.toFixed(2)} GB`;
      case "disk":
        return `${nodeData.metrics.diskGB.toFixed(2)} GB`;
      case "region":
        return `${nodeData.metrics.region}`;
    }
  };

  return (
    <div
      className={cn(
        // Responsive width: narrower on small screens
        "w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px]",
        "rounded-xl border bg-card p-3 md:p-4 shadow-lg transition-colors",
        selected ? "border-foreground/40" : "border-border",
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-muted-foreground"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-muted-foreground"
      />

      {/* Header */}
      <div className="mb-2.5 md:mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-sm md:text-base">
            {nodeData.icon}
          </span>
          <span className="text-xs md:text-sm font-semibold text-card-foreground truncate">
            {nodeData.label}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          <span className="rounded-md border border-emerald-700/50 bg-emerald-950/40 px-1.5 md:px-2 py-0.5 md:py-1 text-xs font-medium text-emerald-400 whitespace-nowrap">
            {nodeData.pricePerHr}
          </span>
          <button className="flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-md bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <Settings size={12} className="md:w-3.5 md:h-3.5" />
          </button>
        </div>
      </div>

      {/* Metric values row */}
      <div className="mb-1 md:mb-1.5 grid grid-cols-4 text-center text-xs text-muted-foreground">
        {resourceTabs.map((tab) => (
          <span key={tab.key} className="truncate px-0.5">
            {metricValue(tab.key)}
          </span>
        ))}
      </div>

      {/* Resource Tabs */}
      <div className="mb-2.5 md:mb-3 grid grid-cols-4 gap-0.5 md:gap-1 rounded-md bg-secondary p-0.5 md:p-1">
        {resourceTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <div
              key={tab.key}
              className={cn(
                "flex items-center justify-center gap-1 rounded-md px-1 md:px-2 py-1 md:py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon size={10} className="md:w-3 md:h-3 shrink-0" />
              <span className="hidden sm:inline truncate">{tab.label}</span>
            </div>
          );
        })}
      </div>

      {/* Gradient Slider */}
      <div className="mb-2.5 md:mb-3 flex items-center gap-2 md:gap-3">
        <div className="relative h-1.5 flex-1 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500">
          <div
            className="absolute top-1/2 h-3 w-3 md:h-3.5 md:w-3.5 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow"
            style={{ left: `calc(${nodeData.sliderValue}% - 6px)` }}
          />
        </div>
        <div className="w-14 md:w-20 rounded-md border border-border bg-secondary px-1.5 md:px-2 py-1 md:py-1.5 text-right text-xs text-foreground">
          {nodeData.metrics.cpu.toFixed(2)}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {nodeData.status === "Success" ? (
          <span className="flex items-center gap-1 md:gap-1.5 rounded-md border border-emerald-700/50 bg-emerald-950/40 px-1.5 md:px-2 py-0.5 md:py-1 text-xs font-medium text-emerald-400">
            <CheckCircle2 size={10} className="md:w-3 md:h-3" />
            <span>Success</span>
          </span>
        ) : (
          <span className="flex items-center gap-1 md:gap-1.5 rounded-md border border-red-700/50 bg-red-950/40 px-1.5 md:px-2 py-0.5 md:py-1 text-xs font-medium text-red-400">
            <AlertTriangle size={10} className="md:w-3 md:h-3" />
            <span>Error</span>
          </span>
        )}
        <span className="text-sm md:text-base font-bold italic text-orange-400">
          aws
        </span>
      </div>
    </div>
  );
}

export default memo(ServiceNode);
