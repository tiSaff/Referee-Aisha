import React, { useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguageStore, Language } from '../../store/languageStore';
import { useLanguageSelectorStore } from '../../store/languageSelectorStore';

const LanguageSelector: React.FC = () => {
  // Use selector syntax for better performance
  const currentLanguage = useLanguageStore(state => state.currentLanguage);
  const setLanguage = useLanguageStore(state => state.setLanguage);
  const t = useLanguageStore(state => state.t);
  
  const { isOpen, setIsOpen, toggleOpen, closeDropdown } = useLanguageSelectorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeDropdown]);

  const handleLanguageChange = (language: Language, event: React.MouseEvent) => {
    // Prevent event bubbling immediately
    event.preventDefault();
    event.stopPropagation();
    
    console.log('LanguageSelector: Click event fired for language:', language);
    console.log('LanguageSelector: Current language before change:', currentLanguage);
    
    // Prevent changing to the same language
    if (language === currentLanguage) {
      console.log('LanguageSelector: Same language selected, closing dropdown');
      closeDropdown();
      return;
    }
    
    try {
      console.log('LanguageSelector: About to call setLanguage with:', language);
      
      // Call setLanguage to update the store
      setLanguage(language);
      
      console.log('LanguageSelector: setLanguage called, closing dropdown');
      
      // Close dropdown after a small delay to ensure the click is processed
      setTimeout(() => {
        closeDropdown();
        console.log('LanguageSelector: Dropdown closed');
      }, 50);
      
    } catch (error) {
      console.error('LanguageSelector: Error changing language:', error);
    }
  };

  const handleDropdownToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('LanguageSelector: Dropdown toggle clicked, current state:', isOpen);
    toggleOpen();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleDropdownToggle}
        className="flex items-center space-x-2 px-3 py-2 text-white rounded-lg hover:bg-black hover:bg-opacity-10 transition-colors"
        aria-label={t('language.selectLanguage')}
        type="button"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLang?.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[140px] z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onMouseDown={(e) => {
                console.log('LanguageSelector: MouseDown event for:', language.code);
                handleLanguageChange(language.code, e);
              }}
              onClick={(e) => {
                console.log('LanguageSelector: Click event for:', language.code);
                handleLanguageChange(language.code, e);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                currentLanguage === language.code ? 'bg-green-50 text-green-700' : 'text-gray-700'
              }`}
              type="button"
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
              {currentLanguage === language.code && (
                <div className="w-2 h-2 bg-green-600 rounded-full ml-auto"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;