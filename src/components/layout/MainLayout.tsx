import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../common/Footer';
import UploadVideoModal from '../UploadVideoModal';
import GlobalConfirmationModal from '../common/GlobalConfirmationModal';
import { useUIStore } from '../../store/uiStore';

const MainLayout: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const {
    sidebarOpen,
    showUploadModal,
    setSidebarOpen,
    setModalState,
  } = useUIStore();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleShowUploadModal = () => {
    setModalState('showUploadModal', true);
  };

  return (
    <div
      className="min-h-screen flex flex-col w-full"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <Header onToggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          onShowUploadModal={handleShowUploadModal}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-auto bg-gray-50">
          <main className="flex-1 p-4 sm:p-6 min-w-0">
            <Outlet />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      <UploadVideoModal
        isOpen={showUploadModal}
        onClose={() => setModalState('showUploadModal', false)}
      />

      {/* Global Confirmation Modal */}
      <GlobalConfirmationModal />
    </div>
  );
};

export default MainLayout;