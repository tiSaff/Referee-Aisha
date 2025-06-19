import React from 'react';
import { VideoData } from '../../types';

interface VideoDetailsFormProps {
  editData: VideoData;
  onFieldChange: (field: string, value: string) => void;
  isPendingVideo: boolean;
  isPublishedVideo: boolean;
}

const VideoDetailsForm: React.FC<VideoDetailsFormProps> = ({
  editData,
  onFieldChange,
  isPendingVideo,
  isPublishedVideo
}) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={editData.title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
          style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
          required
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          value={editData.location}
          onChange={(e) => onFieldChange('location', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
          style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
        />
      </div>

      {/* Status - Only show if not pending */}
      {!isPendingVideo && !isPublishedVideo && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="relative">
            <select
              value={editData.status}
              onChange={(e) => onFieldChange('status', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent appearance-none bg-white transition-all duration-200"
              style={{ '--tw-ring-color': '#2a835f' } as React.CSSProperties}
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetailsForm;