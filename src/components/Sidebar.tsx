
import { 
  Calendar, 
  Folder, 
  Users, 
  Search, 
  Settings,
  Home,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  isOpen: boolean;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "projects", label: "Centro de Proyectos", icon: Folder },
  { id: "marketplace", label: "Marketplace", icon: Search },
  { id: "workspaces", label: "Espacios de Trabajo", icon: Users },
  { id: "tools", label: "Herramientas Pro", icon: Settings },
];

export const Sidebar = ({ activeModule, onModuleChange, isOpen }: SidebarProps) => {
  if (!isOpen) return null;

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 z-40">
      <div className="p-6">
        <Button className="w-full mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Proyecto
        </Button>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeModule === item.id
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-500"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tip del día</h3>
          <p className="text-sm text-blue-700">
            Usa el asistente IA para automatizar reportes de progreso de tus proyectos.
          </p>
        </div>
      </div>
    </aside>
  );
};
