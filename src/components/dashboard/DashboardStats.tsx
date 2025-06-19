import React from 'react';
import { Users, Video, Clock, Eye } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    totalUsers: number;
    totalVideos: number;
    pendingVideos: number;
    totalViews: number;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Videos',
      value: stats.totalVideos,
      icon: Video,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Pending Videos',
      value: stats.pendingVideos,
      icon: Clock,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: Eye,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`${card.bgColor} rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor}`}>
                  {card.value.toLocaleString()}
                </p>
              </div>
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;