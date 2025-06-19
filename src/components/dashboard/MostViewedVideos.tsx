import React from 'react';
import { TrendingUp, Eye, Maximize2 } from 'lucide-react';

interface MostViewedVideosProps {
  data: Array<{
    title: string;
    views: number;
    uploadedBy: string;
  }>;
}

const MostViewedVideos: React.FC<MostViewedVideosProps> = ({ data }) => {
  const maxViews = Math.max(...data.map(item => item.views));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Most Viewed Videos</h3>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {data.slice(0, 8).map((video, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate" title={video.title}>
                {video.title}
              </h4>
              <p className="text-xs text-gray-500 truncate">
                by {video.uploadedBy}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <Eye className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-gray-900">
                {video.views.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostViewedVideos;