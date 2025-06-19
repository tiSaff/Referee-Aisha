import React from 'react';

interface ExplanationsSectionProps {
  explanations: string;
  onExplanationsChange: (value: string) => void;
}

const ExplanationsSection: React.FC<ExplanationsSectionProps> = ({
  explanations,
  onExplanationsChange
}) => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Explanations
        </label>
        <textarea
          rows={6}
          value={explanations}
          onChange={(e) => onExplanationsChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all duration-200"
          style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
          placeholder="Enter detailed explanations about the decisions made..."
        />
      </div>
    </div>
  );
};

export default ExplanationsSection;