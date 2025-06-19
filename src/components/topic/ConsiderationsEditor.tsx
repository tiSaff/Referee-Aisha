import React from 'react';

interface ConsiderationsEditorProps {
  considerations: string;
  onConsiderationsChange: (value: string) => void;
}

const ConsiderationsEditor: React.FC<ConsiderationsEditorProps> = ({
  considerations,
  onConsiderationsChange
}) => {
  return (
    <div>
      <label htmlFor="considerations" className="block text-sm font-medium text-gray-700 mb-2">
        Considerations
      </label>
      <textarea
        id="considerations"
        rows={8}
        value={considerations}
        onChange={(e) => onConsiderationsChange(e.target.value)}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all duration-200"
        style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
        placeholder="Enter detailed considerations for this topic..."
      />
    </div>
  );
};

export default ConsiderationsEditor;