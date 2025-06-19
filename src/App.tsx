import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Routing from './components/routing/Routing';
import './i18n';

function App() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Sync HTML direction whenever language changes
  useEffect(() => {
    console.log('App: Language changed to', i18n.language, 'RTL:', isRTL);
    
    // Set document direction and language
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Toggle RTL class on body for additional styling
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
    
    console.log('App: DOM updated - html dir:', document.documentElement.dir, 'body classes:', document.body.className);
  }, [i18n.language, isRTL]);

  return (
    <BrowserRouter basename="/fti-platform-demo/">
      <Routing />
    </BrowserRouter>
  );
}

export default App;