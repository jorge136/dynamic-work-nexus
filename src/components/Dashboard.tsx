
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Users, Briefcase, Settings, TrendingUp, Shield, Eye } from "lucide-react";

export const Dashboard = () => {
  const { profile } = useAuth();

  const getRoleIcon = () => {
    if (!profile) return <Eye className="h-5 w-5" />;
    switch (profile.role) {
      case 'admin': return <Shield className="h-5 w-5 text-blue-600" />;
      case 'ayudante': return <Users className="h-5 w-5 text-green-600" />;
      default: return <Eye className="h-5 w-5 text-slate-600" />;
    }
  };

  const getRoleName = () => {
    if (!profile) return 'Cargando...';
    switch (profile.role) {
      case 'admin': return 'Administrador';
      case 'ayudante': return 'Ayudante';
      default: return 'Visitante';
    }
  };

  const stats = [
    {
      title: "Proyectos Activos",
      value: "12",
      description: "Proyectos en desarrollo",
      icon: <Briefcase className="h-6 w-6 text-blue-600" />,
      trend: "+2 este mes"
    },
    {
      title: "Profesionales",
      value: "48",
      description: "Usuarios registrados",
      icon: <Users className="h-6 w-6 text-green-600" />,
      trend: "+8 nuevos"
    },
    {
      title: "Servicios",
      value: "156",
      description: "Servicios disponibles",
      icon: <Settings className="h-6 w-6 text-purple-600" />,
      trend: "+12 agregados"
    },
    {
      title: "Actividad",
      value: "94%",
      description: "Tasa de actividad",
      icon: <TrendingUp className="h-6 w-6 text-orange-600" />,
      trend: "+5% vs mes pasado"
    }
  ];

  const recentActivities = [
    { action: "Nuevo proyecto creado", user: "María García", time: "Hace 2 horas", type: "project" },
    { action: "Usuario registrado", user: "Carlos López", time: "Hace 4 horas", type: "user" },
    { action: "Servicio actualizado", user: "Ana Martín", time: "Hace 6 horas", type: "service" },
    { action: "Proyecto completado", user: "Luis Rodríguez", time: "Hace 1 día", type: "completion" }
  ];

  return (
    <div className="space-y-6">
      {/* Header con información del usuario */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            ¡Bienvenido, {profile?.full_name || 'Usuario'}!
          </h1>
          <div className="flex items-center gap-2 mt-2">
            {getRoleIcon()}
            <span className="text-slate-600">Rol: {getRoleName()}</span>
            {profile?.profession && (
              <>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">{profile.profession}</span>
              </>
            )}
          </div>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          {getRoleIcon()}
          {getRoleName()}
        </Badge>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-500">{stat.description}</p>
              <div className="text-xs text-green-600 mt-1">{stat.trend}</div>
            </CardContent>
          </Card>
       ))}
      </div>

      {/* Sección principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actividad reciente */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas acciones en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 border-b border-slate-100 pb-3 last:border-0">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'project' ? 'bg-blue-500' :
                    activity.type === 'user' ? 'bg-green-500' :
                    activity.type === 'service' ? 'bg-purple-500' : 'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.user} • {activity.time}</p>
                  </div>
                </div>
             ))}
            </div>
          </CardContent>
        </Card>

        {/* Acciones rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Accesos directos a funciones principales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Briefcase className="h-4 w-4 mr-2" />
              Crear Proyecto
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Buscar Profesionales
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configurar Perfil
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Ver Estadísticas
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Panel informativo según el rol */}
      <Card>
        <CardHeader>
          <CardTitle>Panel de {getRoleName()}</CardTitle>
          <CardDescription>
            Información específica para tu rol en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          {profile?.role === 'admin' && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                Como administrador, tienes acceso completo a todas las funciones de la plataforma:
              </p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4">
                <li>• Gestión completa de usuarios y roles</li>
                <li>• Configuración del sistema</li>
                <li>• Acceso a todas las estadísticas</li>
                <li>• Moderación de contenido</li>
              </ul>
            </div>
          )}
          
          {profile?.role === 'ayudante' && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                Como ayudante, puedes asistir en la gestión de la plataforma:
              </p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4">
                <li>• Ayudar a usuarios con dudas</li>
                <li>• Moderar contenido básico</li>
                <li>• Crear y gestionar proyectos</li>
                <li>• Acceso a herramientas específicas</li>
              </ul>
            </div>
          )}
          
          {profile?.role === 'visitante' && (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                Como visitante, puedes explorar y usar las funciones básicas:
              </p>
              <ul className="text-sm text-slate-600 space-y-1 ml-4">
                <li>• Explorar profesiones y servicios</li>
                <li>• Conectar con otros profesionales</li>
                <li>• Participar en proyectos</li>
                <li>• Actualizar tu perfil profesional</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
