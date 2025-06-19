import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Bell, User, Globe } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="text-white px-4 py-3 flex items-center justify-between lg:hidden shadow-md" style={{ backgroundColor: '#2a835f' }}>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onToggleSidebar}
            className="p-2 rounded transition-colors hover:bg-black hover:bg-opacity-10"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <img 
              src="https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop" 
              alt="MySAFF Logo" 
              className="w-8 h-8 rounded"
            />
            <span className="font-semibold text-base sm:text-lg">{t('header.platform')}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1 p-2 rounded transition-colors hover:bg-black hover:bg-opacity-10"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs">{i18n.language === 'en' ? 'ع' : 'EN'}</span>
          </button>
          <button className="p-2 rounded transition-colors hover:bg-black hover:bg-opacity-10">
            <Bell className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
          <button className="p-2 rounded transition-colors hover:bg-black hover:bg-opacity-10">
            <User className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:flex items-center justify-between text-white px-6 py-4 shadow-md" style={{ backgroundColor: '#2a835f' }}>
        <div className="flex items-center space-x-4">
          <img 
            src="https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" 
            alt="MySAFF Logo" 
            className="w-10 h-10 rounded"
          />
          <span className="font-bold text-xl">{t('header.platform')}</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-black hover:bg-opacity-10 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">
              {i18n.language === 'en' ? 'العربية' : 'English'}
            </span>
          </button>
          
          <button className="p-2 rounded-full transition-colors duration-200 hover:bg-black hover:bg-opacity-10">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="p-2 rounded-full transition-colors duration-200 hover:bg-black hover:bg-opacity-10">
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;