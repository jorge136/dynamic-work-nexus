
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User, 
  Mail, 
  Briefcase, 
  Shield, 
  Camera,
  Save,
  Edit,
  Key,
  Settings,
  Bell
} from "lucide-react";

export const UserProfile = () => {
  const { profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || '',
    profession: profile?.profession || '',
    role: profile?.role || 'visitante',
    bio: '',
    phone: '',
    location: '',
    linkedin: '',
    github: ''
  });

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const { error } = await updateProfile({
        full_name: formData.full_name,
        profession: formData.profession,
      });

      if (error) {
        toast({
          title: "Error",
          description: "No se pudo actualizar el perfil",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Perfil Actualizado",
          description: "Los cambios se han guardado correctamente"
        });
        setIsEditing(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    toast({
      title: "Cambiar Contraseña",
      description: "Funcionalidad de cambio de contraseña en desarrollo"
    });
  };

  const handleNotificationSettings = () => {
    toast({
      title: "Configuración de Notificaciones",
      description: "Abriendo configuración de notificaciones..."
    });
  };

  const handleUploadAvatar = () => {
    toast({
      title: "Subir Avatar",
      description: "Funcionalidad de carga de avatar en desarrollo"
    });
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-slate-600">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Mi Perfil
          </h1>
          <p className="text-slate-600 mt-2">Gestiona tu información personal y configuración</p>
        </div>
        
        <div className="flex gap-3">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSaveProfile} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Guardando...' : 'Guardar'}
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto">
                {profile.full_name?.charAt(0) || 'U'}
              </div>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                onClick={handleUploadAvatar}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <CardTitle className="mt-4">{profile.full_name}</CardTitle>
            <CardDescription>{profile.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-sm">Rol</p>
                <p className="text-sm text-slate-600 capitalize">{profile.role}</p>
              </div>
            </div>
            
            {profile.profession && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Briefcase className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-sm">Profesión</p>
                  <p className="text-sm text-slate-600">{profile.profession}</p>
                </div>
              </div>
            )}

            <div className="space-y-2 pt-4">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleChangePassword}
              >
                <Key className="h-4 w-4 mr-2" />
                Cambiar Contraseña
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleNotificationSettings}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notificaciones
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => toast({ title: "Configuración", description: "Abriendo configuración general..." })}
              >
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información Personal
            </CardTitle>
            <CardDescription>
              {isEditing ? 'Edita tu información personal' : 'Tu información personal actual'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  id="fullName"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="bg-slate-50"
                />
                <p className="text-xs text-slate-500 mt-1">El email no se puede modificar</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="profession">Profesión</Label>
                <Select 
                  value={formData.profession} 
                  onValueChange={(value) => setFormData({...formData, profession: value})}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar profesión" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ingeniería">Ingeniería</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Contabilidad">Contabilidad</SelectItem>
                    <SelectItem value="Diseño">Diseño</SelectItem>
                    <SelectItem value="Medicina">Medicina</SelectItem>
                    <SelectItem value="Derecho">Derecho</SelectItem>
                    <SelectItem value="Otra">Otra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="role">Rol en la Plataforma</Label>
                <Input
                  id="role"
                  value={formData.role}
                  disabled
                  className="bg-slate-50 capitalize"
                />
                <p className="text-xs text-slate-500 mt-1">El rol es asignado por administradores</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Ciudad, País"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Biografía</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                disabled={!isEditing}
                placeholder="Cuéntanos sobre ti, tu experiencia y tus intereses..."
                className="min-h-20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  disabled={!isEditing}
                  placeholder="https://linkedin.com/in/usuario"
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) => setFormData({...formData, github: e.target.value})}
                  disabled={!isEditing}
                  placeholder="https://github.com/usuario"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Proyectos Activos</CardTitle>
            <div className="text-2xl font-bold">5</div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">En los últimos 30 días</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Colaboraciones</CardTitle>
            <div className="text-2xl font-bold">12</div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">Con diferentes equipos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Tiempo en Plataforma</CardTitle>
            <div className="text-2xl font-bold">3 meses</div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">Miembro desde enero 2024</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
