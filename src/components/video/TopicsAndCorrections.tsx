import React from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';

interface TopicCorrectionPair {
  id: string;
  selectedTopic: string;
  selectedSubTopic: string;
  selectedCorrection: string;
}

interface TopicsAndCorrectionsProps {
  topicPairs: TopicCorrectionPair[];
  topicsSystem: Record<string, {
    subOptions: string[];
    considerations: string;
  }>;
  correctionOptions: string[];
  onAddTopicPair: () => void;
  onRemoveTopicPair: (id: string) => void;
  onUpdateTopicPair: (id: string, field: keyof TopicCorrectionPair, value: string) => void;
}

const TopicsAndCorrections: React.FC<TopicsAndCorrectionsProps> = ({
  topicPairs,
  topicsSystem,
  correctionOptions,
  onAddTopicPair,
  onRemoveTopicPair,
  onUpdateTopicPair
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Topics & Corrections</label>
      
      {topicPairs.map((pair, index) => (
        <div key={pair.id} className="relative border border-gray-200 rounded-lg p-4 bg-gray-50">
          {/* Remove button (only show if more than one pair) */}
          {topicPairs.length > 1 && (
            <button
              onClick={() => onRemoveTopicPair(pair.id)}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-600 mb-2">
              Topic Set {index + 1}
            </div>

            {/* Topics */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Topics</label>
              <div className="relative">
                <select 
                  value={pair.selectedTopic}
                  onChange={(e) => onUpdateTopicPair(pair.id, 'selectedTopic', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent appearance-none bg-white transition-all duration-200"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                >
                  <option value="">Select Topic</option>
                  {Object.entries(topicsSystem).map(([topic, data]) => (
                    <option key={topic} value={topic}>
                      {topic} {data.subOptions.length > 0 ? `[${data.subOptions.length}]` : ''}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            {/* Sub Topics (only show if main topic has sub-options) */}
            {pair.selectedTopic && topicsSystem[pair.selectedTopic as keyof typeof topicsSystem]?.subOptions.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Select Sub Option</label>
                <div className="relative">
                  <select 
                    value={pair.selectedSubTopic}
                    onChange={(e) => onUpdateTopicPair(pair.id, 'selectedSubTopic', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent appearance-none bg-white transition-all duration-200"
                    style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                  >
                    <option value="">Select Sub Option</option>
                    {topicsSystem[pair.selectedTopic as keyof typeof topicsSystem].subOptions.map((subOption) => (
                      <option key={subOption} value={subOption}>
                        {subOption}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Correction */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Correction</label>
              <div className="relative">
                <select 
                  value={pair.selectedCorrection}
                  onChange={(e) => onUpdateTopicPair(pair.id, 'selectedCorrection', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent appearance-none bg-white transition-all duration-200"
                  style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
                >
                  <option value="">Select</option>
                  {correctionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Auto-filled Considerations for this topic */}
            {pair.selectedTopic && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Considerations</label>
                <div className="bg-white border border-gray-200 rounded-md p-3 text-sm text-gray-700 max-h-32 overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-sans">
                    {topicsSystem[pair.selectedTopic as keyof typeof topicsSystem]?.considerations || 'No considerations available'}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Add More Button */}
      <button
        onClick={onAddTopicPair}
        className="flex items-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-all duration-200 w-full justify-center group"
        style={{ 
          '--hover-border-color': '#2a835f',
          '--hover-text-color': '#2a835f'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#2a835f';
          e.currentTarget.style.color = '#2a835f';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#d1d5db';
          e.currentTarget.style.color = '#6b7280';
        }}
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Add More Topics</span>
      </button>
    </div>
  );
};

export default TopicsAndCorrections;