
import { Plus, Users, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const WorkSpaces = () => {
  const workspaces = [
    {
      id: 1,
      name: "E-commerce Team",
      project: "App E-commerce Multitenda",
      members: [
        { name: "Ana García", role: "Frontend", avatar: "/placeholder.svg" },
        { name: "Carlos López", role: "Backend", avatar: "/placeholder.svg" },
        { name: "María Rodríguez", role: "UX/UI", avatar: "/placeholder.svg" },
        { name: "Pablo Martín", role: "QA", avatar: "/placeholder.svg" }
      ],
      lastActivity: "Hace 2 horas",
      status: "Activo",
      tasksCompleted: 15,
      totalTasks: 20
    },
    {
      id: 2,
      name: "Marketing Squad",
      project: "Campaña Marketing Digital",
      members: [
        { name: "Luis Fernández", role: "Marketing", avatar: "/placeholder.svg" },
        { name: "Sara González", role: "Diseño", avatar: "/placeholder.svg" },
        { name: "Diego Torres", role: "Copy", avatar: "/placeholder.svg" }
      ],
      lastActivity: "Hace 30 min",
      status: "Muy Activo",
      tasksCompleted: 18,
      totalTasks: 20
    },
    {
      id: 3,
      name: "FinTech Development",
      project: "Sistema Contable Automatizado",
      members: [
        { name: "Elena Ruiz", role: "Backend", avatar: "/placeholder.svg" },
        { name: "Javier Morales", role: "Contabilidad", avatar: "/placeholder.svg" },
        { name: "Carmen Silva", role: "DevOps", avatar: "/placeholder.svg" }
      ],
      lastActivity: "Hace 1 día",
      status: "Pausado",
      tasksCompleted: 9,
      totalTasks: 20
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Muy Activo": return "bg-green-100 text-green-800";
      case "Activo": return "bg-blue-100 text-blue-800";
      case "Pausado": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Espacios de Trabajo</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Crear Espacio
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Espacios Activos</p>
                <p className="text-2xl font-bold text-slate-900">8</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Miembros</p>
                <p className="text-2xl font-bold text-slate-900">28</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Reuniones Hoy</p>
                <p className="text-2xl font-bold text-slate-900">5</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Horas Activas</p>
                <p className="text-2xl font-bold text-slate-900">156</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workspaces Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {workspaces.map((workspace) => (
          <Card key={workspace.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{workspace.name}</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">{workspace.project}</p>
                </div>
                <Badge className={getStatusColor(workspace.status)}>
                  {workspace.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Progreso de Tareas</span>
                  <span className="text-sm text-slate-600">
                    {workspace.tasksCompleted}/{workspace.totalTasks}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(workspace.tasksCompleted / workspace.totalTasks) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">Equipo ({workspace.members.length})</p>
                <div className="flex -space-x-2">
                  {workspace.members.slice(0, 4).map((member, index) => (
                    <Avatar key={index} className="border-2 border-white h-8 w-8">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                 ))}
                  {workspace.members.length > 4 && (
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 border-2 border-white text-xs font-medium text-slate-600">
                      +{workspace.members.length - 4}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Última actividad: {workspace.lastActivity}</span>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  Ver Kanban
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Entrar
                </Button>
              </div>
            </CardContent>
          </Card>
       ))}
      </div>
    </div>
  );
};
