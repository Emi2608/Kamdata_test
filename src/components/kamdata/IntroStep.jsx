import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const IntroStep = ({ formData, setFormData, onSubmit }) => {
  const rolOptions = [
    { value: 'emprendedor', label: 'Emprendedor (a) / Dueño (a) de negocio' },
    { value: 'empresario', label: 'Empresario (a)' },
    { value: 'freelance', label: 'Freelance / Consultor Independiente' },
    { value: 'lider_equipo', label: 'Líder de equipo en Empresa' },
    { value: 'profesional_digital_ti', label: 'Profesional en transformación digital o TI' },
    { value: 'estudiante', label: 'Estudiante' },
    { value: 'otro', label: 'Otro' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="text-center mb-12 pt-0 md:pt-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn" style={{ color: '#EA4E51' }}>
          🧠 Test: ¿Tienes activado tu Chip Digital?
        </h1>
        
        <div className="max-w-3xl mx-auto mb-8">
          <p className="text-lg md:text-xl text-black leading-relaxed">
            Este test interactivo de <strong>KAMDATA</strong> evalúa tu mentalidad digital en tres áreas clave: 
            <span className="kamdata-red font-semibold"> ⚡ Mentalidad Ágil</span> (adaptación al cambio), 
            <span className="kamdata-red font-semibold"> 🌱 Mentalidad de Crecimiento</span> (capacidad de aprendizaje) y 
            <span className="kamdata-red font-semibold"> 🚀 Mentalidad Exponencial</span> (visión para escalar tu impacto). 
            En solo 4 minutos, descubre tus fortalezas y áreas de oportunidad.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Card className="gradient-card border-black max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center kamdata-red text-2xl">
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre" className="text-black font-semibold">Nombre Completo</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    required
                    className="border-black"
                  />
                </div>
                <div>
                  <Label htmlFor="celular" className="text-black font-semibold">Número de Celular</Label>
                  <Input
                    id="celular"
                    type="tel"
                    value={formData.celular}
                    onChange={(e) => setFormData({...formData, celular: e.target.value})}
                    required
                    className="border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-black font-semibold">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="border-black"
                  />
                </div>
                <div>
                  <Label htmlFor="empresa" className="text-black font-semibold">Empresa</Label>
                  <Input
                    id="empresa"
                    value={formData.empresa}
                    onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                    required
                    className="border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rol" className="text-black font-semibold">Rol</Label>
                  <Select onValueChange={(value) => setFormData({...formData, rol: value})} value={formData.rol}>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Selecciona tu rol" />
                    </SelectTrigger>
                    <SelectContent>
                      {rolOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="localidad" className="text-black font-semibold">Localidad</Label>
                  <Input
                    id="localidad"
                    value={formData.localidad}
                    onChange={(e) => setFormData({...formData, localidad: e.target.value})}
                    required
                    className="border-black"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terminos"
                  checked={formData.terminos}
                  onCheckedChange={(checked) => setFormData({...formData, terminos: checked})}
                  className="border-2 mt-1"
                  style={{ borderColor: '#EA4E51' }}
                />
                <Label htmlFor="terminos" className="kamdata-red font-semibold text-sm">
                  Acepto los términos y condiciones (sujetos a la Ley de Transparencia y Protección de Datos de Guanajuato)
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="info_mentorias"
                  checked={formData.info_mentorias}
                  onCheckedChange={(checked) => setFormData({...formData, info_mentorias: checked})}
                  className="border-2 mt-1"
                  style={{ borderColor: '#0492C2' }}
                />
                <Label htmlFor="info_mentorias" className="text-sm font-semibold" style={{ color: '#0492C2' }}>
                  Estoy interesado en recibir más información sobre mentorías o programas para fortalecer mi estrategia digital.
                </Label>
              </div>


              <Button
                type="submit"
                className="w-full kamdata-button text-black font-bold text-lg py-6"
                style={{ backgroundColor: '#EBAC3F', borderRadius: '10px' }}
              >
                Iniciar Diagnóstico <ArrowRight className="ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default IntroStep;