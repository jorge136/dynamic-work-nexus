
import { Calendar, Clock, Users, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Dashboard = () => {
  const stats = [
    {
      title: "Proyectos Activos",
      value: "12",
      change: "+2",
      trend: "up",
      icon: Calendar,
      color: "blue"
    },
    {
      title: "Horas Trabajadas",
      value: "156",
      change: "+24",
      trend: "up",
      icon: Clock,
      color: "green"
    },
    {
      title: "Colaboradores",
      value: "28",
      change: "+5",
      trend: "up",
      icon: Users,
      color: "purple"
    },
    {
      title: "Servicios Vendidos",
      value: "$12,400",
      change: "-8%",
      trend: "down",
      icon: TrendingUp,
      color: "orange"
    }
  ];

  const recentProjects = [
    { name: "App E-commerce", progress: 75, team: "Frontend + Backend", deadline: "15 Mar" },
    { name: "Campaña Marketing", progress: 90, team: "Marketing + Diseño", deadline: "10 Mar" },
    { name: "Sistema Contable", progress: 45, team: "Backend + Contabilidad", deadline: "25 Mar" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Inteligente</h1>
        <p className="text-slate-600">Bienvenido de vuelta, Juan Desarrollador</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === "up" ? (
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm ml-1 ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Proyectos Recientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-slate-900">{project.name}</h4>
                  <span className="text-sm text-slate-600">{project.deadline}</span>
                </div>
                <p className="text-sm text-slate-600">{project.team}</p>
                <Progress value={project.progress} className="h-2" />
                <p className="text-xs text-slate-500">{project.progress}% completado</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Assistant */}
        <Card>
          <CardHeader>
            <CardTitle>🤖 Asistente IA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Recomendación:</strong> El proyecto "App E-commerce" necesita revisión de seguridad antes del deploy.
                </p>
                <button className="text-xs text-blue-600 hover:underline">
                  Ver detalles →
                </button>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 mb-2">
                  <strong>Automatización:</strong> Se generó el reporte semanal de productividad.
                </p>
                <button className="text-xs text-green-600 hover:underline">
                  Descargar PDF →
                </button>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800 mb-2">
                  <strong>Oportunidad:</strong> Nueva demanda de servicios de React en el marketplace.
                </p>
                <button className="text-xs text-purple-600 hover:underline">
                  Explorar →
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
