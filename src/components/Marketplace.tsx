
import { Search, Star, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Marketplace = () => {
  const services = [
    {
      id: 1,
      title: "Desarrollo Frontend React + TypeScript",
      provider: "Ana García",
      avatar: "/placeholder.svg",
      rating: 4.9,
      reviews: 42,
      price: "$50/hora",
      category: "Desarrollo",
      deliveryTime: "1-2 semanas",
      description: "Especialista en React, Next.js y TypeScript. 5 años de experiencia en desarrollo web.",
      skills: ["React", "TypeScript", "Next.js", "Tailwind"]
    },
    {
      id: 2,
      title: "Estrategia de Marketing Digital Completa",
      provider: "Carlos López",
      avatar: "/placeholder.svg",
      rating: 4.8,
      reviews: 38,
      price: "$800/proyecto",
      category: "Marketing",
      deliveryTime: "2-3 semanas",
      description: "Marketing digital integral: SEO, SEM, redes sociales y analítica web.",
      skills: ["SEO", "Google Ads", "Analytics", "Social Media"]
    },
    {
      id: 3,
      title: "Consultoría Contable y Fiscal",
      provider: "María Rodríguez",
      avatar: "/placeholder.svg",
      rating: 5.0,
      reviews: 56,
      price: "$60/hora",
      category: "Contabilidad",
      deliveryTime: "Inmediato",
      description: "Contadora pública con especialización en startups y empresas tecnológicas.",
      skills: ["Contabilidad", "Fiscal", "Auditoría", "Finanzas"]
    },
    {
      id: 4,
      title: "Diseño UX/UI y Branding",
      provider: "Pablo Martín",
      avatar: "/placeholder.svg",
      rating: 4.7,
      reviews: 29,
      price: "$1200/proyecto",
      category: "Diseño",
      deliveryTime: "1-2 semanas",
      description: "Diseñador con 7 años de experiencia en UX/UI y creación de identidades visuales.",
      skills: ["Figma", "Adobe XD", "Branding", "Prototyping"]
    }
  ];

  const categories = [
    { name: "Desarrollo", count: 24, color: "blue" },
    { name: "Marketing", count: 18, color: "green" },
    { name: "Diseño", count: 15, color: "purple" },
    { name: "Contabilidad", count: 12, color: "orange" },
    { name: "Consultoría", count: 9, color: "red" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Marketplace de Servicios</h1>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          Publicar Servicio
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar servicios, habilidades o profesionales..."
            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button variant="outline">Filtros</Button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-slate-900">{category.name}</h3>
              <p className="text-sm text-slate-600">{category.count} servicios</p>
            </CardContent>
          </Card>
       ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={service.avatar} />
                  <AvatarFallback>{service.provider.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">por {service.provider}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-slate-600 ml-1">{service.rating}</span>
                    </div>
                    <span className="text-sm text-slate-500">({service.reviews} reseñas)</span>
                    <Badge variant="secondary">{service.category}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-700">{service.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {service.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
               ))}
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.deliveryTime}
                </div>
                <div className="font-semibold text-lg text-slate-900">
                  {service.price}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  Ver Perfil
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Contratar
                </Button>
              </div>
            </CardContent>
          </Card>
       ))}
      </div>
    </div>
  );
};
