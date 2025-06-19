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
      className="min-h-screen bg-gray-50 flex w-full overflow-x-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onShowUploadModal={handleShowUploadModal}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header onToggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 sm:p-6 bg-gray-50 min-w-0">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
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