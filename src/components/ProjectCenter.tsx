
import { Plus, Calendar, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const ProjectCenter = () => {
  const projects = [
    {
      id: 1,
      name: "App E-commerce Multitenda",
      description: "Desarrollo de aplicación web para comercio electrónico con múltiples vendedores",
      progress: 75,
      team: ["Frontend", "Backend", "UX/UI", "QA"],
      deadline: "2024-03-15",
      status: "En progreso",
      priority: "Alta"
    },
    {
      id: 2,
      name: "Campaña Marketing Digital",
      description: "Estrategia integral de marketing para startup tecnológica",
      progress: 90,
      team: ["Marketing", "Diseño", "Copywriting"],
      deadline: "2024-03-10",
      status: "Casi terminado",
      priority: "Media"
    },
    {
      id: 3,
      name: "Sistema Contable Automatizado",
      description: "Desarrollo de sistema contable con IA para PYMES",
      progress: 45,
      team: ["Backend", "Contabilidad", "DevOps"],
      deadline: "2024-03-25",
      status: "En desarrollo",
      priority: "Alta"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta": return "bg-red-100 text-red-800";
      case "Media": return "bg-yellow-100 text-yellow-800";
      case "Baja": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Centro de Proyectos</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Proyectos</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">En Progreso</p>
                <p className="text-2xl font-bold text-slate-900">8</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Completados</p>
                <p className="text-2xl font-bold text-slate-900">4</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge className={getPriorityColor(project.priority)}>
                  {project.priority}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 mt-2">{project.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Progreso</span>
                  <span className="text-sm text-slate-600">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Equipo</p>
                <div className="flex flex-wrap gap-1">
                  {project.team.map((member, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  {new Date(project.deadline).toLocaleDateString()}
                </span>
                <Badge variant="outline" className="text-xs">
                  {project.status}
                </Badge>
              </div>

              <Button variant="outline" className="w-full">
                Ver Detalles
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
