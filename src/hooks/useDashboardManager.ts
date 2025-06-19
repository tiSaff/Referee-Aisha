import { useEffect } from 'react';
import { useDashboardStore } from '../store/dashboardStore';

export const useDashboardManager = () => {
  const {
    dashboardData,
    loading,
    error,
    fetchDashboardData,
    clearError,
  } = useDashboardStore();

  // Initialize dashboard data on mount
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const refreshDashboard = async () => {
    await fetchDashboardData();
  };

  const exportDashboardData = () => {
    if (!dashboardData) return;

    // Create comprehensive CSV export
    const csvData = [
      ['Dashboard Export', new Date().toISOString()],
      [''],
      ['Statistics'],
      ['Total Users', dashboardData.stats.totalUsers],
      ['Total Videos', dashboardData.stats.totalVideos],
      ['Pending Videos', dashboardData.stats.pendingVideos],
      ['Total Views', dashboardData.stats.totalViews],
      [''],
      ['Users by Location'],
      ['Location', 'Count'],
      ...dashboardData.usersByLocation.map(item => [item.location, item.count]),
      [''],
      ['Video Statistics'],
      ['Month', 'Videos'],
      ...dashboardData.videoStatistics.map(item => [item.month, item.videos]),
      [''],
      ['Most Viewed Videos'],
      ['Title', 'Views'],
      ...dashboardData.mostViewedVideos.map(item => [item.title, item.views])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `dashboard_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    dashboardData,
    loading,
    error,
    refreshDashboard,
    exportDashboardData,
    clearError,
  };
};