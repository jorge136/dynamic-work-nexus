
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, Users, Shield, Eye } from 'lucide-react';

const testCredentials = [
  {
    email: 'admin@tod.com',
    password: 'Admin123!',
    fullName: 'Carlos Administrador',
    role: 'admin',
    profession: 'Ingeniería',
    description: 'Usuario administrador con acceso completo'
  },
  {
    email: 'ayudante1@tod.com',
    password: 'Helper123!',
    fullName: 'María Ayudante',
    role: 'ayudante',
    profession: 'Marketing',
    description: 'Usuario ayudante con permisos moderados'
  },
  {
    email: 'ayudante2@tod.com',
    password: 'Helper456!',
    fullName: 'Luis Soporte',
    role: 'ayudante',
    profession: 'Diseño',
    description: 'Usuario ayudante especializado en diseño'
  },
  {
    email: 'visitante1@tod.com',
    password: 'Visit123!',
    fullName: 'Ana Visitante',
    role: 'visitante',
    profession: 'Contabilidad',
    description: 'Usuario visitante con acceso básico'
  },
  {
    email: 'visitante2@tod.com',
    password: 'Visit456!',
    fullName: 'Pedro Usuario',
    role: 'visitante',
    profession: 'Medicina',
    description: 'Usuario visitante del área médica'
  },
  {
    email: 'visitante3@tod.com',
    password: 'Visit789!',
    fullName: 'Sofia Invitada',
    role: 'visitante',
    profession: 'Derecho',
    description: 'Usuario visitante del área legal'
  }
];

export const TestCredentials = () => {
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [createdUsers, setCreatedUsers] = useState<string[]>([]);

  const createAllUsers = async () => {
    setLoading(true);
    const created: string[] = [];

    for (const cred of testCredentials) {
      try {
        const { error } = await signUp(cred.email, cred.password, cred.fullName);
        if (!error) {
          created.push(cred.email);
          // Pequeña pausa entre creaciones
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          console.log(`Usuario ${cred.email} ya existe o hubo error:`, error);
        }
      } catch (error) {
        console.log(`Error creando ${cred.email}:`, error);
      }
    }

    setCreatedUsers(created);
    setLoading(false);

    toast({
      title: 'Usuarios de prueba creados',
      description: `Se crearon ${created.length} usuarios de prueba exitosamente`,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copiado',
      description: 'Credenciales copiadas al portapapeles',
    });
  };

  const downloadCredentials = () => {
    const content = `# TOD Platform - Credenciales de Prueba

## Información del Proyecto
- Plataforma: TOD Platform (Plataforma Multidisciplinaria Tecnológica)
- Fecha de creación: ${new Date().toLocaleDateString()}
- Total de usuarios: ${testCredentials.length}

## Credenciales por Rol

${testCredentials.map(cred => `
### ${cred.fullName} (${cred.role.toUpperCase()})
- **Email:** ${cred.email}
- **Contraseña:** ${cred.password}
- **Rol:** ${cred.role}
- **Profesión:** ${cred.profession}
- **Descripción:** ${cred.description}
`).join('\n')}

## Instrucciones de Uso

1. **Administrador (admin@tod.com):**
   - Acceso completo a todas las funciones
   - Puede editar roles de otros usuarios
   - Gestiona el sistema completo

2. **Ayudantes (ayudante1@tod.com, ayudante2@tod.com):**
   - Permisos moderados
   - Pueden asistir en la gestión
   - Acceso a herramientas específicas

3. **Visitantes (visitante1-3@tod.com):**
   - Acceso básico de solo lectura
   - Pueden explorar la plataforma
   - Funcionalidades limitadas

## Notas de Seguridad

⚠️ **IMPORTANTE:** Estas son credenciales de prueba únicamente.
- Cambiar contraseñas en producción
- Usar emails reales para notificaciones
- Configurar políticas de seguridad apropiadas

## Contacto
Para soporte técnico, contactar al administrador del sistema.

---
Generado automáticamente por TOD Platform
${new Date().toISOString()}
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tod-platform-credenciales.md';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Documento descargado',
      description: 'Las credenciales han sido guardadas en un archivo .md',
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'ayudante': return <Users className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const config = {
      admin: { variant: 'default' as const, label: 'Administrador' },
      ayudante: { variant: 'secondary' as const, label: 'Ayudante' },
      visitante: { variant: 'outline' as const, label: 'Visitante' }
    };
    
    const roleConfig = config[role as keyof typeof config] || config.visitante;
    
    return (
      <Badge variant={roleConfig.variant} className="flex items-center gap-1">
        {getRoleIcon(role)}
        {roleConfig.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Credenciales de Prueba</h1>
          <p className="text-slate-600">Usuarios demo para testing de la plataforma</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={downloadCredentials} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Descargar Documento
          </Button>
          <Button onClick={createAllUsers} disabled={loading}>
            {loading ? 'Creando...' : 'Crear Todos los Usuarios'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testCredentials.map((cred, index) => (
          <Card key={index} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{cred.fullName}</CardTitle>
                {getRoleBadge(cred.role)}
              </div>
              <CardDescription>{cred.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Email:</label>
                <div className="flex items-center justify-between bg-slate-50 p-2 rounded">
                  <code className="text-sm">{cred.email}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(cred.email)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700">Contraseña:</label>
                <div className="flex items-center justify-between bg-slate-50 p-2 rounded">
                  <code className="text-sm">{cred.password}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(cred.password)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Profesión:</label>
                <p className="text-sm bg-slate-50 p-2 rounded">{cred.profession}</p>
              </div>

              {createdUsers.includes(cred.email) && (
                <Badge variant="default" className="w-full justify-center">
                  ✓ Usuario Creado
                </Badge>
              )}
            </CardContent>
          </Card>
       ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información Importante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-slate-600">
            • Estas credenciales son para testing únicamente
          </p>
          <p className="text-sm text-slate-600">
            • Cada usuario tiene diferentes niveles de acceso según su rol
          </p>
          <p className="text-sm text-slate-600">
            • Los usuarios se crean automáticamente con perfiles completos
          </p>
          <p className="text-sm text-slate-600">
            • Puedes descargar un documento con todas las credenciales para referencia
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
