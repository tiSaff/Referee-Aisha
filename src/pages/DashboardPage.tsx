import React from 'react';
import { 
  BarChart3, 
  Users, 
  Video, 
  TrendingUp, 
  Activity,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';
import { useDashboardManager } from '../hooks/useDashboardManager';
import { useAlertStore } from '../store/alertStore';
import PageHeader from '../components/common/PageHeader';
import ErrorDisplay from '../components/common/ErrorDisplay';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import DashboardStats from '../components/dashboard/DashboardStats';
import UsersByLocationChart from '../components/dashboard/UsersByLocationChart';
import VideoStatisticsChart from '../components/dashboard/VideoStatisticsChart';
import DecisionStatistics from '../components/dashboard/DecisionStatistics';
import MostViewedVideos from '../components/dashboard/MostViewedVideos';
import RecentActivity from '../components/dashboard/RecentActivity';
import PageAlert from '../components/common/PageAlert';

const DashboardPage: React.FC = () => {
  const {
    dashboardData,
    loading,
    error,
    refreshDashboard,
    exportDashboardData,
    clearError,
  } = useDashboardManager();

  // Alert store for success messages
  const { isVisible: alertVisible, message: alertMessage, hideAlert } = useAlertStore();

  // Enhanced refresh with success alert
  const handleRefreshWithAlert = async () => {
    await refreshDashboard();
    const { showAlert } = useAlertStore.getState();
    showAlert('Dashboard data refreshed successfully!');
  };

  // Enhanced export with success alert
  const handleExportWithAlert = () => {
    exportDashboardData();
    const { showAlert } = useAlertStore.getState();
    showAlert('Dashboard data exported successfully!');
  };

  if (loading && !dashboardData) {
    return <LoadingSpinner message="Loading dashboard..." />;
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
        title="Dashboard"
        subtitle="Overview of system performance and analytics"
        icon={BarChart3}
        actionButton={{
          label: "Export Data",
          onClick: handleExportWithAlert,
          icon: Download
        }}
      />

      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Last updated: {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={handleRefreshWithAlert}>
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button variant="ghost" onClick={handleExportWithAlert}>
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {dashboardData && (
        <>
          {/* Statistics Cards */}
          <DashboardStats stats={dashboardData.stats} />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Users by Location Chart */}
            <UsersByLocationChart data={dashboardData.usersByLocation} />
            
            {/* Video Statistics Chart */}
            <VideoStatisticsChart data={dashboardData.videoStatistics} />
          </div>

          {/* Second Row Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Decision Statistics */}
            <DecisionStatistics data={dashboardData.decisionStats} />
            
            {/* Most Viewed Videos */}
            <MostViewedVideos data={dashboardData.mostViewedVideos} />
          </div>

          {/* Recent Activity */}
          <RecentActivity activities={dashboardData.recentActivities} />
        </>
      )}
    </div>
  );
};

export default DashboardPage;