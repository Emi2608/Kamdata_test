import React from 'react';
import { motion } from 'framer-motion';
import KamdataLogo from '@/components/kamdata/KamdataLogo';
import { Linkedin, Instagram, Youtube, Facebook } from 'lucide-react';

const TikTokIcon = () => (
  <img  
    src="https://storage.googleapis.com/hostinger-horizons-assets-prod/523ce8ca-63e1-4ac1-8cb2-73d544b3a60a/311fa300b7f6d9d5636920ddbfe8aee4.png" 
    alt="TikTok" 
    className="w-5 h-5 text-black group-hover:text-[#0492C2] transition-colors duration-300" 
   />
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);


const Footer = ({ logoSrc }) => {
  const socialLinks = [
    { icon: <Linkedin size={20} />, href: 'https://linkedin.com/company/kamdatamx', name: 'LinkedIn' },
    { icon: <Instagram size={20} />, href: 'https://instagram.com/kamdatamx', name: 'Instagram' },
    { icon: <Youtube size={20} />, href: 'https://youtube.com/@kamdata', name: 'YouTube' },
    { icon: <TikTokIcon />, href: 'https://tiktok.com/@kamdatamx', name: 'TikTok' },
    { icon: <Facebook size={20} />, href: 'https://facebook.com/kamdatamx', name: 'Facebook' },
  ];

  return (
    <motion.footer 
      className="bg-white text-black py-8 text-center border-t border-black pb-20 md:pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-6">
          <motion.div 
            className="mb-4"
            whileHover={{ rotate: 360, transition: { duration: 5, ease: "linear", repeat: Infinity } }}
          >
            <KamdataLogo src={logoSrc} alt="Kamdata Logo Footer" width={100} height={33} />
          </motion.div>
          <p className="text-sm mobile-text mb-1">
            © {new Date().getFullYear()} KAMDATA
          </p>
           <p className="text-sm mobile-text">
            WhatsApp: 
            <a 
              href="https://wa.me/message/X7EEXB5WU6QAM1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold hover:underline"
              style={{ color: '#0492C2' }}
            >
              Contáctanos
            </a>
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-[#0492C2] transition-colors duration-300 group flex items-center justify-center w-8 h-8"
              whileHover={{ scale: 1.2 }}
              title={social.name}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
        
        <p className="text-xs text-gray-600 mobile-text">
          Datos protegidos por la Ley de Transparencia y Protección de Datos de Guanajuato.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;