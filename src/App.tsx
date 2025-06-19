import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import UploadVideoModal from './components/UploadVideoModal';
import UsersPage from './pages/UsersPage';
import VideosPage from './pages/VideosPage';
import AddTopicPage from './pages/AddTopicPage';
import NotificationsPage from './pages/NotificationsPage';
import ExternalUsersPage from './pages/ExternalUsersPage';
import GlobalConfirmationModal from './components/common/GlobalConfirmationModal';
import { useUIStore } from './store/uiStore';
import { useLanguageStore } from './store/languageStore';

function App() {
  const {
    sidebarOpen,
    currentPage,
    showUploadModal,
    setSidebarOpen,
    setCurrentPage,
    setModalState,
  } = useUIStore();

  // Use selector syntax for better performance
  const currentLanguage = useLanguageStore(state => state.currentLanguage);
  const t = useLanguageStore(state => state.t);
  const isRTL = currentLanguage === 'ar';

  // Sync HTML direction whenever language changes
  useEffect(() => {
    console.log('App: Language changed to', currentLanguage, 'RTL:', isRTL);
    
    // Set document direction and language
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Toggle RTL class on body for additional styling
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
    
    console.log('App: DOM updated - html dir:', document.documentElement.dir, 'body classes:', document.body.className);
  }, [currentLanguage, isRTL]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const handleShowUploadModal = () => {
    setModalState('showUploadModal', true);
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'videos':
        return t('videos.title');
      case 'users':
        return t('users.title');
      case 'external':
        return t('externalUsers.title');
      case 'notifications':
        return t('notifications.title');
      case 'add-topic':
        return t('addTopic.title');
      default:
        return t('videos.title');
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'users':
        return <UsersPage />;
      case 'external':
        return <ExternalUsersPage />;
      case 'add-topic':
        return <AddTopicPage />;
      case 'notifications':
        return <NotificationsPage />;
      default:
        return <VideosPage />;
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex w-full overflow-x-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        currentPage={currentPage}
        onNavigate={handleNavigation}
        onShowUploadModal={handleShowUploadModal}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onToggleSidebar={toggleSidebar} />

        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sm:py-5">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {getPageTitle()}
          </h1>
        </div>

        <main className="flex-1 p-4 sm:p-6 bg-gray-50 min-w-0">
          {renderPageContent()}
        </main>
      </div>

      <UploadVideoModal
        isOpen={showUploadModal}
        onClose={() => setModalState('showUploadModal', false)}
      />

      {/* Global Confirmation Modal */}
      <GlobalConfirmationModal />
    </div>
  );
}

export default App;