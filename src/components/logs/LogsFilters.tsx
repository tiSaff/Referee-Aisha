import React from 'react';
import { Filter, Users, Activity, BarChart3 } from 'lucide-react';

interface LogStats {
  total: number;
  create: number;
  update: number;
  delete: number;
  login: number;
  uniqueUsers: number;
}

interface LogsFiltersProps {
  selectedFilter: string;
  selectedUser: string;
  selectedAction: string;
  onFilterChange: (filter: string) => void;
  onUserChange: (user: string) => void;
  onActionChange: (action: string) => void;
  logStats: LogStats;
}

const LogsFilters: React.FC<LogsFiltersProps> = ({
  selectedFilter,
  selectedUser,
  selectedAction,
  onFilterChange,
  onUserChange,
  onActionChange,
  logStats
}) => {
  const actionTypes = [
    { value: 'all', label: 'All Actions', count: logStats.total },
    { value: 'Create', label: 'Create', count: logStats.create },
    { value: 'Update', label: 'Update', count: logStats.update },
    { value: 'Delete', label: 'Delete', count: logStats.delete },
    { value: 'Login', label: 'Login', count: logStats.login },
  ];

  const timeFilters = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Logs</p>
              <p className="text-2xl font-bold text-blue-900">{logStats.total}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Create Actions</p>
              <p className="text-2xl font-bold text-green-900">{logStats.create}</p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Unique Users</p>
              <p className="text-2xl font-bold text-purple-900">{logStats.uniqueUsers}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Delete Actions</p>
              <p className="text-2xl font-bold text-red-900">{logStats.delete}</p>
            </div>
            <Filter className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Time Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Period
          </label>
          <select
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
            style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
          >
            {timeFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Action Type
          </label>
          <select
            value={selectedAction}
            onChange={(e) => onActionChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
            style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
          >
            {actionTypes.map((action) => (
              <option key={action.value} value={action.value}>
                {action.label} ({action.count})
              </option>
            ))}
          </select>
        </div>

        {/* User Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User
          </label>
          <select
            value={selectedUser}
            onChange={(e) => onUserChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
            style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
          >
            <option value="all">All Users</option>
            <option value="Sarah Alansari">Sarah Alansari</option>
            <option value="Alhussain Hassan">Alhussain Hassan</option>
            <option value="Saad Alsarmi">Saad Alsarmi</option>
            <option value="Hassan Alhussain">Hassan Alhussain</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LogsFilters;