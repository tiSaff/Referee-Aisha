import React from 'react';
import { RotateCcw } from 'lucide-react';
import Button from '../common/Button';

interface ActionButtonsProps {
  isPendingVideo: boolean;
  isPublishedVideo: boolean;
  isUploading: boolean;
  selectedFile: File | null;
  onSave: () => void;
  onFinalSave: () => void;
  onReturnToPending: () => void;
  onCancel: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isPendingVideo,
  isPublishedVideo,
  isUploading,
  selectedFile,
  onSave,
  onFinalSave,
  onReturnToPending,
  onCancel
}) => {
  return (
    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
      <button
        onClick={onCancel}
        className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        disabled={isUploading}
      >
        Cancel
      </button>
      
      {/* Show different buttons based on video status */}
      {isPendingVideo ? (
        <>
          <button
            onClick={onSave}
            disabled={isUploading}
            className="px-8 py-3 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#2a835f' }}
          >
            {isUploading ? 'Uploading...' : selectedFile ? 'Save & Upload' : 'Save'}
          </button>
          <button
            onClick={onFinalSave}
            disabled={isUploading}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:opacity-90 disabled:opacity-50"
          >
            Final Save
          </button>
        </>
      ) : isPublishedVideo ? (
        <>
          <button
            onClick={onSave}
            disabled={isUploading}
            className="px-8 py-3 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#2a835f' }}
          >
            {isUploading ? 'Uploading...' : selectedFile ? 'Save & Upload' : 'Save Changes'}
          </button>
          <button
            onClick={onReturnToPending}
            disabled={isUploading}
            className="flex items-center space-x-2 px-8 py-3 bg-orange-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:opacity-90 disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Return to Pending</span>
          </button>
        </>
      ) : (
        <button
          onClick={onSave}
          disabled={isUploading}
          className="px-8 py-3 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: '#2a835f' }}
        >
          {isUploading ? 'Uploading...' : selectedFile ? 'Save & Upload' : 'Save Changes'}
        </button>
      )}
    </div>
  );
};

export default ActionButtons;