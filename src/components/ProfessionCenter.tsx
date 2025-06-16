
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import * as LucideIcons from 'lucide-react';

interface Profession {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface SubArea {
  id: string;
  profession_id: string;
  name: string;
  description: string;
  tools: string[];
}

export const ProfessionCenter = () => {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [subAreas, setSubAreas] = useState<SubArea[]>([]);
  const [selectedProfession, setSelectedProfession] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfessions();
  }, []);

  useEffect(() => {
    if (selectedProfession) {
      loadSubAreas(selectedProfession);
    }
  }, [selectedProfession]);

  const loadProfessions = async () => {
    try {
      const { data, error } = await supabase
        .from('professions')
        .select('*')
        .order('name');

      if (error) throw error;
      
      setProfessions(data || []);
      if (data && data.length > 0) {
        setSelectedProfession(data[0].id);
      }
    } catch (error) {
      console.error('Error loading professions:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSubAreas = async (professionId: string) => {
    try {
      const { data, error } = await supabase
        .from('profession_subareas')
        .select('*')
        .eq('profession_id', professionId)
        .order('name');

      if (error) throw error;
      setSubAreas(data || []);
    } catch (error) {
      console.error('Error loading sub areas:', error);
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || LucideIcons.Folder;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Cargando profesiones...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Centro de Profesiones</h1>
        <p className="text-slate-600">Explora las diferentes áreas profesionales</p>
      </div>

      <Tabs value={selectedProfession} onValueChange={setSelectedProfession} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {professions.map((profession) => {
            const Icon = getIcon(profession.icon);
            return (
              <TabsTrigger
                key={profession.id}
                value={profession.id}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{profession.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {professions.map((profession) => {
          const Icon = getIcon(profession.icon);
          const professionSubAreas = subAreas.filter(sa => sa.profession_id === profession.id);
          
          return (
            <TabsContent key={profession.id} value={profession.id} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${profession.color}20` }}
                    >
                      <Icon 
                        className="h-6 w-6" 
                        style={{ color: profession.color }}
                      />
                    </div>
                    {profession.name}
                  </CardTitle>
                  <CardDescription>{profession.description}</CardDescription>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionSubAreas.map((subArea) => (
                  <Card key={subArea.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{subArea.name}</CardTitle>
                      <CardDescription>{subArea.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-slate-700">
                          Herramientas principales:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {subArea.tools.map((tool, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="text-xs"
                            >
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {professionSubAreas.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-slate-500">
                      No hay subáreas configuradas para esta profesión.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
