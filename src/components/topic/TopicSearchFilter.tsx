import React from 'react';
import { Search, Filter } from 'lucide-react';

interface TopicSearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filteredCount: number;
  totalCount: number;
}

const TopicSearchFilter: React.FC<TopicSearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  filteredCount,
  totalCount
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
            style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            {filteredCount} of {totalCount} topics
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopicSearchFilter;