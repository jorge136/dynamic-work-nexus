
-- Crear tabla de perfiles de usuario
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'visitante' CHECK (role IN ('admin', 'ayudante', 'visitante')),
  profession TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de profesiones y sus subáreas
CREATE TABLE public.professions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de subáreas por profesión
CREATE TABLE public.profession_subareas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profession_id UUID REFERENCES public.professions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  tools TEXT[], -- Array de herramientas específicas
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profession_subareas ENABLE ROW LEVEL SECURITY;

-- Políticas para perfiles (solo pueden ver y editar su propio perfil)
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Políticas para profesiones (todos pueden ver)
CREATE POLICY "Anyone can view professions" 
  ON public.professions FOR SELECT 
  TO authenticated
  USING (true);

-- Políticas para subáreas (todos pueden ver)
CREATE POLICY "Anyone can view profession subareas" 
  ON public.profession_subareas FOR SELECT 
  TO authenticated
  USING (true);

-- Función para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insertar profesiones base
INSERT INTO public.professions (name, description, icon, color) VALUES
('Ingeniería', 'Desarrollo, infraestructura y soluciones técnicas', 'Settings', '#3B82F6'),
('Marketing', 'Estrategias digitales, contenido y análisis', 'TrendingUp', '#10B981'),
('Contabilidad', 'Finanzas, tributación y análisis económico', 'Calculator', '#F59E0B'),
('Diseño', 'UX/UI, gráfico y experiencia visual', 'Palette', '#8B5CF6'),
('Medicina', 'Salud, diagnóstico y tratamiento', 'Heart', '#EF4444'),
('Derecho', 'Legal, contratos y asesoría jurídica', 'Scale', '#6B7280');

-- Insertar subáreas de Ingeniería
INSERT INTO public.profession_subareas (profession_id, name, description, tools) 
SELECT id, 'Desarrollo de Software', 'Frontend, Backend, Mobile', ARRAY['VS Code', 'Git', 'Docker', 'APIs']
FROM public.professions WHERE name = 'Ingeniería';

INSERT INTO public.profession_subareas (profession_id, name, description, tools) 
SELECT id, 'DevOps e Infraestructura', 'Cloud, CI/CD, Monitoreo', ARRAY['AWS', 'Kubernetes', 'Jenkins', 'Terraform']
FROM public.professions WHERE name = 'Ingeniería';

INSERT INTO public.profession_subareas (profession_id, name, description, tools) 
SELECT id, 'Ingeniería de Datos', 'ETL, Analytics, Big Data', ARRAY['Python', 'SQL', 'Spark', 'Airflow']
FROM public.professions WHERE name = 'Ingeniería';

-- Insertar subáreas de Marketing
INSERT INTO public.profession_subareas (profession_id, name, description, tools) 
SELECT id, 'Marketing Digital', 'SEO, SEM, Redes Sociales', ARRAY['Google Ads', 'Facebook Ads', 'Analytics', 'Hootsuite']
FROM public.professions WHERE name = 'Marketing';

INSERT INTO public.profession_subareas (profession_id, name, description, tools) 
SELECT id, 'Content Marketing', 'Blogs, Video, Copywriting', ARRAY['WordPress', 'Canva', 'Buffer', 'Mailchimp']
FROM public.professions WHERE name = 'Marketing';

INSERT INTO public.profession_subareas (profession_id, name, description, tools) 
SELECT id, 'Analytics y CRM', 'Datos, Conversiones, Automatización', ARRAY['Google Analytics', 'HubSpot', 'Salesforce', 'Zapier']
FROM public.professions WHERE name = 'Marketing';

-- Insertar subáreas de Contabilidad
INSERT INTO public.profession_subareas (profession_id, name, description, tools) 
SELECT id, 'Contabilidad General', 'Estados financieros, Libros contables', ARRAY['QuickBooks', 'Excel', 'SAP', 'Xero']
FROM public.professions WHERE name = 'Contabilidad';

INSERT INTO public.profession_subareas (profession_id, name, description, tools) 
SELECT id, 'Tributación', 'Impuestos, Declaraciones, Cumplimiento', ARRAY['TurboTax', 'TaxWise', 'Drake', 'ProSeries']
FROM public.professions WHERE name = 'Contabilidad';

INSERT INTO public.profession_subareas (profession_id, name, description, tools) 
SELECT id, 'Auditoría', 'Revisión, Control interno, Riesgos', ARRAY['ACL', 'IDEA', 'TeamMate', 'AuditBoard']
FROM public.professions WHERE name = 'Contabilidad';

-- Insertar subáreas de Diseño
INSERT INTO public.profession_subareas (profession_id, name, description, tools) 
SELECT id, 'UI/UX Design', 'Interfaces, Experiencia de usuario', ARRAY['Figma', 'Adobe XD', 'Sketch', 'InVision']
FROM public.professions WHERE name = 'Diseño';

INSERT INTO public.profession_subareas (profession_id, name, description, tools) 
SELECT id, 'Diseño Gráfico', 'Branding, Print, Identidad visual', ARRAY['Adobe Photoshop', 'Illustrator', 'InDesign', 'Canva']
FROM public.professions WHERE name = 'Diseño';

INSERT INTO public.profession_subareas (profession_id, name, description, tools) 
SELECT id, 'Motion Graphics', 'Animación, Video, Efectos', ARRAY['After Effects', 'Premiere', 'Cinema 4D', 'Lottie']
FROM public.professions WHERE name = 'Diseño';
