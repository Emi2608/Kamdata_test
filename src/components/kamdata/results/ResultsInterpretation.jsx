import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, TrendingUp, Zap, AlertCircle, Info, Check, Activity, Brain, Target } from 'lucide-react';
import { SECTION_COLORS } from '@/App';

const ResultsInterpretation = ({ overallScorePercent, puntosFuertes, areasOportunidad }) => {
  let interpretationData = {
    level: 'Inicial',
    title: '🛠️ Tienes mucho por construir… y eso está bien',
    description: 'Este resultado no es un juicio. Es un mapa de tus hábitos actuales. Y el primer paso para crecer es reconocer dónde estás hoy.',
    defaultPuntosFuertes: [
      'Tienes intención de crecer.',
      'Comenzaste este test, y eso ya demuestra disposición a mejorar.',
      'Algunas respuestas reflejan conciencia y voluntad de cambio.',
    ],
    defaultAreasOportunidad: [
      'Soltar el miedo al error y al cambio.',
      'Atreverte a usar herramientas nuevas aunque no las domines al 100%.',
      'Aprender a pedir ayuda y colaborar estratégicamente.',
    ],
    nextStepText: 'Agenda una microcita estratégica gratuita para entender tus primeros pasos y construir una base sólida.',
    nextStepLink: 'https://calendar.app.google/ixLA3YjntzATmxPC8', 
    nextStepButtonText: 'Definir Mis Primeros Pasos',
    bgColorClass: 'bg-red-50', // Lighter shade for background
    borderColorClass: `border-[${SECTION_COLORS.crecimiento}]`,
    textColorClass: `text-[${SECTION_COLORS.crecimiento}]`,
    icon: <AlertCircle className={`w-10 h-10 text-[${SECTION_COLORS.crecimiento}] mb-3`} />
  };

  if (overallScorePercent >= 85) { // Alto
    interpretationData = {
      level: 'Avanzado',
      title: '✨ ¡Tu Chip Digital está activado!',
      description: 'Has desarrollado hábitos sólidos en todas o casi todas las dimensiones. Tu mentalidad digital refleja proactividad, apertura al aprendizaje, visión estratégica y capacidad de adaptación.',
      defaultPuntosFuertes: [
        'Tienes claridad para avanzar incluso con incertidumbre.',
        'Te abres a la retroalimentación y aprendes de tus errores.',
        'Piensas en grande y ya estás accionando con visión exponencial.',
      ],
      defaultAreasOportunidad: [
        'Profundizar en el uso de datos para tomar decisiones más afinadas.',
        'Optimizar tus herramientas digitales para lograr más con menos.',
        'Multiplicar tu impacto colaborando con otros perfiles estratégicos.',
      ],
      nextStepText: 'Agenda una microcita estratégica gratuita para trazar una hoja de ruta alineada con tu perfil y potenciar aún más tu impacto.',
      nextStepLink: 'https://calendar.app.google/ixLA3YjntzATmxPC8',
      nextStepButtonText: 'Potenciar Mi Impacto',
      bgColorClass: 'bg-blue-50',
      borderColorClass: `border-[${SECTION_COLORS.agil}]`,
      textColorClass: `text-[${SECTION_COLORS.agil}]`,
      icon: <CheckCircle className={`w-10 h-10 text-[${SECTION_COLORS.agil}] mb-3`} />
    };
  } else if (overallScorePercent >= 60) { // Medio
    interpretationData = {
      level: 'Intermedio',
      title: '⚙️ Estás en marcha, con mucho potencial',
      description: 'Tienes avances importantes, pero aún hay áreas por desbloquear. Esto no es una evaluación, es una brújula para saber qué hábito digital trabajar primero.',
      defaultPuntosFuertes: [
        'Has dado pasos en el camino digital: ya no partes de cero.',
        'Estás dispuesto/a a aprender y mejorar.',
        'Identificas elementos clave como el esfuerzo, la intención y la mejora continua.',
      ],
      defaultAreasOportunidad: [
        'Trabajar en soltar el perfeccionismo y avanzar con entregas iterativas.',
        'Aprovechar mejor la colaboración como fuente de innovación.',
        'Construir hábitos digitales sostenibles en el tiempo.',
      ],
      nextStepText: 'Agenda una microcita estratégica de 15 minutos para ordenar tus ideas y definir un enfoque práctico para desbloquear tu siguiente nivel.',
      nextStepLink: 'https://calendar.app.google/ixLA3YjntzATmxPC8',
      nextStepButtonText: 'Ordenar Mis Ideas',
      bgColorClass: 'bg-yellow-50',
      borderColorClass: `border-[${SECTION_COLORS.exponencial}]`,
      textColorClass: `text-[${SECTION_COLORS.exponencial}]`,
      icon: <Info className={`w-10 h-10 text-[${SECTION_COLORS.exponencial}] mb-3`} />
    };
  }
  
  const finalPuntosFuertes = puntosFuertes && puntosFuertes.length > 0 ? puntosFuertes : interpretationData.defaultPuntosFuertes;
  const finalAreasOportunidad = areasOportunidad && areasOportunidad.length > 0 ? areasOportunidad : interpretationData.defaultAreasOportunidad;

  const getBorderColorStyle = (colorKey) => {
    return { borderColor: SECTION_COLORS[colorKey] || SECTION_COLORS.default };
  };
  const getTextColorStyle = (colorKey) => {
    return { color: SECTION_COLORS[colorKey] || SECTION_COLORS.default };
  };
   const getBulletColorStyle = (colorKey) => {
    return { backgroundColor: SECTION_COLORS[colorKey] || SECTION_COLORS.default };
  };
  const getButtonBgColorStyle = (colorKey) => {
     return { backgroundColor: SECTION_COLORS[colorKey] || SECTION_COLORS.default };
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="my-12"
    >
      <Card className={`result-card gradient-card border-2 shadow-xl overflow-hidden`} style={getBorderColorStyle(overallScorePercent >= 85 ? 'agil' : overallScorePercent >= 60 ? 'exponencial' : 'crecimiento')}>
        <CardContent className="p-6 md:p-8">
          <div className="text-center mb-6">
            {React.cloneElement(interpretationData.icon, { style: getTextColorStyle(overallScorePercent >= 85 ? 'agil' : overallScorePercent >= 60 ? 'exponencial' : 'crecimiento') })}
            <h2 className={`text-2xl md:text-3xl font-bold mb-2`} style={{color: SECTION_COLORS.default}}>{interpretationData.title}</h2>
            <p className={`text-sm md:text-md font-semibold`} style={getTextColorStyle(overallScorePercent >= 85 ? 'agil' : overallScorePercent >= 60 ? 'exponencial' : 'crecimiento')}>Nivel General: {interpretationData.level}</p>
            <p className="text-gray-700 mt-3 text-sm md:text-base leading-relaxed">{interpretationData.description}</p>
          </div>
          
          <hr className={`my-6 md:my-8`} style={getBorderColorStyle(overallScorePercent >= 85 ? 'agil' : overallScorePercent >= 60 ? 'exponencial' : 'crecimiento')} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className={`p-4 md:p-6 rounded-lg border ${interpretationData.bgColorClass}`} style={getBorderColorStyle(overallScorePercent >= 85 ? 'agil' : overallScorePercent >= 60 ? 'exponencial' : 'crecimiento')}>
              <h3 className={`text-lg md:text-xl font-semibold mb-3 flex items-center`} style={getTextColorStyle(overallScorePercent >= 85 ? 'agil' : overallScorePercent >= 60 ? 'exponencial' : 'crecimiento')}>
                <Check className="w-5 h-5 mr-2" /> Puntos Fuertes
              </h3>
              <ul className="space-y-2 text-gray-700 text-xs md:text-sm">
                {finalPuntosFuertes.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className={`w-2 h-2 rounded-full mr-2 mt-1.5 shrink-0`} style={getBulletColorStyle(overallScorePercent >= 85 ? 'agil' : overallScorePercent >= 60 ? 'exponencial' : 'crecimiento')}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-4 md:p-6 rounded-lg border ${interpretationData.bgColorClass}`} style={getBorderColorStyle(overallScorePercent >= 85 ? 'agil' : overallScorePercent >= 60 ? 'exponencial' : 'crecimiento')}>
              <h3 className={`text-lg md:text-xl font-semibold mb-3 flex items-center`} style={getTextColorStyle(overallScorePercent >= 85 ? 'agil' : overallScorePercent >= 60 ? 'exponencial' : 'crecimiento')}>
                <TrendingUp className="w-5 h-5 mr-2" /> Áreas de Oportunidad
              </h3>
              <ul className="space-y-2 text-gray-700 text-xs md:text-sm">
                {finalAreasOportunidad.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className={`w-2 h-2 rounded-full mr-2 mt-1.5 shrink-0`} style={getBulletColorStyle(overallScorePercent >= 85 ? 'agil' : overallScorePercent >= 60 ? 'exponencial' : 'crecimiento')}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <hr className={`my-6 md:my-8`} style={getBorderColorStyle(overallScorePercent >= 85 ? 'agil' : overallScorePercent >= 60 ? 'exponencial' : 'crecimiento')} />

          <div className="text-center">
            <h3 className={`text-lg md:text-xl font-semibold mb-3 flex items-center justify-center`} style={{color: SECTION_COLORS.default}}>
              <Zap className="w-5 h-5 mr-2" /> Siguiente Paso
            </h3>
            <p className="text-gray-700 mb-4 text-sm md:text-base">{interpretationData.nextStepText}</p>
            <Button
              asChild
              className={`kamdata-button text-white font-bold text-sm md:text-base px-6 py-3 shadow-lg hover:shadow-xl transition-shadow duration-300`}
              style={{ ...getButtonBgColorStyle(overallScorePercent >= 85 ? 'agil' : overallScorePercent >= 60 ? 'exponencial' : 'crecimiento'), borderRadius: '10px' }}
            >
              <a href={interpretationData.nextStepLink} target="_blank" rel="noopener noreferrer">
                {interpretationData.nextStepButtonText}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultsInterpretation;