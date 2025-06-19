import React from 'react';

interface TopicFormProps {
  topicName: string;
  arabicName: string;
  onTopicNameChange: (name: string) => void;
  onArabicNameChange: (name: string) => void;
}

const TopicForm: React.FC<TopicFormProps> = ({
  topicName,
  arabicName,
  onTopicNameChange,
  onArabicNameChange
}) => {
  return (
    <div className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={topicName}
          onChange={(e) => onTopicNameChange(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
          style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
          required
        />
      </div>

      {/* Arabic Name Field */}
      <div>
        <label htmlFor="arabic-name" className="block text-sm font-medium text-gray-700 mb-2">
          الاسم
        </label>
        <input
          type="text"
          id="arabic-name"
          value={arabicName}
          onChange={(e) => onArabicNameChange(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
          style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
          dir="rtl"
        />
      </div>
    </div>
  );
};

export default TopicForm;