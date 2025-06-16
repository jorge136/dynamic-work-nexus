
import { 
  Calendar, 
  Folder, 
  Users, 
  Search, 
  Settings,
  Home,
  Plus,
  Briefcase,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  isOpen: boolean;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "projects", label: "Centro de Proyectos", icon: Folder },
  { id: "professions", label: "Profesiones", icon: Briefcase },
  { id: "marketplace", label: "Marketplace", icon: Search },
  { id: "workspaces", label: "Espacios de Trabajo", icon: Users },
  { id: "tools", label: "Herramientas Pro", icon: Settings },
  { id: "profile", label: "Mi Perfil", icon: User },
];

export const Sidebar = ({ activeModule, onModuleChange, isOpen }: SidebarProps) => {
  const { profile } = useAuth();

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

        {profile && (
          <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">👤 {profile.full_name}</h3>
            <p className="text-sm text-slate-700 mb-1">
              {profile.profession || 'Sin profesión'}
            </p>
            <p className="text-xs text-slate-600 capitalize">
              Rol: {profile.role}
            </p>
          </div>
        )}

        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tip del día</h3>
          <p className="text-sm text-blue-700">
            Explora las diferentes profesiones y sus subáreas para encontrar nuevas oportunidades.
          </p>
        </div>
      </div>
    </aside>
  );
};
