import React from 'react';
import { Upload, Plus } from 'lucide-react';

interface TopicHeaderProps {
  onCreateTopic: () => void;
}

const TopicHeader: React.FC<TopicHeaderProps> = ({ onCreateTopic }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(42, 131, 95, 0.1)' }}>
            <Upload className="w-5 sm:w-6 h-5 sm:h-6" style={{ color: '#2a835f' }} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Topics Management</h1>
            <p className="text-sm sm:text-base text-gray-600">Manage referee training topics and subtopics</p>
          </div>
        </div>
        
        <button
          onClick={onCreateTopic}
          className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:opacity-90 w-full sm:w-auto"
          style={{ backgroundColor: '#2a835f' }}
        >
          <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="text-sm sm:text-base">Add New Topic</span>
        </button>
      </div>
    </div>
  );
};

export default TopicHeader;