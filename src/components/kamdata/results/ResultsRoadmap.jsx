import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle, BarChart3, CalendarDays } from 'lucide-react';

const ResultsRoadmap = ({ getPuntosFuertes, getAreasOportunidad }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mb-12"
    >
      <Card className="gradient-card border-black">
        <CardHeader>
          <CardTitle className="text-center kamdata-red text-2xl">
            🚀 Tu Hoja de Ruta Personalizada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-black">
              <h3 className="font-bold kamdata-red text-lg mb-3">
                <CheckCircle className="inline w-5 h-5 mr-2 text-green-500" />
                Puntos Fuertes
              </h3>
              <ul className="space-y-2 text-black text-sm">
                {getPuntosFuertes().map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg border border-black">
              <h3 className="font-bold kamdata-red text-lg mb-3">
                <BarChart3 className="inline w-5 h-5 mr-2 text-yellow-500" />
                Áreas de Oportunidad
              </h3>
              <ul className="space-y-2 text-black text-sm">
                {getAreasOportunidad().map((item, idx) => (
                   <li key={idx} className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="text-center bg-white p-6 rounded-lg border border-black">
              <h3 className="font-bold kamdata-red text-lg mb-3">
                  <CalendarDays className="inline w-5 h-5 mr-2 text-blue-500" />
                  ¡Desbloquea tu Potencial Exponencial!
              </h3>
              <p className="text-black mb-4">
                  Agenda una microcita estratégica gratuita de 15 minutos para recibir una hoja de ruta personalizada y llevar tu mentalidad digital al siguiente nivel.
              </p>
              <Button
                  asChild
                  className="kamdata-button text-black font-bold text-lg px-8 py-4"
                  style={{ backgroundColor: '#EBAC3F', borderRadius: '10px' }}
              >
                  <a href="https://calendar.app.google/ixLA3YjntzATmxPC8" target="_blank" rel="noopener noreferrer">
                      Agenda tu Sesión Gratuita
                  </a>
              </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultsRoadmap;