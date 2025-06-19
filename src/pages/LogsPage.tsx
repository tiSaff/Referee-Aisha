import React from 'react';
import { FileText, Download, RefreshCw, Filter } from 'lucide-react';
import { useLogsManager } from '../hooks/useLogsManager';
import { usePagination } from '../hooks/usePagination';
import { useAlertStore } from '../store/alertStore';
import { useConfirmationModalStore } from '../store/confirmationModalStore';
import PageHeader from '../components/common/PageHeader';
import SearchBar from '../components/common/SearchBar';
import ErrorDisplay from '../components/common/ErrorDisplay';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import LogsTable from '../components/logs/LogsTable';
import LogsFilters from '../components/logs/LogsFilters';
import Pagination from '../components/common/Pagination';
import PageAlert from '../components/common/PageAlert';

const LogsPage: React.FC = () => {
  const {
    logs,
    loading,
    error,
    searchTerm,
    selectedFilter,
    selectedUser,
    selectedAction,
    totalLogs,
    handleDeleteLog,
    setSearchTerm,
    setSelectedFilter,
    setSelectedUser,
    setSelectedAction,
    clearError,
    refreshLogs,
    getLogStats,
  } = useLogsManager();

  // Alert store for success messages
  const { isVisible: alertVisible, message: alertMessage, hideAlert } = useAlertStore();
  
  // Confirmation modal store
  const { showConfirmation } = useConfirmationModalStore();

  // Pagination hook - ALWAYS show pagination
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData: paginatedLogs,
    goToPage
  } = usePagination({
    data: logs,
    itemsPerPage: 15,
    initialPage: 1
  });

  const logStats = getLogStats();

  // Enhanced delete log with confirmation and success alert
  const handleDeleteLogWithConfirmation = async (id: number) => {
    const log = logs.find(l => l.id === id);
    if (!log) return;

    showConfirmation({
      title: 'Delete Log Entry',
      message: `Are you sure you want to delete this log entry? This action cannot be undone.`,
      confirmText: 'Delete Log',
      cancelText: 'Cancel',
      type: 'danger',
      onConfirm: async () => {
        await handleDeleteLog(id);
        
        // Show success alert after successful delete
        const { showAlert } = useAlertStore.getState();
        showAlert('Log entry deleted successfully!');
      }
    });
  };

  // Enhanced refresh with success alert
  const handleRefreshWithAlert = async () => {
    await refreshLogs();
    const { showAlert } = useAlertStore.getState();
    showAlert('Logs refreshed successfully!');
  };

  // Enhanced export with success alert
  const handleExportLogs = () => {
    // Create CSV content
    const headers = ['ID', 'User', 'Action', 'Description', 'IP Address', 'Timestamp'];
    const csvContent = [
      headers.join(','),
      ...logs.map(log => [
        log.id,
        `"${log.user}"`,
        log.action,
        `"${log.description}"`,
        log.ipAddress,
        log.timestamp
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `logs_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success alert for export
    const { showAlert } = useAlertStore.getState();
    showAlert('Logs data exported successfully!');
  };

  if (loading && logs.length === 0) {
    return <LoadingSpinner message="Loading logs..." />;
  }

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Page Alert */}
      <PageAlert
        isVisible={alertVisible}
        message={alertMessage}
        onClose={hideAlert}
      />

      {error && <ErrorDisplay error={error} onClose={clearError} />}

      <PageHeader
        title="System Logs"
        subtitle="Monitor system activities and user actions"
        icon={FileText}
        count={totalLogs}
        actionButton={{
          label: "Export Logs",
          onClick: handleExportLogs,
          icon: Download
        }}
      />

      {/* Search and Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search logs by user, action, or description..."
            className="flex-1"
          />
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={handleRefreshWithAlert}>
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" onClick={handleExportLogs}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <LogsFilters
        selectedFilter={selectedFilter}
        selectedUser={selectedUser}
        selectedAction={selectedAction}
        onFilterChange={setSelectedFilter}
        onUserChange={setSelectedUser}
        onActionChange={setSelectedAction}
        logStats={logStats}
      />

      {/* Logs Table */}
      {logs.length > 0 ? (
        <>
          <LogsTable 
            logs={paginatedLogs}
            onDelete={handleDeleteLogWithConfirmation}
            loading={loading}
          />
          
          {/* Pagination - ALWAYS SHOW */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.max(1, totalPages)}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={goToPage}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No logs found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
          <Button onClick={() => {
            setSearchTerm('');
            setSelectedFilter('all');
            setSelectedUser('all');
            setSelectedAction('all');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default LogsPage;