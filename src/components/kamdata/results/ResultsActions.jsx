import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Download, Share2, Linkedin, Facebook, MessageSquarePlus, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

const ResultsActions = ({ onDownloadPDF, onShare, onOpenCommunityModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <Card className="gradient-card border-black">
        <CardHeader>
          <CardTitle className="text-center kamdata-red text-2xl">
            Próximos Pasos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center bg-white p-6 rounded-lg border border-black">
            <h3 className="font-bold kamdata-red text-lg mb-4">
              <Share2 className="inline w-5 h-5 mr-2 text-blue-500" />
              Comparte y Descarga tus Resultados
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <Button
                onClick={onDownloadPDF}
                className="kamdata-button text-black font-semibold text-md px-6 py-3 w-full sm:w-auto"
                style={{ backgroundColor: '#0492C2', color: 'white', borderRadius: '10px' }}
              >
                <Download className="mr-2 h-5 w-5" /> Descargar PDF
              </Button>
              <div className="flex space-x-3">
                  <Button onClick={() => onShare('linkedin')} variant="outline" size="icon" className="kamdata-social-button border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white">
                      <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button onClick={() => onShare('x')} variant="outline" size="icon" className="kamdata-social-button border-black text-black hover:bg-black hover:text-white">
                      <XIcon />
                  </Button>
                  <Button onClick={() => onShare('facebook')} variant="outline" size="icon" className="kamdata-social-button border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                      <Facebook className="h-5 w-5" />
                  </Button>
              </div>
            </div>
          </div>

          <div className="text-center bg-white p-6 rounded-lg border border-black">
            <h3 className="font-bold kamdata-red text-lg mb-3">
              <Users className="inline w-5 h-5 mr-2 text-green-500" />
              Únete a Nuestra Comunidad Exclusiva
            </h3>
            <p className="text-black mb-4">
              Conecta con otros profesionales, comparte ideas y sigue aprendiendo en nuestra comunidad de WhatsApp.
            </p>
            <Button
              onClick={onOpenCommunityModal}
              className="kamdata-button text-black font-bold text-lg px-8 py-4"
              style={{ backgroundColor: '#25D366', color: 'white', borderRadius: '10px' }}
            >
              <MessageSquarePlus className="mr-2 h-5 w-5" /> Unirme a la Comunidad
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultsActions;