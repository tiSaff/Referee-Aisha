import React from 'react';
import { Users as UsersIcon, UserCheck, UserX, Trash2 } from 'lucide-react';

interface UserStats {
  total: number;
  active: number;
  inactive: number;
  deleted: number;
}

interface ExternalUserTabsProps {
  activeTab: 'all' | 'active' | 'inactive' | 'deleted';
  userStats: UserStats;
  onTabChange: (tab: 'all' | 'active' | 'inactive' | 'deleted') => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const ExternalUserTabs: React.FC<ExternalUserTabsProps> = ({
  activeTab,
  userStats,
  onTabChange,
  isRTL,
  t
}) => {
  const tabs = [
    { 
      id: 'all' as const, 
      label: 'All Users', 
      count: userStats.total,
      icon: UsersIcon,
      color: 'text-gray-600',
      description: 'All external users'
    },
    { 
      id: 'active' as const, 
      label: 'Active Users', 
      count: userStats.active,
      icon: UserCheck,
      color: 'text-green-600',
      description: 'Currently active users'
    },
    { 
      id: 'inactive' as const, 
      label: 'Inactive Users', 
      count: userStats.inactive,
      icon: UserX,
      color: 'text-red-600',
      description: 'Inactive users'
    },
    { 
      id: 'deleted' as const, 
      label: 'Deleted Users', 
      count: userStats.deleted,
      icon: Trash2,
      color: 'text-gray-500',
      description: 'Deleted users'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filter by Status</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-${isRTL ? 'right' : 'left'} group hover:shadow-lg transform hover:scale-[1.02] ${
                isActive 
                  ? 'border-2 shadow-lg scale-[1.02]' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={isActive ? { 
                borderColor: '#2a835f',
                backgroundColor: 'rgba(42, 131, 95, 0.05)'
              } : {}}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon 
                  className={`w-6 h-6 ${isActive ? '' : tab.color} transition-colors`}
                  style={isActive ? { color: '#2a835f' } : {}}
                />
                <span 
                  className={`text-3xl font-bold ${isActive ? '' : 'text-gray-900'} transition-colors`}
                  style={isActive ? { color: '#2a835f' } : {}}
                >
                  {tab.count}
                </span>
              </div>
              <h3 
                className={`font-semibold text-lg ${isActive ? '' : 'text-gray-700'} transition-colors`}
                style={isActive ? { color: '#2a835f' } : {}}
              >
                {tab.label}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                {tab.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ExternalUserTabs;