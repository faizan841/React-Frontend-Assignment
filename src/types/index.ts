export interface App {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export type NodeStatus = "Success" | "Error";

export type ResourceTab = "cpu" | "memory" | "disk" | "region";

export type ActiveInspectorTab = "config" | "runtime";

export interface ResourceMetrics {
  cpu: number;
  memoryGB: number;
  diskGB: number;
  region: number;
}

export interface ServiceNodeData {
  label: string;
  description?: string;
  status: NodeStatus;
  sliderValue: number;
  pricePerHr: string;
  metrics: ResourceMetrics;
  activeResourceTab: ResourceTab;
  icon: string;
  provider: "aws" | "gcp" | "azure";
  [key: string]: unknown;
}

export interface GraphNode {
  id: string;
  type: "serviceNode";
  position: { x: number; y: number };
  data: ServiceNodeData;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface AppStore {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: ActiveInspectorTab;

  setSelectedAppId: (id: string) => void;
  setSelectedNodeId: (id: string | null) => void;
  toggleMobilePanel: (open?: boolean) => void;
  setActiveInspectorTab: (tab: ActiveInspectorTab) => void;
}
