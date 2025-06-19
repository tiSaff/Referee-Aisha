import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface SubtopicsManagerProps {
  subtopics: string[];
  onAddSubtopic: () => void;
  onRemoveSubtopic: (index: number) => void;
  onUpdateSubtopic: (index: number, value: string) => void;
}

const SubtopicsManager: React.FC<SubtopicsManagerProps> = ({
  subtopics,
  onAddSubtopic,
  onRemoveSubtopic,
  onUpdateSubtopic
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Subtopics
        </label>
        <button
          type="button"
          onClick={onAddSubtopic}
          className="flex items-center space-x-1 text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: '#2a835f' }}
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {subtopics.map((subtopic, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={subtopic}
              onChange={(e) => onUpdateSubtopic(index, e.target.value)}
              placeholder={`Subtopic ${index + 1}`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm transition-all duration-200"
              style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
            />
            <button
              type="button"
              onClick={() => onRemoveSubtopic(index)}
              className="p-2 text-red-500 hover:text-red-700 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
        {subtopics.length === 0 && (
          <p className="text-sm text-gray-500 italic">No subtopics added</p>
        )}
      </div>
    </div>
  );
};

export default SubtopicsManager;