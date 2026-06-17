import { useEffect, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Node,
  type Edge,
  type NodeTypes,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useAppGraph } from "@/hooks/useAppGraph";
import { useAppStore } from "@/store/useAppStore";
import ServiceNode from "./nodes/ServiceNode";

const nodeTypes: NodeTypes = {
  serviceNode: ServiceNode,
};

function AppCanvas() {
  const selectedAppId = useAppStore((s) => s.selectedAppId);
  const selectedNodeId = useAppStore((s) => s.selectedNodeId);
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId);
  const toggleMobilePanel = useAppStore((s) => s.toggleMobilePanel);

  const {
    data: graphData,
    isLoading,
    error,
    refetch,
  } = useAppGraph(selectedAppId);
  const { fitView } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (graphData) {
      setNodes(graphData.nodes as unknown as Node[]);
      setEdges(graphData.edges as unknown as Edge[]);
      requestAnimationFrame(() => fitView({ padding: 0.15, duration: 400 }));
    }
  }, [graphData, setNodes, setEdges, fitView]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({ ...n, selected: n.id === selectedNodeId })),
    );
  }, [selectedNodeId, setNodes]);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const deletedIds = changes
        .filter((c) => c.type === "remove")
        .map((c) => c.id);

      if (
        deletedIds.length > 0 &&
        selectedNodeId &&
        deletedIds.includes(selectedNodeId)
      ) {
        setSelectedNodeId(null);
      }

      changes.forEach((c) => {
        if (c.type === "select") {
          if (c.selected) setSelectedNodeId(c.id);
          else if (c.id === selectedNodeId) setSelectedNodeId(null);
        }
      });

      onNodesChange(changes);
    },
    [onNodesChange, selectedNodeId, setSelectedNodeId],
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
      toggleMobilePanel(true);
    },
    [setSelectedNodeId, toggleMobilePanel],
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  const proOptions = useMemo(() => ({ hideAttribution: true }), []);

  if (isLoading) {
    return (
      <div
        style={{ flex: 1, minWidth: 0, minHeight: 0 }}
        className="flex items-center justify-center bg-background"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 md:h-8 md:w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
          <p className="text-xs md:text-sm text-muted-foreground">
            Loading graph...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{ flex: 1, minWidth: 0, minHeight: 0 }}
        className="flex items-center justify-center bg-background p-4"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-xs md:text-sm text-red-400">
            Failed to load graph data
          </p>
          <button
            onClick={() => refetch()}
            className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-secondary/80 text-foreground"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, minWidth: 0, minHeight: 0, position: "relative" }}>
      <ReactFlow
        style={{ width: "100%", height: "100%" }}
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        deleteKeyCode={["Backspace", "Delete"]}
        minZoom={0.1}
        maxZoom={2}
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#2a2a2a"
        />
        {/* Controls: bottom-left on all sizes */}
        <Controls
          className="!bottom-4 !left-4 !top-auto"
          showInteractive={false}
        />
        {/* MiniMap: hidden on mobile to save space */}
        <MiniMap
          className="!hidden md:!block"
          maskColor="rgba(0,0,0,0.5)"
          nodeColor="#3a3a3a"
          style={{ width: 120, height: 80 }}
        />
      </ReactFlow>
    </div>
  );
}

export default AppCanvas;
