import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, CheckCircle, MessageSquarePlus } from 'lucide-react';

const CommunityModal = ({ onClose }) => {
  const communityLink = "https://chat.whatsapp.com/BvACW4lMPaPCxA4UQ1jX2g";

  const handleJoin = () => {
    window.open(communityLink, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="gradient-card border-black rounded-lg shadow-xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="bg-transparent border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="kamdata-red text-2xl flex items-center">
                <MessageSquarePlus className="w-7 h-7 mr-2 text-[#25D366]" />
                Comunidad KAMDATA
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-black hover:text-kamdata-red">
                <X className="h-6 w-6" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-black text-center leading-relaxed">
                ¡Estás a un paso de unirte a nuestra vibrante comunidad en WhatsApp! 
                Conecta, aprende y crece con otros profesionales como tú.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  onClick={handleJoin}
                  className="w-full sm:w-auto kamdata-button text-black font-bold text-lg py-3 px-6"
                  style={{ backgroundColor: '#25D366', color: 'white', borderRadius: '10px' }}
                >
                  <CheckCircle className="mr-2 h-5 w-5" /> Unirme Ahora
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full sm:w-auto text-black border-black hover:bg-gray-200 font-semibold py-3 px-6"
                  style={{ borderRadius: '10px' }}
                >
                  Quizás más tarde
                </Button>
              </div>
              <p className="text-xs text-gray-600 text-center">
                Serás redirigido a WhatsApp para unirte al grupo.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommunityModal;