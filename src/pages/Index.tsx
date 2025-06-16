
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { ProjectCenter } from "@/components/ProjectCenter";
import { Marketplace } from "@/components/Marketplace";
import { WorkSpaces } from "@/components/WorkSpaces";
import { ToolsConsole } from "@/components/ToolsConsole";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard />;
      case "projects":
        return <ProjectCenter />;
      case "marketplace":
        return <Marketplace />;
      case "workspaces":
        return <WorkSpaces />;
      case "tools":
        return <ToolsConsole />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex">
        <Sidebar 
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          isOpen={sidebarOpen}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        } p-6 pt-20`}>
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
};

export default Index;
