import { useEffect } from 'react';
import { useLogsStore } from '../store/logsStore';

export const useLogsManager = () => {
  const {
    logs,
    loading,
    error,
    searchTerm,
    selectedFilter,
    selectedUser,
    selectedAction,
    fetchLogs,
    deleteLog,
    setSearchTerm,
    setSelectedFilter,
    setSelectedUser,
    setSelectedAction,
    clearError,
    getFilteredLogs,
    getLogStats,
  } = useLogsStore();

  // Initialize logs on mount
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Get filtered logs using the enhanced search
  const filteredLogs = getFilteredLogs();
  const logStats = getLogStats();

  const handleDeleteLog = async (id: number) => {
    await deleteLog(id);
  };

  const refreshLogs = async () => {
    await fetchLogs();
  };

  return {
    // State
    logs: filteredLogs,
    allLogs: logs,
    loading,
    error,
    searchTerm,
    selectedFilter,
    selectedUser,
    selectedAction,
    totalLogs: logs.length,
    filteredCount: filteredLogs.length,
    
    // Actions
    handleDeleteLog,
    setSearchTerm,
    setSelectedFilter,
    setSelectedUser,
    setSelectedAction,
    clearError,
    refreshLogs,
    getLogStats: () => logStats,
  };
};