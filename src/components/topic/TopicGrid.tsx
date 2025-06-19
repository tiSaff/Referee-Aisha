import React from 'react';
import { Upload } from 'lucide-react';
import TopicCard from './TopicCard';

interface Topic {
  id: string;
  name: string;
  arabicName: string;
  considerations: string;
  subtopics: string[];
  image?: string;
}

interface TopicGridProps {
  topics: Topic[];
  activeDropdown: string | null;
  searchTerm: string;
  onToggleDropdown: (topicId: string, e: React.MouseEvent) => void;
  onView: (topic: Topic) => void;
  onEdit: (topic: Topic) => void;
  onDelete: (topicId: string) => void;
  onCreateTopic: () => void;
}

const TopicGrid: React.FC<TopicGridProps> = ({
  topics,
  activeDropdown,
  searchTerm,
  onToggleDropdown,
  onView,
  onEdit,
  onDelete,
  onCreateTopic
}) => {
  if (topics.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
        <Upload className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No topics found</h3>
        <p className="text-sm sm:text-base text-gray-500 mb-6">
          {searchTerm ? 'Try adjusting your search criteria' : 'Get started by creating your first topic'}
        </p>
        {!searchTerm && (
          <button
            onClick={onCreateTopic}
            className="px-6 py-3 text-white rounded-lg font-medium transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: '#2a835f' }}
          >
            Create First Topic
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          topic={topic}
          activeDropdown={activeDropdown}
          onToggleDropdown={onToggleDropdown}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TopicGrid;