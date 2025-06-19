import React from 'react';
import { VideoData } from '../../types';

interface VideoInfoPanelProps {
  editData: VideoData;
}

const VideoInfoPanel: React.FC<VideoInfoPanelProps> = ({ editData }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-3">Current Video Info</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium text-gray-900">{editData.duration}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Size:</span>
          <span className="font-medium text-gray-900">{editData.size}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Format:</span>
          <span className="font-medium text-gray-900">{editData.format}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Views:</span>
          <span className="font-medium text-gray-900">{editData.views.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoInfoPanel;