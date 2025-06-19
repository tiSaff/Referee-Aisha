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
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Play,
  UserCheck,
  Globe
} from 'lucide-react';
import { useDashboardManager } from '../hooks/useDashboardManager';
import { useAlertStore } from '../store/alertStore';
import ErrorDisplay from '../components/common/ErrorDisplay';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
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
    <div className="space-y-8 px-4 sm:px-0">
      {/* Page Alert */}
      <PageAlert
        isVisible={alertVisible}
        message={alertMessage}
        onClose={hideAlert}
      />

      {error && <ErrorDisplay error={error} onClose={clearError} />}

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your referee platform.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={handleRefreshWithAlert} className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
          <Button onClick={handleExportWithAlert} className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </Button>
        </div>
      </div>

      {dashboardData && (
        <>
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+12%</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{dashboardData.stats.totalUsers}</h3>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-xs text-gray-500 mt-2">+38 new this month</p>
              </div>
            </div>

            {/* Total Videos */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+8%</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{dashboardData.stats.totalVideos}</h3>
                <p className="text-sm text-gray-600">Total Videos</p>
                <p className="text-xs text-gray-500 mt-2">+23 uploaded this week</p>
              </div>
            </div>

            {/* Pending Videos */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-red-600">
                  <ArrowDown className="w-4 h-4" />
                  <span className="text-sm font-medium">-5%</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{dashboardData.stats.pendingVideos}</h3>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-xs text-gray-500 mt-2">Needs attention</p>
              </div>
            </div>

            {/* Total Views */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+24%</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{dashboardData.stats.totalViews.toLocaleString()}</h3>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-xs text-gray-500 mt-2">+1.2k this week</p>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Statistics Chart - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Video Upload Trends</h3>
                      <p className="text-sm text-gray-500">Monthly video uploads over time</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-end justify-between space-x-2 h-64">
                  {dashboardData.videoStatistics.map((item, index) => {
                    const maxVideos = Math.max(...dashboardData.videoStatistics.map(i => i.videos));
                    const height = (item.videos / maxVideos) * 100;
                    
                    return (
                      <div key={index} className="flex flex-col items-center flex-1 group">
                        <div className="w-full flex items-end justify-center h-52 mb-3">
                          <div
                            className="w-12 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 hover:from-green-600 hover:to-green-500 cursor-pointer relative group-hover:scale-105"
                            style={{ height: `${height}%` }}
                            title={`${item.month}: ${item.videos} videos`}
                          >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {item.videos}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-gray-600 text-center">
                          {item.month.split(' ')[0]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Decision Statistics */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Decision Accuracy</h3>
                    <p className="text-sm text-gray-500">Referee decision statistics</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <div className="relative w-40 h-40">
                  {/* Donut Chart */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="10"
                    />
                    {/* Correct decisions arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="10"
                      strokeDasharray={`${(dashboardData.decisionStats.correct / (dashboardData.decisionStats.correct + dashboardData.decisionStats.incorrect)) * 220} 220`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  
                  {/* Center percentage */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {Math.round((dashboardData.decisionStats.correct / (dashboardData.decisionStats.correct + dashboardData.decisionStats.incorrect)) * 100)}%
                      </div>
                      <div className="text-xs text-gray-500">Accuracy</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Correct</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{dashboardData.decisionStats.correct}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Incorrect</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{dashboardData.decisionStats.incorrect}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Most Viewed Videos */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Play className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Top Videos</h3>
                    <p className="text-sm text-gray-500">Most viewed content</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {dashboardData.mostViewedVideos.slice(0, 6).map((video, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-orange-600 transition-colors" title={video.title}>
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-500 truncate">
                        by {video.uploadedBy}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">
                        {video.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Users by Location */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Global Reach</h3>
                    <p className="text-sm text-gray-500">Users by location</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {dashboardData.usersByLocation.slice(0, 8).map((item, index) => {
                  const maxCount = Math.max(...dashboardData.usersByLocation.map(i => i.count));
                  const percentage = (item.count / maxCount) * 100;
                  
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-24 text-sm font-medium text-gray-700 truncate" title={item.location}>
                        {item.location.replace(' Stadium', '')}
                      </div>
                      <div className="flex-1 relative">
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-8 text-sm font-semibold text-gray-900 text-right">
                        {item.count}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <p className="text-sm text-gray-500">Latest platform activities</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Last 24 hours</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardData.recentActivities.slice(0, 8).map((activity, index) => {
                const getActivityIcon = (type: string) => {
                  switch (type) {
                    case 'create': return <CheckCircle className="w-4 h-4" />;
                    case 'update': return <Activity className="w-4 h-4" />;
                    case 'delete': return <AlertTriangle className="w-4 h-4" />;
                    case 'view': return <Eye className="w-4 h-4" />;
                    default: return <Activity className="w-4 h-4" />;
                  }
                };

                const getActivityColor = (type: string) => {
                  switch (type) {
                    case 'create': return 'bg-green-100 text-green-600 border-green-200';
                    case 'update': return 'bg-blue-100 text-blue-600 border-blue-200';
                    case 'delete': return 'bg-red-100 text-red-600 border-red-200';
                    case 'view': return 'bg-gray-100 text-gray-600 border-gray-200';
                    default: return 'bg-gray-100 text-gray-600 border-gray-200';
                  }
                };

                return (
                  <div key={activity.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 mb-1">{activity.user}</div>
                        <div className="text-xs text-gray-600 mb-2">{activity.action}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Stats */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
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
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4" />
                  <span>{dashboardData.stats.totalUsers} Active Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Video className="w-4 h-4" />
                  <span>{dashboardData.stats.totalVideos} Total Videos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>{dashboardData.stats.totalViews.toLocaleString()} Total Views</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;