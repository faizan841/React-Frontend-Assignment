import { useState, useEffect } from "react";
import { useReactFlow, type Node } from "@xyflow/react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import type { ServiceNodeData, ActiveInspectorTab } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function NodeInspector() {
  const selectedNodeId = useAppStore((s) => s.selectedNodeId);
  const activeTab = useAppStore((s) => s.activeInspectorTab);
  const setActiveTab = useAppStore((s) => s.setActiveInspectorTab);
  const { getNode, setNodes } = useReactFlow();

  const node = selectedNodeId ? getNode(selectedNodeId) : undefined;
  const nodeData = node?.data as unknown as ServiceNodeData | undefined;

  const [localSlider, setLocalSlider] = useState(0);
  const [localName, setLocalName] = useState("");
  const [localDescription, setLocalDescription] = useState("");

  useEffect(() => {
    if (nodeData) {
      setLocalSlider(nodeData.sliderValue ?? 0);
      setLocalName(nodeData.label ?? "");
      setLocalDescription(nodeData.description ?? "");
    }
  }, [selectedNodeId]);

  const updateNodeData = (updates: Partial<ServiceNodeData>) => {
    if (!selectedNodeId) return;
    setNodes((nds: Node[]) =>
      nds.map((n) =>
        n.id === selectedNodeId ? { ...n, data: { ...n.data, ...updates } } : n,
      ),
    );
  };

  const handleSliderChange = (value: number[]) => {
    const val = value[0];
    setLocalSlider(val);
    updateNodeData({ sliderValue: val });
  };

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(100, Math.max(0, Number(e.target.value) || 0));
    setLocalSlider(val);
    updateNodeData({ sliderValue: val });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
    updateNodeData({ label: e.target.value });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setLocalDescription(e.target.value);
    updateNodeData({ description: e.target.value });
  };

  if (!nodeData) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 md:p-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-muted-foreground text-xs">↖</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            Select a node to inspect
          </p>
          <p className="text-xs text-muted-foreground/60">
            Click any service card on the canvas
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 md:gap-4 p-3 md:p-4">
      {/* Header: icon + name + status pill */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm md:text-base shrink-0">{nodeData.icon}</span>
          <h3 className="text-xs md:text-sm font-semibold text-foreground truncate">
            {nodeData.label}
          </h3>
        </div>
        {nodeData.status === "Success" ? (
          <span className="flex shrink-0 items-center gap-1 md:gap-1.5 rounded-full border border-emerald-700/50 bg-emerald-950/40 px-2 md:px-2.5 py-0.5 md:py-1 text-xs font-medium text-emerald-400">
            <CheckCircle2 size={10} className="md:w-3 md:h-3" />
            Healthy
          </span>
        ) : (
          <span className="flex shrink-0 items-center gap-1 md:gap-1.5 rounded-full border border-red-700/50 bg-red-950/40 px-2 md:px-2.5 py-0.5 md:py-1 text-xs font-medium text-red-400">
            <AlertTriangle size={10} className="md:w-3 md:h-3" />
            Degraded
          </span>
        )}
      </div>

      {/* Pricing */}
      <div className="flex items-center justify-between rounded-md bg-secondary px-3 py-2">
        <span className="text-xs text-muted-foreground">Price</span>
        <span className="text-xs font-semibold text-emerald-400">
          {nodeData.pricePerHr}
        </span>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as ActiveInspectorTab)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-secondary h-8 md:h-9">
          <TabsTrigger value="config" className="text-xs">
            Config
          </TabsTrigger>
          <TabsTrigger value="runtime" className="text-xs">
            Runtime
          </TabsTrigger>
        </TabsList>

        {/* Config */}
        <TabsContent
          value="config"
          className="mt-3 md:mt-4 flex flex-col gap-3 md:gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="node-name"
              className="text-xs text-muted-foreground"
            >
              Node Name
            </Label>
            <Input
              id="node-name"
              value={localName}
              onChange={handleNameChange}
              className="h-8 md:h-9 bg-secondary text-xs md:text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="node-desc"
              className="text-xs text-muted-foreground"
            >
              Description
            </Label>
            <Textarea
              id="node-desc"
              value={localDescription}
              onChange={handleDescriptionChange}
              placeholder="Add a description..."
              className="min-h-16 md:min-h-20 resize-none bg-secondary text-xs md:text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">
                CPU Allocation
              </Label>
              <span className="text-xs text-muted-foreground font-medium">
                {localSlider}%
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Slider
                value={[localSlider]}
                onValueChange={handleSliderChange}
                min={0}
                max={100}
                step={1}
                className="flex-1"
              />
              <Input
                type="number"
                value={localSlider}
                onChange={handleNumericChange}
                min={0}
                max={100}
                className="w-14 md:w-16 h-8 md:h-9 bg-secondary text-right text-xs md:text-sm"
              />
            </div>
          </div>
        </TabsContent>

        {/* Runtime */}
        <TabsContent
          value="runtime"
          className="mt-3 md:mt-4 flex flex-col gap-2 md:gap-3"
        >
          <div className="grid grid-cols-2 gap-2">
            <RuntimeStat label="CPU" value={nodeData.metrics.cpu.toFixed(2)} />
            <RuntimeStat
              label="Memory"
              value={`${nodeData.metrics.memoryGB.toFixed(2)} GB`}
            />
            <RuntimeStat
              label="Disk"
              value={`${nodeData.metrics.diskGB.toFixed(2)} GB`}
            />
            <RuntimeStat
              label="Region"
              value={String(nodeData.metrics.region)}
            />
          </div>

          <div className="rounded-md border border-border bg-secondary p-2.5 md:p-3">
            <p className="text-xs text-muted-foreground">Provider</p>
            <p className="mt-1 text-xs md:text-sm font-semibold uppercase text-foreground">
              {nodeData.provider}
            </p>
          </div>

          <div className="rounded-md border border-border bg-secondary p-2.5 md:p-3">
            <p className="text-xs text-muted-foreground">Status</p>
            <div className="mt-1.5">
              {nodeData.status === "Success" ? (
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <CheckCircle2 size={11} /> Operational
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-medium text-red-400">
                  <AlertTriangle size={11} /> Incident detected
                </span>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function RuntimeStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-secondary p-2 md:p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 md:mt-1 text-xs md:text-sm font-semibold text-foreground">
        {value}
      </p>
    </div>
  );
}

export default NodeInspector;
