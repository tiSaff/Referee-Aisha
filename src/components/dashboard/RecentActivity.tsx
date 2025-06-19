import React from 'react';
import { Activity, User, Video, Plus, Edit, Trash2, Eye } from 'lucide-react';

interface RecentActivityProps {
  activities: Array<{
    id: number;
    user: string;
    action: string;
    description: string;
    timestamp: string;
    type: 'create' | 'update' | 'delete' | 'view';
  }>;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create':
        return Plus;
      case 'update':
        return Edit;
      case 'delete':
        return Trash2;
      case 'view':
        return Eye;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'create':
        return 'bg-green-100 text-green-600';
      case 'update':
        return 'bg-blue-100 text-blue-600';
      case 'delete':
        return 'bg-red-100 text-red-600';
      case 'view':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <span className="text-sm text-gray-500">Last 24 hours</span>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const colorClass = getActivityColor(activity.type);
          
          return (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClass} flex-shrink-0`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">{activity.user}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm font-medium text-gray-700">{activity.action}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                <span className="text-xs text-gray-500">{formatTime(activity.timestamp)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;