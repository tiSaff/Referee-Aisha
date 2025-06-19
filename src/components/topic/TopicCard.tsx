import React from 'react';
import { Upload, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  arabicName: string;
  considerations: string;
  subtopics: string[];
  image?: string;
}

interface TopicCardProps {
  topic: Topic;
  activeDropdown: string | null;
  onToggleDropdown: (topicId: string, e: React.MouseEvent) => void;
  onView: (topic: Topic) => void;
  onEdit: (topic: Topic) => void;
  onDelete: (topicId: string) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  activeDropdown,
  onToggleDropdown,
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group">
      {/* Topic Image */}
      <div className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {topic.image ? (
          <img 
            src={topic.image} 
            alt={topic.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <Upload className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {/* Action Menu */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            <button 
              onClick={(e) => onToggleDropdown(topic.id, e)}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-600" />
            </button>
            
            {/* Dropdown Menu */}
            {activeDropdown === topic.id && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[120px] z-30">
                <button
                  onClick={() => onView(topic)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => onEdit(topic)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDelete(topic.id)}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Subtopics Count */}
        {topic.subtopics.length > 0 && (
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-80 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            {topic.subtopics.length} subtopics
          </div>
        )}
      </div>

      {/* Topic Info */}
      <div className="p-4 sm:p-6">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-gray-900 text-lg sm:text-xl leading-tight">
              {topic.name}
            </h3>
            {topic.arabicName && (
              <p className="text-sm sm:text-base text-gray-600 mt-1" dir="rtl">
                {topic.arabicName}
              </p>
            )}
          </div>

          {/* Subtopics Preview */}
          {topic.subtopics.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {topic.subtopics.slice(0, 3).map((subtopic: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {subtopic}
                </span>
              ))}
              {topic.subtopics.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{topic.subtopics.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Considerations Preview */}
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
            {topic.considerations.substring(0, 100)}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;