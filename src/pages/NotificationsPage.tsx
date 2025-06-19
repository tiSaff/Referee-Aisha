import React from 'react';
import { Bell, Plus, Download, RefreshCw } from 'lucide-react';
import { useNotificationManager } from '../hooks/useNotificationManager';
import { useUIStore } from '../store/uiStore';
import { usePagination } from '../hooks/usePagination';
import { useAlertStore } from '../store/alertStore';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import ErrorDisplay from '../components/common/ErrorDisplay';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import NotificationList from '../components/notifications/NotificationList';
import AddNotificationModal from '../components/notifications/AddNotificationModal';
import DeleteNotificationModal from '../components/notifications/DeleteNotificationModal';
import Pagination from '../components/common/Pagination';
import PageAlert from '../components/common/PageAlert';

const NotificationsPage: React.FC = () => {
  const {
    notifications,
    loading,
    error,
    searchTerm,
    totalNotifications,
    handleDeleteNotification,
    setSearchTerm,
    clearError,
    refreshNotifications,
  } = useNotificationManager();

  const { setModalState } = useUIStore();
  
  // Alert store for success messages
  const { isVisible: alertVisible, message: alertMessage, hideAlert } = useAlertStore();

  // Pagination hook - ALWAYS show pagination
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData: paginatedNotifications,
    goToPage
  } = usePagination({
    data: notifications,
    itemsPerPage: 10,
    initialPage: 1
  });

  // Enhanced delete notification with success alert
  const handleDeleteNotificationWithAlert = async (id: number) => {
    const notification = notifications.find(n => n.id === id);
    await handleDeleteNotification(id);
    
    // Show success alert after successful delete
    if (notification) {
      const { showAlert } = useAlertStore.getState();
      showAlert(`Notification "${notification.title}" deleted successfully!`);
    }
  };

  // Enhanced refresh with success alert
  const handleRefreshWithAlert = async () => {
    await refreshNotifications();
    const { showAlert } = useAlertStore.getState();
    showAlert('Notifications refreshed successfully!');
  };

  // Enhanced export with success alert
  const handleExportNotifications = () => {
    // Create CSV content
    const headers = ['ID', 'Title', 'Message', 'Assigned To', 'Date', 'Status', 'Recipients'];
    const csvContent = [
      headers.join(','),
      ...notifications.map(notification => [
        notification.id,
        `"${notification.title}"`,
        `"${notification.message}"`,
        notification.assignedTo,
        notification.date,
        notification.status,
        notification.recipients
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `notifications_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success alert for export
    const { showAlert } = useAlertStore.getState();
    showAlert('Notifications data exported successfully!');
  };

  if (loading && notifications.length === 0) {
    return <LoadingSpinner message="Loading notifications..." />;
  }

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Page Alert - After Title */}
      <PageAlert
        isVisible={alertVisible}
        message={alertMessage}
        onClose={hideAlert}
      />

      {error && <ErrorDisplay error={error} onClose={clearError} />}

      <PageHeader
        title="Notifications"
        subtitle="Dashboard / Notifications"
        icon={Bell}
        count={totalNotifications}
        actionButton={{
          label: "Add Notification",
          onClick: () => setModalState('showAddNotificationModal', true),
          icon: Plus
        }}
      />

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search notifications by title or message..."
            className="flex-1"
          />
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={handleRefreshWithAlert}>
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" onClick={handleExportNotifications}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {notifications.length > 0 ? (
        <>
          <NotificationList 
            notifications={paginatedNotifications}
            onDelete={handleDeleteNotificationWithAlert}
            loading={loading}
          />
          
          {/* Pagination - ALWAYS SHOW */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.max(1, totalPages)} // Ensure at least 1 page
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={goToPage}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
          <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
        </div>
      )}

      <AddNotificationModal />
      <DeleteNotificationModal />
    </div>
  );
};

export default NotificationsPage;