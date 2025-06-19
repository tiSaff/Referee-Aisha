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
  Globe,
  Monitor
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
    <div className="space-y-6 px-4 sm:px-0 bg-gray-50 min-h-screen">
      {/* Page Alert */}
      <PageAlert
        isVisible={alertVisible}
        message={alertMessage}
        onClose={hideAlert}
      />

      {error && <ErrorDisplay error={error} onClose={clearError} />}

      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Analytics Dashboard</h1>
            <p className="text-gray-600 text-sm">Comprehensive insights into your referee platform performance</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={handleRefreshWithAlert} className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 text-sm">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
            <Button onClick={handleExportWithAlert} className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white text-sm">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>
      </div>

      {dashboardData && (
        <>
          {/* Last Updated Container - Moved to Top */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last updated</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    <span className="text-lg font-bold text-gray-900">{dashboardData.stats.totalUsers}</span>
                  </div>
                  <p className="text-xs text-gray-600">Active Users</p>
                </div>
                
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                    <Video className="w-4 h-4 text-purple-600" />
                    <span className="text-lg font-bold text-gray-900">{dashboardData.stats.totalVideos}</span>
                  </div>
                  <p className="text-xs text-gray-600">Total Videos</p>
                </div>
                
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-lg font-bold text-gray-900">{dashboardData.stats.pendingVideos}</span>
                  </div>
                  <p className="text-xs text-gray-600">Pending Review</p>
                </div>
                
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-2 mb-1">
                    <Eye className="w-4 h-4 text-green-600" />
                    <span className="text-lg font-bold text-gray-900">{dashboardData.stats.totalViews.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-600">Total Views</p>
                </div>
              </div>
            </div>
          </div>

          {/* Four Main Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Top Videos Watch */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Top Videos</h3>
                    <p className="text-sm text-gray-600">Most watched content</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-md">
                  <ArrowUp className="w-3 h-3" />
                  <span className="text-xs font-medium">+24%</span>
                </div>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {dashboardData.mostViewedVideos.slice(0, 6).map((video, index) => {
                  const maxViews = Math.max(...dashboardData.mostViewedVideos.map(v => v.views));
                  const percentage = (video.views / maxViews) * 100;
                  
                  return (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white font-medium text-xs ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-purple-500' :
                            index === 2 ? 'bg-indigo-500' :
                            'bg-gray-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors" title={video.title}>
                              {video.title}
                            </h4>
                            <p className="text-xs text-gray-500">by {video.uploadedBy}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{video.views.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart 2: Video Status Analytics */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Video Status</h3>
                    <p className="text-sm text-gray-600">Content approval analytics</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">{dashboardData.stats.totalVideos}</div>
                  <div className="text-xs text-gray-500">Total Videos</div>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <div className="relative w-32 h-32">
                  {/* Donut Chart for Video Status */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="8"
                    />
                    {/* Published videos arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="8"
                      strokeDasharray={`${(dashboardData.stats.totalVideos - dashboardData.stats.pendingVideos) / dashboardData.stats.totalVideos * 220} 220`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    {/* Pending videos arc */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="8"
                      strokeDasharray={`${dashboardData.stats.pendingVideos / dashboardData.stats.totalVideos * 220} 220`}
                      strokeDashoffset={`-${(dashboardData.stats.totalVideos - dashboardData.stats.pendingVideos) / dashboardData.stats.totalVideos * 220}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">
                        {Math.round((dashboardData.stats.totalVideos - dashboardData.stats.pendingVideos) / dashboardData.stats.totalVideos * 100)}%
                      </div>
                      <div className="text-xs text-gray-500">Published</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{dashboardData.stats.totalVideos - dashboardData.stats.pendingVideos}</div>
                      <div className="text-xs text-gray-600">Published</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{dashboardData.stats.pendingVideos}</div>
                      <div className="text-xs text-gray-600">Pending</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 3: External Users by Country */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Global Users</h3>
                    <p className="text-sm text-gray-600">Users by country</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                  <Users className="w-3 h-3" />
                  <span className="text-xs font-medium">{dashboardData.stats.totalUsers}</span>
                </div>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {[
                  { country: 'Uzbekistan', users: 45, flag: '🇺🇿' },
                  { country: 'Oman', users: 38, flag: '🇴🇲' },
                  { country: 'Malaysia', users: 35, flag: '🇲🇾' },
                  { country: 'Spain', users: 32, flag: '🇪🇸' },
                  { country: 'United States', users: 28, flag: '🇺🇸' },
                  { country: 'United Kingdom', users: 25, flag: '🇬🇧' },
                  { country: 'Germany', users: 22, flag: '🇩🇪' },
                  { country: 'France', users: 18, flag: '🇫🇷' }
                ].map((item, index) => {
                  const maxUsers = 45;
                  const percentage = (item.users / maxUsers) * 100;
                  
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 w-24">
                        <span className="text-lg">{item.flag}</span>
                        <span className="text-xs font-medium text-gray-700 truncate">{item.country}</span>
                      </div>
                      <div className="flex-1 relative">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-8 text-xs font-medium text-gray-900 text-right">
                        {item.users}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart 4: Website Visits by Month/Week */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Site Analytics</h3>
                    <p className="text-sm text-gray-600">Monthly platform visits</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-md">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs font-medium">+18%</span>
                </div>
              </div>

              <div className="flex items-end justify-between space-x-2 h-40 mb-4">
                {[
                  { month: 'Jan', visits: 12500 },
                  { month: 'Feb', visits: 15200 },
                  { month: 'Mar', visits: 11800 },
                  { month: 'Apr', visits: 18600 },
                  { month: 'May', visits: 16400 },
                  { month: 'Jun', visits: 21300 }
                ].map((item, index) => {
                  const maxVisits = 21300;
                  const height = (item.visits / maxVisits) * 100;
                  
                  return (
                    <div key={index} className="flex flex-col items-center flex-1 group">
                      <div className="w-full flex items-end justify-center h-32 mb-2">
                        <div
                          className="w-full bg-gray-400 rounded-t transition-all duration-700 hover:bg-gray-500 cursor-pointer relative group-hover:scale-105"
                          style={{ height: `${height}%` }}
                          title={`${item.month}: ${item.visits.toLocaleString()} visits`}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.visits.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-gray-700">
                        {item.month}
                      </div>
                      <div className="text-xs text-gray-500">
                        {(item.visits / 1000).toFixed(1)}k
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Weekly breakdown */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">This Week</h4>
                <div className="grid grid-cols-7 gap-1">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                    const visits = [3200, 2800, 3600, 4100, 3900, 2400, 1800][index];
                    const maxWeeklyVisits = 4100;
                    const height = (visits / maxWeeklyVisits) * 100;
                    
                    return (
                      <div key={day} className="text-center">
                        <div className="h-12 flex items-end justify-center mb-1">
                          <div
                            className="w-4 bg-gray-300 rounded-t transition-all duration-500"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                        <div className="text-xs font-medium text-gray-600">{day}</div>
                        <div className="text-xs text-gray-500">{(visits / 1000).toFixed(1)}k</div>
                      </div>
                    );
                  })}
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