import { ReactFlowProvider } from "@xyflow/react";
import TopBar from "@/components/layout/TopBar";
import LeftRail from "@/components/layout/LeftRail";
import RightPanel from "@/components/layout/RightPanel";
import AppCanvas from "@/components/canvas/AppCanvas";

function App() {
  return (
    <ReactFlowProvider>
      <div className="flex h-svh w-screen overflow-hidden bg-background text-foreground">
        {/* LeftRail: hidden on mobile, visible md+ */}
        <LeftRail />

        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          <TopBar />
          <div className="flex flex-1 min-h-0 min-w-0 overflow-hidden">
            <AppCanvas />
            {/* RightPanel: drawer on mobile/tablet, static on desktop */}
            <RightPanel />
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
