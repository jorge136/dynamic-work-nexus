
import { Code, Database, Palette, Calculator, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ToolsConsole = () => {
  const tools = [
    {
      id: 1,
      name: "Editor de Código",
      description: "IDE integrado con soporte para múltiples lenguajes",
      icon: Code,
      category: "Desarrollo",
      status: "Disponible",
      users: 15,
      features: ["Syntax Highlighting", "Autocompletado", "Git Integration", "Live Preview"]
    },
    {
      id: 2,
      name: "Simulador de Base de Datos",
      description: "Herramienta para diseñar y probar esquemas de BD",
      icon: Database,
      category: "Backend",
      status: "Beta",
      users: 8,
      features: ["ER Diagram", "SQL Query", "Data Modeling", "Performance Test"]
    },
    {
      id: 3,
      name: "Suite de Diseño",
      description: "Herramientas de diseño gráfico y prototipado",
      icon: Palette,
      category: "Diseño",
      status: "Disponible",
      users: 12,
      features: ["Wireframing", "Prototyping", "Color Palette", "Asset Library"]
    },
    {
      id: 4,
      name: "Calculadora Financiera",
      description: "Herramientas contables y de análisis financiero",
      icon: Calculator,
      category: "Contabilidad",
      status: "Disponible",
      users: 6,
      features: ["ROI Calculator", "Cash Flow", "Tax Calculator", "Expense Tracker"]
    },
    {
      id: 5,
      name: "CRM Integrado",
      description: "Sistema de gestión de relaciones con clientes",
      icon: Settings,
      category: "Ventas",
      status: "Próximamente",
      users: 0,
      features: ["Lead Management", "Pipeline", "Analytics", "Email Integration"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible": return "bg-green-100 text-green-800";
      case "Beta": return "bg-yellow-100 text-yellow-800";
      case "Próximamente": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Desarrollo": return "bg-blue-100 text-blue-800";
      case "Backend": return "bg-purple-100 text-purple-800";
      case "Diseño": return "bg-pink-100 text-pink-800";
      case "Contabilidad": return "bg-orange-100 text-orange-800";
      case "Ventas": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Herramientas Profesionales</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          Solicitar Herramienta
        </Button>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {["Desarrollo", "Backend", "Diseño", "Contabilidad", "Ventas"].map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-slate-900">{category}</h3>
              <p className="text-sm text-slate-600">
                {tools.filter(tool => tool.category === category).length} herramientas
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card key={tool.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={getCategoryColor(tool.category)}>
                          {tool.category}
                        </Badge>
                        <Badge className={getStatusColor(tool.status)}>
                          {tool.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-2">{tool.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">Características</p>
                  <div className="grid grid-cols-2 gap-1">
                    {tool.features.map((feature, index) => (
                      <div key={index} className="text-xs text-slate-600 flex items-center">
                        <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">
                    {tool.users} usuarios activos
                  </span>
                </div>

                <Button 
                  className="w-full" 
                  variant={tool.status === "Disponible" ? "default" : "secondary"}
                  disabled={tool.status === "Próximamente"}
                >
                  {tool.status === "Disponible" ? "Abrir Herramienta" : 
                   tool.status === "Beta" ? "Probar Beta" : "Próximamente"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Access Console */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Acceso Rápido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <Code className="h-6 w-6 mb-2" />
              <span className="text-sm">Editor</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <Database className="h-6 w-6 mb-2" />
              <span className="text-sm">BD Simulator</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <Palette className="h-6 w-6 mb-2" />
              <span className="text-sm">Diseño</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
              <Calculator className="h-6 w-6 mb-2" />
              <span className="text-sm">Finanzas</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
