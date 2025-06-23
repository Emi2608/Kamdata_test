import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock, Zap, TrendingUp } from 'lucide-react';
import { SECTION_COLORS } from '@/App';

const StrategicSessionCTA = () => {
  const calendarLink = "https://calendar.app.google/ixLA3YjntzATmxPC8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="my-12"
    >
      <Card className="gradient-card border-2 shadow-xl overflow-hidden" style={{ borderColor: SECTION_COLORS.default }}>
        <CardHeader className="text-center bg-gray-50 p-6">
          <Zap className="w-12 h-12 mx-auto mb-3" style={{ color: SECTION_COLORS.default }} />
          <CardTitle className="text-2xl md:text-3xl font-bold" style={{ color: SECTION_COLORS.default }}>
            ¡Impulsa Tu Mentalidad Digital Ahora!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8 text-center">
          <p className="text-gray-700 text-md md:text-lg leading-relaxed mb-6">
            ¿Listo para transformar tus resultados en acción? Agenda una <strong style={{color: SECTION_COLORS.agil}}>sesión estratégica GRATUITA de 15 minutos</strong> con nosotros. Descubre cómo puedes <strong style={{color: SECTION_COLORS.crecimiento}}>fortalecer tu mentalidad digital</strong> y comenzar a <strong style={{color: SECTION_COLORS.exponencial}}>generar un impacto real con tus datos</strong>.
          </p>
          <p className="text-gray-600 text-sm mb-8">
            No dejes que tus resultados se queden en un reporte. ¡Convierte tu potencial en crecimiento tangible!
          </p>
          <Button
            asChild
            className="kamdata-button text-white font-bold text-lg md:text-xl px-8 py-4 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            style={{ backgroundColor: SECTION_COLORS.default, borderRadius: '12px' }}
          >
            <a href={calendarLink} target="_blank" rel="noopener noreferrer">
              <CalendarClock className="mr-3 h-6 w-6" />
              Agendar Mi Sesión Gratuita
            </a>
          </Button>
          <div className="mt-6 text-xs text-gray-500">
            <TrendingUp className="inline w-4 h-4 mr-1" style={{color: SECTION_COLORS.exponencial}}/>
            ¡Plazas limitadas! Aprovecha esta oportunidad.
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StrategicSessionCTA;