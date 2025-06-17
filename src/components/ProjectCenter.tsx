
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Clock,
  MoreVertical,
  Edit,
  Trash2,
  Share2,
  Star
} from "lucide-react";

export const ProjectCenter = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "",
    priority: "media",
    deadline: ""
  });

  const handleCreateProject = () => {
    if (!newProject.title.trim()) {
      toast({
        title: "Error",
        description: "El título del proyecto es requerido",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Proyecto Creado",
      description: `El proyecto "${newProject.title}" ha sido creado exitosamente`,
    });

    setNewProject({
      title: "",
      description: "",
      category: "",
      priority: "media",
      deadline: ""
    });
    setShowCreateDialog(false);
  };

  const handleProjectAction = (action: string, projectName: string) => {
    toast({
      title: action,
      description: `${action} ejecutada en el proyecto: ${projectName}`,
    });
  };

  const projects = [
    {
      id: 1,
      title: "Sistema de Gestión Empresarial",
      description: "Plataforma completa para gestión de recursos humanos y financieros",
      status: "En progreso",
      priority: "Alta",
      category: "Desarrollo",
      progress: 75,
      team: 8,
      deadline: "2024-03-15",
      starred: true
    },
    {
      id: 2,
      title: "App Móvil E-commerce",
      description: "Aplicación móvil para tienda online con pasarela de pagos",
      status: "Planificación",
      priority: "Media",
      category: "Mobile",
      progress: 25,
      team: 5,
      deadline: "2024-04-20",
      starred: false
    },
    {
      id: 3,
      title: "Rediseño Web Corporativo",
      description: "Nuevo sitio web con diseño moderno y optimización SEO",
      status: "Revisión",
      priority: "Baja",
      category: "Diseño",
      progress: 90,
      team: 3,
      deadline: "2024-02-28",
      starred: true
    },
    {
      id: 4,
      title: "Dashboard Analytics",
      description: "Panel de control para análisis de datos en tiempo real",
      status: "Completado",
      priority: "Alta",
      category: "Data",
      progress: 100,
      team: 6,
      deadline: "2024-01-30",
      starred: false
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || project.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completado": return "bg-green-100 text-green-800";
      case "en progreso": return "bg-blue-100 text-blue-800";
      case "planificación": return "bg-yellow-100 text-yellow-800";
      case "revisión": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "alta": return "destructive";
      case "media": return "default";
      case "baja": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Centro de Proyectos
          </h1>
          <p className="text-slate-600 mt-2">Gestiona y organiza todos tus proyectos</p>
        </div>

        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Proyecto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
              <DialogDescription>
                Completa la información básica para crear tu proyecto
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título del Proyecto</Label>
                <Input
                  id="title"
                  placeholder="Nombre del proyecto"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe el proyecto"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Select value={newProject.category} onValueChange={(value) => setNewProject({...newProject, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desarrollo">Desarrollo</SelectItem>
                      <SelectItem value="diseno">Diseño</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="data">Análisis de Datos</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select value={newProject.priority} onValueChange={(value) => setNewProject({...newProject, priority: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="deadline">Fecha Límite</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={handleCreateProject} className="flex-1">
                  Crear Proyecto
                </Button>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar proyectos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="en progreso">En Progreso</SelectItem>
                  <SelectItem value="planificación">Planificación</SelectItem>
                  <SelectItem value="revisión">Revisión</SelectItem>
                  <SelectItem value="completado">Completado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    {project.starred && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <CardDescription className="text-sm">
                    {project.description}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleProjectAction("Opciones", project.title)}>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
                <Badge variant={getPriorityColor(project.priority)}>
                  {project.priority}
                </Badge>
                <Badge variant="outline">{project.category}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{project.team} miembros</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(project.deadline).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleProjectAction("Abrir proyecto", project.title)}
                >
                  Abrir
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleProjectAction("Editar proyecto", project.title)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleProjectAction("Compartir proyecto", project.title)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No se encontraron proyectos
            </h3>
            <p className="text-slate-600">
              Intenta cambiar los filtros o crear un nuevo proyecto.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
