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
    <header className="text-white px-4 py-3 flex items-center justify-between shadow-md w-full" style={{ backgroundColor: '#2a835f' }}>
      <div className="flex items-center space-x-3">
        <button 
          onClick={onToggleSidebar}
          className="p-2 rounded transition-colors hover:bg-black hover:bg-opacity-10 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <img 
            src="https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop" 
            alt="FTI Logo" 
            className="w-8 h-8 rounded"
          />
          <span className="font-semibold text-base sm:text-lg">FTI Platform</span>
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
  );
};

export default Header;