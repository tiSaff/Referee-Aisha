import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
  onClose: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onClose }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
        <button onClick={onClose} className="text-red-600 hover:text-red-800">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;