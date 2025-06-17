
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  FileText,
  Star,
  Clock,
  ChevronRight,
  Settings,
  Download
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export const Dashboard = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCreateProject = () => {
    toast({
      title: "Nuevo Proyecto",
      description: "Funcionalidad de creación de proyectos en desarrollo",
    });
  };

  const handleJoinTeam = () => {
    toast({
      title: "Unirse al Equipo",
      description: "Funcionalidad para unirse a equipos en desarrollo",
    });
  };

  const handleViewCalendar = () => {
    toast({
      title: "Calendario",
      description: "Abriendo vista de calendario...",
    });
  };

  const handleViewReports = () => {
    toast({
      title: "Reportes",
      description: "Generando reportes de actividad...",
    });
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: "Acción Rápida",
      description: `Ejecutando: ${action}`,
    });
  };

  const handleDownloadReport = async () => {
    setLoading(true);
    try {
      // Simular descarga de reporte
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Descarga Completada",
        description: "El reporte se ha descargado correctamente",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-600 mt-2">
            Bienvenido de vuelta, {profile?.full_name || 'Usuario'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button onClick={handleCreateProject} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Proyecto
          </Button>
          <Button variant="outline" onClick={handleDownloadReport} disabled={loading}>
            <Download className="h-4 w-4 mr-2" />
            {loading ? 'Descargando...' : 'Descargar Reporte'}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Proyectos Activos</CardTitle>
            <div className="text-2xl font-bold">12</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2 este mes
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Colaboradores</CardTitle>
            <div className="text-2xl font-bold">48</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-blue-600">
              <Users className="h-4 w-4 mr-1" />
              En 8 equipos
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Tareas Pendientes</CardTitle>
            <div className="text-2xl font-bold">7</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-orange-600">
              <Clock className="h-4 w-4 mr-1" />
              2 urgentes
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Progreso General</CardTitle>
            <div className="text-2xl font-bold">78%</div>
          </CardHeader>
          <CardContent>
            <Progress value={78} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Acciones Rápidas
          </CardTitle>
          <CardDescription>
            Accede rápidamente a las funciones más utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => handleQuickAction('Crear Tarea')}
            >
              <Plus className="h-6 w-6" />
              <span className="text-sm">Crear Tarea</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={handleJoinTeam}
            >
              <Users className="h-6 w-6" />
              <span className="text-sm">Unirse a Equipo</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={handleViewCalendar}
            >
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Ver Calendario</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={handleViewReports}
            >
              <FileText className="h-6 w-6" />
              <span className="text-sm">Reportes</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Proyectos Recientes</CardTitle>
            <CardDescription>Tus últimos proyectos activos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Sistema de Gestión", progress: 85, status: "En progreso", priority: "Alta" },
              { name: "App Móvil", progress: 60, status: "Desarrollo", priority: "Media" },
              { name: "Landing Page", progress: 95, status: "Revisión", priority: "Baja" },
            ].map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{project.name}</h4>
                    <Badge variant={project.priority === 'Alta' ? 'destructive' : project.priority === 'Media' ? 'default' : 'secondary'}>
                      {project.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>{project.status}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="w-20 h-2" />
                      <span>{project.progress}%</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleQuickAction(`Abrir ${project.name}`)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en tus proyectos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: "Tarea completada", project: "Sistema de Gestión", time: "Hace 2 horas", user: "Ana García" },
              { action: "Nuevo comentario", project: "App Móvil", time: "Hace 4 horas", user: "Carlos López" },
              { action: "Archivo subido", project: "Landing Page", time: "Hace 1 día", user: "María Rodríguez" },
              { action: "Reunión programada", project: "Sistema de Gestión", time: "Hace 2 días", user: "Juan Pérez" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border-l-2 border-blue-100">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-slate-600">
                    {activity.project} • {activity.user}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* User Role Info */}
      {profile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Tu Perfil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {profile.full_name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="font-semibold">{profile.full_name}</h3>
                  <p className="text-sm text-slate-600">{profile.email}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Badge className="capitalize">
                  Rol: {profile.role}
                </Badge>
                {profile.profession && (
                  <Badge variant="outline">
                    {profile.profession}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
