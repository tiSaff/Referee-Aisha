import React from 'react';
import { useLanguageStore } from '../../store/languageStore';

const Footer: React.FC = () => {
  const { currentLanguage } = useLanguageStore();
  const isRTL = currentLanguage === 'ar';

  return (
    <footer 
      className="bg-white border-t border-gray-200 py-6 px-4 sm:px-6 mt-auto"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-sm text-gray-600 font-medium">
            2025 © Technology and Innovation @ SAFF
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;